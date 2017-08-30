var app = angular.module('cutsApp', []);


app.controller('PageCtrl', function ($scope, $location, $http, calculationService) {

	$scope.stockError;
	$scope.cutsError;
	
	$scope.unitOptions = [
      {name:'Inches', unit:'1'},
      {name:'Feet', unit:'12'}
    ];
	
	$scope.cutUnit = $scope.unitOptions[0];
	$scope.stockUnit=$scope.unitOptions[0];
	
	$scope.calculationsDone=false; 

	$scope.stock=undefined; 
	
	$scope.cuts=[];
	
	
	$scope.addCut = function(){
		$scope.calculationsDone=false;
		var hasErrors = $scope.checkForCutErrors($scope.cutLength, $scope.cutQuantity);
		
		if(!hasErrors){
			//add new cut
			var cut = new Cut($scope.cutLength,$scope.cutUnit, $scope.cutQuantity);
			$scope.cuts.push(cut);
		}
	};
	
	
	$scope.checkForCutErrors = function(cutLength, cutQuantity){
		var errorsFound = false;
		
		
		if(!(!isNaN(cutLength) && angular.isNumber(+cutLength) && cutLength>0)) {
			$scope.cutsError="Please specify a valid cut length";
			errorsFound=true;
		}
		
		if(!(!isNaN(cutQuantity) && angular.isNumber(+cutQuantity) && cutQuantity>0)) {
			$scope.cutsError="Please specify a valid cut quantity";
			errorsFound=true;
		}
		
		
		if(!errorsFound){
			$scope.cutsError=false;
		}
		return errorsFound; 		
		
	}
	
	$scope.checkForErrors = function(){
		
		
		//check for stock board entry errors. 
		var errorFound = false; 
		if($scope.stock==undefined){
			$scope.stockError="Please specify a stock board length";
			errorFound=true;
		}
		else if(!(!isNaN($scope.stock) && angular.isNumber(+$scope.stock))) {
			$scope.stockError="Please specify a valid stock board length";
			errorFound=true;
		}
		else{
			$scope.stockError=false;
		}
		
		if($scope.cuts.length==0){
			$scope.cutsError="Please add at least one cut.";
			errorFound=true;
		}else{
			$scope.cutsError=false; 
		}
		
		
		
		//TODO - check if cuts are greater than board length. 
		
		return errorFound;
		
	}
	
	$scope.calculateCuts = function(){
		
		if(!$scope.checkForErrors()){
			//proceed with calculation
			
			var stock = new Stock($scope.stock, $scope.stockUnit);
			//$scope.cuts
			
			$scope.boards = calculationService.calculateCuts(stock,$scope.cuts);
			$scope.calculationsDone=true;
			
		}
	}
	
	$scope.displayCuts = function(calculationSolution){
		
		if(calculationSolution.success){
			//calculation succeeded
			$scope.calculationsDone=true;
			//show the result
			
		}
		else{
			$scope.calculationError=calculationSolution.message; 
			
		}	
	}
	
});

app.service('calculationService', function () {

  this.getNotification = function () {
    return "Sample Notification";
  }
  
    this.showNotification = function (show) {
    return !show;
  }
	
	var permutedValues=[];
	
	
	this.calculateCuts = function(stock, cuts){
		
	
		var normalizedCuts = getNormalizedCutsArray(cuts);
		var normalizedStock = normalizeLength(stock.unit, stock.length);
		var totalCutsLength = normalizedCuts.reduce(getSum);
		//sort all decreasing order.
		normalizedCuts.sort(function(a, b){return b - a});
		
		
		console.log(normalizedCuts);
		var boards = createFitFirstDecreasingBoardSolution(normalizedCuts, normalizedStock);
		
		var totalWaste = findBoardsWaste(boards);
		//create CalculationSolution

		console.log(boards);
		console.log(totalWaste);
		
		return boards;
		
		
		
	}
	
	this.calculateCuts2 = function(stock, cuts){	
		
		/*
		
		var normalizedCuts = getNormalizedCutsArray(cuts);
		var normalizedStock = normalizeLength(stock.unit, stock.length);
		var totalCutsLength = normalizedCuts.reduce(getSum);
			
		//iterate through every complete board combo - determine solution. 	
		var cutPermutations = permutator(normalizedCuts);
		console.log('done generating permutations');
		console.log(cutPermutations);
		
		//ensure first viable solution considered
		var bestSolutionLength =normalizedCuts.length+1; 
		var bestSolution; 
		//for each solution

		for(var k =0;k<cutPermutations.length;k++){
			var solutionBoards = createBoardSolution(cutPermutations[k], normalizedStock);

			if(solutionBoards.length <bestSolutionLength){
				bestSolution=solutionBoards;
				bestSolutionLength = solutionBoards.length; 
			}
		}

		var totalWaste = findBoardsWaste(bestSolution);
		//create CalculationSolution

		console.log(totalWaste);
		
		return bestSolution;
	
	*/
	}
	

	
	
	function getSum(total, num) {
    	return total + num;
	}
	
	function findBoardsWaste(boards){
		var waste = 0; 
		
		for(var i =0;i<boards.length;i++){
			waste+=boards[i].spaceLeft;
		}
		return waste; 
	}

	function permutator(inputArr) {
	  var results = [];

	  function permute(arr, memo) {
		var cur, memo = memo || [];
		  
		for (var i = 0; i < arr.length; i++) {
		  cur = arr.splice(i, 1);
		  if (arr.length === 0) {
			results.push(memo.concat(cur));
		  }
		
		var newArr = arr.slice();
		var newMemo = memo.concat(cur);
	//	if(!checkIfInList(newArr,newMemo)){
			
			//avoid page hanging on long permutations
			/*
			setTimeout(function(){
				permute(newArr,newMemo);
			},0);
			*/
		permute(newArr, newMemo);
		//}

		arr.splice(i, 0, cur[0]);
		}
		return results;
	  }
	  return permute(inputArr);
	}
	
	
	function checkIfInList(arr,mem){
		return false;
		for(var q=0;q<permutedValues.length;q++){
			if(arraysEqual(permutedValues[q].arr,arr) && arraysEqual(permutedValues[q].mem,mem)){
				return true;
			}
		}
		//add to permutedValues
		permutedValues.push({arr:arr,mem:mem});
		return false; 
		
	}
	
	function arraysEqual(a, b) {
		  if (a === b) return true;
		  if (a == null || b == null) return false;
		  if (a.length != b.length) return false;

		  for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		  }
		  return true;
		}

	
	function createBoardSolution(cuts, stockLength){
		
		var boards = [];
		var board = new Board(stockLength);
		for(var i =0;i<cuts.length;i++){
			
			if(cuts[i]<=board.spaceLeft){
				board.addCut(cuts[i]);
			}
			else{
				boards.push(board);
				board = new Board(stockLength);
				board.addCut(cuts[i]);
			}
		}
		boards.push(board);
		return boards;
	}
	
	
	function createFitFirstDecreasingBoardSolution(cuts, stockLength){
		
		var boards = [];
		var board = new Board(stockLength);
		boards.push(board);
		var cutAdded = false; 
		for(var i =0;i<cuts.length;i++){
			cutAdded=false; 
			for(var j =0;j<boards.length;j++){
				
				if(cuts[i]<=boards[j].spaceLeft){
					boards[j].addCut(cuts[i]);
					cutAdded = true; 
				}
			}
			
			if(!cutAdded){
				var board = new Board(stockLength);
				board.addCut(cuts[i]);
				boards.push(board);
			}
		}

		return boards;
	}

	
	function normalizeLength(unit, length){
		return unit.unit*length; 
	}
	
	function getNormalizedCutsArray(cuts){
	
		var normalizedCuts=[];
		for(var i=0;i<cuts.length;i++){	
			//add quantity of cuts
			var normalizedLength = normalizeLength(cuts[i].unit,cuts[i].length);
			
			for(var j=0;j<cuts[i].quantity;j++){
				normalizedCuts.push(normalizedLength);
			}
		}
		return normalizedCuts; 
	}
	

});


app.directive('visualizeCuts', function() {
	
	
	 var controller = function ($scope) {
		 

		 $scope.stockSize=8;
		 $scope.stockUnit=12;
		 
		 $scope.boards = $scope.solution;
		 $scope.totalBoardWidth = $scope.stockSize * $scope.stockUnit;
		
		 console.log($scope.solution);
		 
		 $scope.getStyle = function(board, cut,isExtra){
			
			 var percentOfBoard = cut / $scope.totalBoardWidth;
			 var cutWidthPercent = percentOfBoard * 100;
			 
			 var styleValues= {
				"height":"100px",
				"border":"1px solid #000",
				"float": "left"
			 };
			 var cutWidth = cutWidthPercent.toString() + '%';
			 styleValues.width = cutWidth; 
			 
			 if(isExtra){
				styleValues.background = "#36486b";	 
			 }
			 else{
				 styleValues.background = "#618685";
			 }
			 
			return styleValues; 
			
		 };
		 
      };    
	
	  return {
		  restrict: 'E',
		  controller:controller,
		  scope:{solution:'=solution'},
		  replace: 'true',
		  templateUrl: 'resources/partials/visualizationTemplate.html'
	  };
});




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
			
			calculationService.calculateCuts(stock,$scope.cuts);
			
			
			$scope.calculationsDone=true;
			
		}
		
	
	}
	
	
	$scope.displayCuts = function(calculationSolution){
		
		if(calculationSolution.success){
			//calculation succeeded
			
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
	
	this.calculateCuts = function(stock, cuts){	
		
		//TODO- 
		//iterate through every complete board combo - determine solution. 
		
		
		//simple solution for testing. just place all cuts in a row.
		
		console.log(stock);
		
		console.log(cuts);
		
		
		getNormalizedCutsArray(cuts);
		
		
		
		
		
		
		
		
		
		return '';	
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
		//for ...
		// normalizedCuts.push(cut);
		
		console.log(normalizedCuts);
		
	}
	

});


app.directive('visualizeCuts', function() {
	
	
	 var controller = function ($scope) {
		 
		 
		 $scope.stockSize=8;
		 $scope.stockUnit=12;
		 
		 
		 $scope.totalBoardWidth = $scope.stockSize * $scope.stockUnit;
		 
		 $scope.boards = [];
		 
		 for(var i=0;i<4;i++){
			 
			var b = new Board();
			 
			 $scope.boards.push(b);
		 }
		 
		 
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




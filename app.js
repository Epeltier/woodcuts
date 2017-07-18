var app = angular.module('cutsApp', []);


app.controller('PageCtrl', function ($scope, $location, $http, calculationService) {

	$scope.stockError;
	$scope.cutsError;
	
	$scope.unitOptions = [
      {name:'Inches', unit:'1'},
      {name:'Feet', unit:'12'}
    ];
	
	
	$scope.boardUnit=$scope.unitOptions[0];
	
	$scope.calculationsDone=false; 


	
	
	
	$scope.stock=undefined; 
	
	$scope.cuts=[];
	
	
	$scope.addCut = function(){
		$scope.calculationsDone=false;
		var hasErrors = $scope.checkForCutErrors($scope.cutLength, $scope.cutQuantity);
		
		if(!hasErrors){
			//add new cut
			var cut = new Cut($scope.cutLength,2, $scope.cutQuantity);
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
		
		console.log($scope.boardUnit);
		
		if(!$scope.checkForErrors()){
			//proceed with calculation
			
			var board = new Board();
			
			
			
			$scope.calculationsDone=true;
			
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
	
	
	this.calculateCuts = function(boards, cuts){
		
		
		return '';
		
		
		
	}
	
	
	
});


app.directive('visualizeCuts', function() {
	
	
	 var controller = function () {
          
			var test='test';

      };    
	

	  return {
		  restrict: 'E',
		  controller:controller,
		  replace: 'true',
		  template: '<h3>This Is visualization directive!!</h3>'
	  };
});




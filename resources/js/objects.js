var CalculationSolution = function(){
	
	this.success;
	this.message;
	this.boards=[];
	this.stockSize;
	this.stockUnit;
	this.totalCutsLength;
	this.wasteLength; 
	
};




var Board = function(){
	
	this.cuts=["40","20","30"];
	this.spaceLeft=6;
	
};


var Stock = function(length, unit){
	
	this.length=length; 
	this.unit = unit;
	
};

Stock.prototype.toString=function(){
	return "Length: "+ " " + this.length + this.unit.name ;
	
	
};

var Cut = function(length, unit,quantity){
	
	this.length=length; 
	this.unit = unit;
	this.quantity=quantity;
	
};

Cut.prototype.toString=function(){
	return "Length: "+ this.length + " " + this.unit.name + ", Quantity: " + this.quantity ;
	
	
};




	
	
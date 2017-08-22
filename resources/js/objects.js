var CalculationSolution = function(success, message, boards, stockSize, totalCutsLength, wasteLength){
	
	this.success=success;
	this.message=message;
	this.boards=[]=boards; 
	this.stockSize=stockSize;
	this.totalCutsLength=totalCutsLength;
	this.wasteLength=wasteLength; 
	
};


var Board = function(stockLength){
	
	this.cuts=[];
	this.spaceLeft=stockLength;
	
};

Board.prototype.addCut=function(length){
	//TODO -check length validity here?
	
	this.spaceLeft = this.spaceLeft-length;
	this.cuts.push(length);
	
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




	
	
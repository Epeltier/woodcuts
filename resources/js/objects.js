var CalculationSolution = function(){
	
	this.success;
	this.message;
	this.boards=[];
	
	
};




var Board = function(){
	this.stockSize;
	this.cuts=["1","2","3"];
	this.spaceLeft=0;
	
	
	
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




	
	
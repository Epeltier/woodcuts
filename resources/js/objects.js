var Calculation = function(){
	
	this.success;
	this.message;
	
	this.cuts=[];
	
	
	
	
	
};


var Board = function(length, unit){
	
	this.length=length; 
	this.unit = unit;
	
};

Board.prototype.toString=function(){
	return "Length: "+ " " + this.length + this.unit ;
	
	
};

var Cut = function(length, unit,quantity){
	
	this.length=length; 
	this.unit = unit;
	this.quantity=quantity;
	
};

Cut.prototype.toString=function(){
	return "Length: "+ this.length + " " + this.unit + ", Quantity: " + this.quantity ;
	
	
};




	
	
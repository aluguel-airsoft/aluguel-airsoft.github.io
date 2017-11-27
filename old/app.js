var limpar = function() {

	document.querySelector('#cal22').value  = null;
	document.querySelector('#cal380').value = null;
	document.querySelector('#cal357').value = null;
	document.querySelector('#calRT').value  = null;
	document.querySelector('#cal12').value  = null;

	document.querySelector('#resultCal22').innerHTML = 	"";
	document.querySelector('#resultCal380').innerHTML = "";
	document.querySelector('#resultCal40').innerHTML = 	"";
	document.querySelector('#resultCal357').innerHTML = "";
	document.querySelector('#resultCalRT').innerHTML = 	"";
	document.querySelector('#resultCal12').innerHTML = 	"";

	document.querySelector('#total').innerHTML = "";
	document.querySelector('#final').innerHTML = "";

}


//---------------------------- Tiro dado ----------------------------//

var cal22 = 0; 
var cal380 = 0; 
var cal40 = 0; 
var cal357 = 0; 
var calRT = 0; 
var cal12 = 0; 
var total = 0;



var calcular = function() {

	cal22 = document.querySelector('#cal22').value * 0.80;
	document.querySelector('#resultCal22').innerHTML = "R$: " + cal22;
	cal380 = document.querySelector('#cal380').value * 1.50;
	document.querySelector('#resultCal380').innerHTML = "R$: " + cal380;
	cal40 = document.querySelector('#cal40').value * 1.80;
	document.querySelector('#resultCal40').innerHTML = "R$: " + cal40;
	cal357 = document.querySelector('#cal357').value * 3.50;
	document.querySelector('#resultCal357').innerHTML = "R$: " + cal357;
	calRT = document.querySelector('#calRT').value * 4.60;
	document.querySelector('#resultCalRT').innerHTML = "R$: " + calRT;
	cal12 = document.querySelector('#cal12').value * 3.00;
	document.querySelector('#resultCal12').innerHTML = "R$: " + cal12;

	total = cal22 + cal380 + cal40 + cal357 + calRT + cal12;
	final = total + 25;

	document.querySelector('#total').innerHTML = "25.00 + " + total + " = ";
	document.querySelector('#final').innerHTML = final;
	final
};





//---------------------------- Dinheiro ----------------------------//





















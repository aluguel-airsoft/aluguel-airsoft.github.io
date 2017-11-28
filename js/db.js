var precoM4			= 55.0;
var precoGlock		= 30.0;
var precoOculos		= 3.0;
var precoMascara	= 3.0;
var precoBalaclava	= 2.0;
var precoColete		= 5.0;
var precoColdre		= 4.0;

var equipamentosExistentes = ["M4", "Glock", "Óculos", "Máscara", "Balaclava", "Colete", "Coldre"];

var datasReservadas = [
	"17/12/2017",
];

var reservas = [
	{
		"data": "17/12/2017",
		"equipamentos":[equipamentosExistentes[0], equipamentosExistentes[2], equipamentosExistentes[4]]
	}
];

var existeReserva = function(data, equipamentosRequeridos) {
	var equipAlugados = [];
	for (var i in reservas) {
		if(reservas[i].data == data){
			equipAlugados = intersection(equipamentosRequeridos, reservas[i].equipamentos);
			return equipAlugados;
		}
	}
};

var intersection = function(a, b){
	// var result = [];
	// while( a.length > 0 && b.length > 0 ){	
	// 	if (a[0] < b[0] ){ 
	// 		a.shift();
	// 	}else if (a[0] > b[0] ){
	// 		b.shift();
	// 	}else {/* they're equal */
	// 		result.push(a.shift());
	// 		b.shift();
	// 	}
	// }
	// return result;

	var result = [];
	for(var i in a){
		if(b.includes(a[i])){
			result.push(a[i]);
		}
	}
	return result;
};











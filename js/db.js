//Métodos Db

var findExistEquip = function(attr, keyWord){	
	return equipamentosExistentes.find(function(aux){return aux[attr] === keyWord})
};	

var findExistPromo = function(pCode){			
	return promoCodes.find(function(aux){return aux.code === pCode})
};	

var findReserva = function(data){				
	for (var i in reservas) {
		if(reservas[i].data == data){
			return reservas[i];
		}
	}
};

var intersection = function(a, b){				
	var result = [];
	for(var i in a){
		if(b.includes(a[i])){
			result.push(a[i]);
		}
	}
	return result;
};

var findEquipReservados = function(data, equipamentosRequeridos) {
	var equipAlugados = [];
	for (var i in reservas) {
		if(reservas[i].data == data){
			equipAlugados = intersection(equipamentosRequeridos, reservas[i].equipamentos);
			return equipAlugados;
		}
	}
};

// Db

var porcentDesconto = 0.06;
var precoMaximo = 85;

var promoCodes = [				
	{
		"code": "AFIRMATIRA",
		"valor": 0.270,
		"precoMax": 65
	},
	{
		"code": "ASJLLE",
		"valor": 0.176,
		"precoMax": 70
	},
	{
		"code": "NATAL",
		"valor": 0.1,
		"precoMax": 75
	}
];

var equipamentosExistentes = [	
	{
		"name" 	: "M4",				//-> 0
		"key"	: "m4",
		"id" 	: "#cBoxM4",
		"preco"	: 55.0
	},
	{ 
		"name" 	: "Glock",			//-> 1
		"key"	: "glock",
		"id" 	: "#cBoxGlock",
		"preco"	: 30.0
	},
	{ 
		"name" 	: "Óculos telado",	//-> 2
		"key"	: "oculos",
		"id" 	: "#cBoxOculos",
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Máscara telada",	//-> 3
		"key"	: "mascara",
		"id" 	: "#cBoxMascara",
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Balaclava",		//-> 4
		"key"	: "balaclava",
		"id" 	: "#cBoxBalaclava",
		"preco"	: 2.0
	},
	{ 
		"name" 	: "Colete",			//-> 5
		"key"	: "colete",
		"id" 	: "#cBoxColete",
		"preco"	: 5.0
	},
	{ 
		"name" 	: "Coldre",			//-> 6
		"key"	: "coldre",
		"id" 	: "#cBoxColdre",
		"preco"	: 4.0
	}
];

var reservas = [				
	{
		"data": "03/12/2017",
		"locador": "Gean Back Viper",
		"equipamentos":["mascara"]
	},
	{
		"data": "17/12/2017",
		"locador": "",
		"equipamentos":["m4"]
	}
];

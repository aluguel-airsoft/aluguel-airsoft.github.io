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
var precoMaximoPadrao = 85;

var precoMaximo = precoMaximoPadrao;
var porcentDesconto = 0.06;
var precoMaximoComG36 = 140;

var promoCodes = [				
	{
		"code": "AFIRMATIRA",
		"valor": 0.270,
		"precoMax": 65,
		"precoMaxComG36": 125
	},
	{
		"code": "ASJLLE",
		"valor": 0.176,
		"precoMax": 70,
		"precoMaxComG36": 130
	},
	{
		"code": "NATAL",
		"valor": 0.1,
		"precoMax": 75,
		"precoMaxComG36": 135
	}
];

var equipamentosExistentes = [	
	{
		"name" 	: "M4",			
		"key"	: "m4",
		"id" 	: "#cBoxM4",
		"preco"	: 55.0
	},
	{
		"name" 	: "G36",			
		"key"	: "g36",
		"id" 	: "#cBoxG36",
		"preco"	: 60.0
	},
	{ 
		"name" 	: "Glock",		
		"key"	: "glock",
		"id" 	: "#cBoxGlock",
		"preco"	: 30.0
	},
	{ 
		"name" 	: "Óculos telado",
		"key"	: "oculos",
		"id" 	: "#cBoxOculos",
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Máscara telada",
		"key"	: "mascara",
		"id" 	: "#cBoxMascara",
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Máscara telada",
		"key"	: "mascara1",
		"id" 	: "#cBoxMascara1",
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Balaclava",	
		"key"	: "balaclava",
		"id" 	: "#cBoxBalaclava",
		"preco"	: 2.0
	},
	{ 
		"name" 	: "Colete",		
		"key"	: "colete",
		"id" 	: "#cBoxColete",
		"preco"	: 5.0
	},
	{ 
		"name" 	: "Coldre",		
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
		"equipamentos":["m4", "g36"]
	}
];

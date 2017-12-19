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
		"descricao": "M4 elétrica com 2 magazines",
		"key"	: "m4",
		"imagem": "m4.jpg",
		"id" 	: "cBoxM4",
		"disponivel" : true,
		"preco"	: 55.0
	},
	{
		"name" 	: "Shotgun",		
		"descricao": "Shotgun spring, dispara 3 BBs por vez",
		"key"	: "shotgun",
		"imagem": "shotgun.jpg",
		"id" 	: "cBoxShotgun",
		"disponivel" : true,
		"preco"	: 50.0
	},
	{
		"name" 	: "G36",			
		"descricao": "G36 elétrica",
		"key"	: "g36",
		"imagem": "g36.jpg",
		"id" 	: "cBoxG36",
		"disponivel" : true,
		"preco"	: 60.0
	},
	{
		"name" 	: "Mossberg",		
		"descricao": "Shotgun mossberg spring, dispara 1 BBs por vez",
		"key"	: "mossberg",
		"imagem": "mossberg.jpg",
		"id" 	: "cBoxMossberg",
		"disponivel" : true,
		"preco"	: 40.0
	},
	{ 
		"name" 	: "USP",		
		"descricao": "Pistola USP Gbb(CO2)",
		"key"	: "usp",
		"imagem": "usp.jpg",
		"id" 	: "cBoxUsp",
		"disponivel" : true,
		"preco"	: 35.0
	},
	{ 
		"name" 	: "Glock",		
		"descricao": "Glock elétrica",
		"key"	: "glock",
		"imagem": "glock.jpg",
		"id" 	: "cBoxGlock",
		"disponivel" : false,
		"preco"	: 30.0
	},
	{ 
		"name" 	: "Óculos telado",
		"descricao": "Óculos telado pequeno",
		"key"	: "oculos",
		"imagem": "oculos.jpg",
		"id" 	: "cBoxOculos",
		"disponivel" : true,
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Máscara telada",
		"descricao": "Mascara telada para proteção facial",
		"key"	: "mascara",
		"imagem": "mascara.jpg",
		"id" 	: "cBoxMascara",
		"disponivel" : true,
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Máscara telada",
		"descricao": "Mascara telada para proteção facial",
		"key"	: "mascara1",
		"imagem": "mascara.jpg",
		"id" 	: "cBoxMascara1",
		"disponivel" : true,
		"preco"	: 3.0
	},
	{ 
		"name" 	: "Balaclava",	
		"descricao": "Balaclava de caveira. Meia face",
		"key"	: "balaclava",
		"imagem": "balaclava.jpg",
		"id" 	: "cBoxBalaclava",
		"disponivel" : true,
		"preco"	: 2.0
	},
	{ 
		"name" 	: "Colete",		
		"descricao": "Colete tático preto com porta mags e bolsos auxiliares",
		"key"	: "colete",
		"imagem": "colete.jpg",
		"id" 	: "cBoxColete",
		"disponivel" : true,
		"preco"	: 5.0
	},
	{ 
		"name" 	: "Coldre",		
		"descricao": "Coldre lateral de perna com cinto tático",
		"key"	: "coldre",
		"imagem": "coldre.jpg",
		"id" 	: "cBoxColdre",
		"disponivel" : true,
		"preco"	: 4.0
	}
];

var reservas = [				
	{
		"data": "03/12/2017",
		"equipamentos":["mascara", "glock"]
	},
	{
		"data": "10/12/2017",
		"equipamentos":["coldre", "glock", "shotgun", "mascara"]
	},
	{
		"data": "17/12/2017",
		"equipamentos":["m4", "g36", "shotgun", "colete", "mascara"],
		"obs": "Shotgun + Colete + Mascara-> Giovane Gonçalves"
	}
];

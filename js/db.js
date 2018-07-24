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

var returnAllDatas = function() {
	var datas = [];
	for (var i in reservas) {
		datas.push(reservas[i].data);
	}
	return datas;
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
		"code": "VIPER",
		"valor": 0.1,
		"precoMax": 75,
		"precoMaxComG36": 135
	}
];

var equipamentosExistentes = [	
	{
		"name" 	: "M4",		
		"descricao": "Aeg modelo m4 ",
		"key"	: "m4",
		"imagem": "m4.jpg",
		"id" 	: "cBoxM4",
		"disponivel" : true,
		"preco"	: 55.0
	},
	{
		"name" 	: "L96",		
		"descricao": "Sniper spring, acompanha luneta",
		"key"	: "l96",
		"imagem": "l96.jpg",
		"id" 	: "cBoxL96",
		"disponivel" : false,
		"preco"	: 80.0
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
		"disponivel" : false,
		"preco"	: 35.0
	},
	{ 
		"name" 	: "Glock",		
		"descricao": "Glock elétrica",
		"key"	: "glock",
		"imagem": "glock.jpg",
		"id" 	: "cBoxGlock",
		"disponivel" : true,
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
		"name" 	: "Colete Tan",		
		"descricao": "Colete tático Tan ",
		"key"	: "coleteTan",
		"imagem": "coleteTan.jpg",
		"id" 	: "cBoxColeteTan",
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
		"responsavel": "Mauricio M",
		"equipamentos":["mascara", "glock"]
	},
	{
		"data": "10/12/2017",
		"responsavel": "Mauricio M",
		"equipamentos":["coldre", "glock", "shotgun", "mascara"]
	},
	{
		"data": "17/12/2017",
		"equipamentos":["m4", "g36", "shotgun", "colete", "mascara"],
		"responsavel": "Mauricio M",
		"obs": ["Shotgun + Colete + Mascara-> Giovane Gonçalves"]
	},
	{
		"data": "14/01/2018",
		"equipamentos":["m4", "balaclava", "oculos"],
		"responsavel": "Mauricio M",
		// "obs": ["Shotgun + Colete + Mascara-> Giovane Gonçalves"]
	},
	{
		"data": "21/01/2018",
		"equipamentos":["colete", "shotgun"],
		"responsavel": "Mauricio M",
		"obs": ["Colete-> Gean Viper"]
	},
	{
		"data": "27/01/2018",
		"equipamentos":["m4"],
		"responsavel": "Mauricio M",
		"obs": ["m4-> Ricardo Rangers R$ 40,00"]
	},
	{
		"data": "28/01/2018",
		"equipamentos":["shotgun", "oculos", "mascara", "colete", "g36", "balaclava", "mascara1", "m4"],
		"responsavel": "Mauricio M",
		"obs": [
			{	
				"nome": "Caue amigo Paulo",
				"telefone": " - ",
				"valor": 45.0,
				"equipamentos": "shotgun + oculos + mascara + colete"
			},
			{	
				"nome": "Guilherme amigo Paulo",
				"telefone": " - ",
				"valor": 65.0,
				"equipamentos": "g36 + balaclava + mascara1"
			},
			{	
				"nome": "Amigo Guilherme",
				"telefone": " - ",
				"valor": 57.0,
				"equipamentos": "m4 + balaclavaCamo"
			}
		]	
	},
	{
		"data": "04/02/2018",
		"equipamentos":["g36", "oculos", "mascara1", "mascara", "colete", "coldre"],
		"responsavel": "Mauricio M",
		"obs": [
			{	
				"nome": "Lauro",
				"telefone": " - ",
				"valor": 78.0,
				"equipamentos": "g36 + oculos + mascara + mascara1 + colete + coldre"
			}
		]	
	},
	{
		"data": "11/02/2018",
		"equipamentos":["g36", "oculos", "mascara", "colete", "mascara1", "shotgun"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Jhonatan",
				"telefone": "554796763157",
				"valor": 66.0,
				"equipamentos": "g36 + oculos + mascara"
			},
			{
				"nome": "Gean Viper",
				"telefone": "-",
				"valor": 0,
				"equipamentos": "colete"
			},
			{
				"nome": "Danilo Patrício",
				"telefone": "554796063185",
				"valor": 3.0,
				"equipamentos": "mascara1"
			},
			{
				"nome": "wagner mattos",
				"telefone": "-",
				"valor": 50.0,
				"equipamentos": "shotgun"
			}
		]	
	},
	{
		"data": "14/02/2018",
		"equipamentos":["g36", "glock", "oculos", "mascara", "colete", "mascara1", "coleteTan"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Alex",
				"telefone": "554796346862",
				"valor": 110.0,
				"equipamentos": "g36 + glock + oculos + mascara + mascara1 + colete + coleteTan"
			}
		]	
	},
	{
		"data": "18/02/2018",
		"equipamentos":["m4", "shotgun", "g36", "mossberg", "usp", "glock", "oculos", "mascara", "mascara1", "balaclava", "colete", "coldre"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Guilherme amigo Paulo",
				"telefone": "",
				"valor": 66.0,
				"equipamentos": "m4 + shotgun + g36 + mossberg + usp + glock + oculos + mascara + mascara1 + balaclava + colete + coldre"
			},
		]	
	},
	{
		"data": "25/02/2018",
		"equipamentos":["g36", "oculos", "colete", "mascara", "coleteTan", "glock", "balaclava", "usp"],
		"responsavel": "M. Michels",
		"obs": [
			{
				"nome": "Guilherme Oliveira",
				"telefone": "554796009839",
				"valor": 68.0,
				"equipamentos": "G36 + oculos + colete"
			},
			{
				"nome": "Danilo Patrício",
				"telefone": "554796063185",
				"valor": 40.0,
				"equipamentos": "Glock + Mascara + colete tan + balaclava"
			},
			{
				"nome": "Guilherme Marino(Amigo Paulo)",
				"telefone": "554797082354",
				"valor": 35.0,
				"equipamentos": "USP"
			}
		]
	},
	{
		"data": "04/03/2018",
		"equipamentos":["colete", "balaclava", "m4", "g36", "usp", "oculos", "mascara", "mascara1", "coleteTan"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Elison Fagundes",
				"telefone": "554796759938",
				"valor": 7.0,
				"equipamentos": "colete + balaclava"
			},
			{
				"nome": "Guilherme Marino(Amigo Paulo)",
				"telefone": "554797082354",
				"valor": 95.0,
				"equipamentos": "M4 + G36"
			},
			{
				"nome": "Cledemir",
				"telefone": "554796988156",
				"valor": 41.0,
				"equipamentos": "USP + Óculos telado + Mascara"
			},
			{
				"nome": "",
				"telefone": "554796346862",
				"valor": 15.0,
				"equipamentos": "Óculos telado + Mascara + colete tan"
			}
		]
	},
	{
		"data": "11/03/2018",
		"equipamentos":["colete", "balaclava", "g36", "oculos", "mascara1", "coleteTan"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Elison Fagundes",
				"telefone": "554796759938",
				"valor": 7.0,
				"equipamentos": "colete + balaclava"
			},
			{
				"nome": "Guilherme Marino",
				"telefone": "554797082354",
				"valor": 71.0,
				"equipamentos": "G36 + Oculos telado + Mascara telada + Colete Tan"
			}
		]
	},

	{
		"data": "18/03/2018",
		"equipamentos":["colete", "m4", "oculos", "mascara", "mascara1", "coleteTan"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				
				"nome": "Jonathan",
				"telefone": "554797810579",
				"valor": 58.0,
				"equipamentos": "Mascara + M4"
			},
			{
				"nome": "alex",
				"telefone": "554796346862",
				"valor": 16.0,
				"equipamentos": "2 coletes + oculos + mascara"
			}
		]
	},

	{
		"data": "25/03/2018",
		"equipamentos":["glock", "m4", "oculos", "Oculos", "mascara", "mascara1", "colete", "coleteTan"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Guilherme",
				"telefone": "554796009839",
				"valor": 61.0,
				"equipamentos": " mascara + oculos + m4 + 2 colestes"
			},
			{
				"nome": "Amigo Guilherme",
				"telefone": "554796009839",
				"valor": 41.0,
				"equipamentos": "glock + oculos + mascara"
			}
		]
	},
	{
		"data": "08/04/2018",
		"equipamentos":["m4", "g36", "oculos", "mascara", "colete"],
		"responsavel": "Pedro S.",
		"obs": [
			{
				"nome": "Guilherme",
				"telefone": "554796009839",
				"valor": 61.0,
				"equipamentos": "m4"
			},
			{
				"nome": "Amigo Guilherme",
				"telefone": "554796009839",
				"valor": 41.0,
				"equipamentos": "g36 + oculos + mascara + colete"
			}
		]
	},
	{
		"data": "22/04/2018",
		"equipamentos":["m4", "g36", "oculos", "mascara", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Alexandre",
				"telefone": "554784273077",
				"valor": 33.0,
				"equipamentos": "glock + mascara"
			}
		]
	},
	{
		"data": "29/04/2018",
		"equipamentos":["m4", "g36", "oculos", "mascara", "colete","glock","coleteTan","mascara1","coldre","usp"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Ivan",
				"telefone": "554797853357",
				"valor": 87.0,
				"equipamentos": "m4 + glock + colete + oculos"
			},
			{
				"nome": "Nycholas",
				"telefone": "554796009839",
				"valor": 63.0,
				"equipamentos": "g36 + mascara "
			},
			{
				"nome": "Ruan",
				"telefone": "554797642780",
				"valor": 50.0,
				"equipamentos": "usp + mascara1 + coleteTan + oculos + Coldre "
			}
		]
	},
	{
		"data": "06/05/2018",
		"equipamentos":["m4", "g36", "glock", "oculos", "mascara", "colete", "coleteTan","coldre", "coldre"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gean Viper",
				"telefone": "",
				"valor": 0.0,
				"equipamentos": "Colete "
			},
			{
				"nome": "Bola",
				"telefone": "554797640799",
				"valor": 77.0,
				"equipamentos": "g36 + Glock + Óculos telado + Máscara telada + Colete Tan + Coldre"
			},
			{
				"nome": "Evnilson oliveira",
				"telefone": "554799960730",
				"valor": 55.0,
				"equipamentos": "M4"
			}
		]
	},
	{
		"data": "13/05/2018",
		"equipamentos":["m4", "g36", "oculos", "mascara", "mascara1","colete", "coleteTan", "balaclava"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Jorge Goedert",
				"telefone": "554792022018",
				"valor": 120.0,
				"equipamentos": "m4 + G36 + oculos + Oculos Mauricio + 2 mascaras + colete + coleteTan + balaclava"
			}
		]
	},
	{
		"data": "20/05/2018",
		"equipamentos":["g36", "oculos", "mascara", "mascara1", "m4", "colete", "l96", "glock", "usp"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Igor Schmokel",
				"telefone": "554796447105",
				"valor": 66.0,
				"equipamentos": "g36 + oculos + mascara"
			},
			{
				"nome": "Alexandro Cani",
				"telefone": "554784311990",
				"valor": 63.0,
				"equipamentos": "m4 + colete + mascara1"
			},
			{
				"nome": "Mauricio Michels",
				"telefone": "",
				"valor": 0.0,
				"equipamentos": "l96 + Glock"
			},
			{
				"nome": "Jonatan",
				"telefone": "554797810579",
				"valor": 35.0,
				"equipamentos": "UPS"
			}
		]
	},
	{
		"data": "14/07/2018",
		"equipamentos":["m4", "g36", "l96", "glock", "oculos", "mascara", "mascara1", "balaclava", "colete", "coleteTan", "coldre"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gustavo Luiz",
				"telefone": "554799132271",
				"valor": 0.0,
				"equipamentos": "m4 + g36 + l96 + glock + oculos + mascara + mascara1 + balaclava + colete + coleteTan + coldre"
			}
		]
	},
	{
		"data": "15/07/2018",
		"equipamentos":["m4", "g36", "l96", "glock", "oculos", "mascara", "mascara1", "balaclava", "colete", "coleteTan", "coldre"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gustavo Luiz",
				"telefone": "554799132271",
				"valor": 0.0,
				"equipamentos": "m4 + g36 + l96 + glock + oculos + mascara + mascara1 + balaclava + colete + coleteTan + coldre"
			}
		]
	},
	{
		"data": "01/07/2018",
		"equipamentos":["m4", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gabriel Mamedes",
				"telefone": "554799738256",
				"valor": 60.0,
				"equipamentos": "m4 + colete"
			}
		]
	},
	{
		"data": "26/07/2018",
		"equipamentos":["m4"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gabriel Mamedes",
				"telefone": "554799738256",
				"valor": 55.0,
				"equipamentos": "m4"
			}
		]
	},
	{
		"data": "29/07/2018",
		"equipamentos":["m4", "glock", "mascara", "coldre", "coleteTan", "g36", "mascara1", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Alexandre Albuquerque",
				"telefone": "554797238973",
				"valor": 91.0,
				"equipamentos": "M4 + Glock + coldre + Máscara telada + colete tan"
			},
			{
				"nome": "Gabriel Silva",
				"telefone": "554797769992",
				"valor": 68.0,
				"equipamentos": "G36 + Mascara telada + Colete"
			}
		]
	},
];

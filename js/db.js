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
var porcentDesconto = 0.06;

var promoCodes = [				
	{
		"code": "RECVIPER",
		"valor": 0.5,
	},
	{
		"code": "AFIRMATIRA",
		"valor": 0.25,
	},
	{
		"code": "ASJLLE",
		"valor": 0.15,
	},
	{
		"code": "VIPER",
		"valor": 0.1,
	},
	{
		"code": "BRAVO",
		"valor": 0.05,
	}
];

var equipamentosExistentes = [	
	{
		"name" 	: "M4",		
		"descricao": "Aeg modelo m4",
		"key"	: "m4",
		"imagem": "m4.png",
		"id" 	: "cBoxM4",
		"disponivel" : false,
		"preco"	: 60.0
	},
	{
		"name" 	: "M4A1",		
		"descricao": "Aeg modelo M4A1",
		"key"	: "m4a1",
		"imagem": "m4a1.png",
		"id" 	: "cBoxM4a1",
		"disponivel" : true,
		"preco"	: 60.0
	},
	{
		"name" 	: "Ares Amoeba",		
		"descricao": "Aeg Ares Amoeba modelo M4",
		"key"	: "ares",
		"imagem": "ares-amoeba.png",
		"id" 	: "cBoxAres",
		"disponivel" : false,
		"preco"	: 60.0
	},
	{
		"name" 	: "ICS",		
		"descricao": "Aeg ICS modelo Cxp-15k",
		"key"	: "ics",
		"imagem": "ics.png",
		"id" 	: "cBoxIcs",
		"disponivel" : false,
		"preco"	: 60.0
	},
	{
		"name" 	: "G36",			
		"descricao": "G36 elétrica",
		"key"	: "g36",
		"imagem": "g36.png",
		"id" 	: "cBoxG36",
		"disponivel" : true,
		"preco"	: 60.0
	},
	{
		"name" 	: "L96",		
		"descricao": "Sniper spring, acompanha luneta",
		"key"	: "l96",
		"imagem": "l96.png",
		"id" 	: "cBoxL96",
		"disponivel" : true,
		"preco"	: 70.0
	},
	{
		"name" 	: "Shotgun",		
		"descricao": "Shotgun spring, dispara 3 BBs por vez",
		"key"	: "shotgun",
		"imagem": "shotgun.png",
		"id" 	: "cBoxShotgun",
		"disponivel" : true,
		"preco"	: 45.0
	},
	{
		"name" 	: "Mossberg",		
		"descricao": "Shotgun mossberg spring, dispara 1 BBs por vez",
		"key"	: "mossberg",
		"imagem": "mossberg.png",
		"id" 	: "cBoxMossberg",
		"disponivel" : false,
		"preco"	: 40.0
	},
	{ 
		"name" 	: "USP",		
		"descricao": "Pistola USP Gbb(CO2)",
		"key"	: "usp",
		"imagem": "usp.png",
		"id" 	: "cBoxUsp",
		"disponivel" : false,
		"preco"	: 35.0
	},
	{ 
		"name" 	: "Glock",		
		"descricao": "Glock elétrica",
		"key"	: "glock",
		"imagem": "glock.png",
		"id" 	: "cBoxGlock",
		"disponivel" : true,
		"preco"	: 30.0
	},
	{ 
		"name" 	: "Óculos telado",
		"descricao": "Óculos telado pequeno",
		"key"	: "oculos",
		"imagem": "oculos.png",
		"id" 	: "cBoxOculos",
		"disponivel" : true,
		"preco"	: 10.0
	},
	{ 
		"name" 	: "Óculos telado",
		"descricao": "Óculos telado pequeno",
		"key"	: "oculos1",
		"imagem": "oculos.png",
		"id" 	: "cBoxOculos1",
		"disponivel" : true,
		"preco"	: 10.0
	},
	{ 
		"name" 	: "Máscara telada",
		"descricao": "Mascara telada para proteção facial",
		"key"	: "mascara",
		"imagem": "mascara.png",
		"id" 	: "cBoxMascara",
		"disponivel" : true,
		"preco"	: 15.0
	},
	{ 
		"name" 	: "Máscara telada",
		"descricao": "Mascara telada para proteção facial",
		"key"	: "mascara1",
		"imagem": "mascara.png",
		"id" 	: "cBoxMascara1",
		"disponivel" : true,
		"preco"	: 15.0
	},
	{ 
		"name" 	: "Balaclava",	
		"descricao": "Balaclava de caveira. Meia face",
		"key"	: "balaclava",
		"imagem": "balaclava.png",
		"id" 	: "cBoxBalaclava",
		"disponivel" : true,
		"preco"	: 5.0
	},
	{ 
		"name" 	: "Colete multicam",		
		"descricao": "Colete tático multicam com porta mags e bolsos auxiliares",
		"key"	: "colete-multicam",
		"imagem": "colete-multicam.png",
		"id" 	: "cBoxColeteMulticam",
		"disponivel" : true,
		"preco"	: 20.0
	},
	{ 
		"name" 	: "Colete",		
		"descricao": "Colete tático preto com porta mags e bolsos auxiliares",
		"key"	: "colete",
		"imagem": "colete.png",
		"id" 	: "cBoxColete",
		"disponivel" : true,
		"preco"	: 20.0
	},
	{ 
		"name" 	: "Colete plate",		
		"descricao": "Colete plate tático",
		"key"	: "colete-plate",
		"imagem": "colete-plate.png",
		"id" 	: "cBoxColetePlate",
		"disponivel" : true,
		"preco"	: 20.0
	},
	{ 
		"name" 	: "Colete Tan",		
		"descricao": "Colete tático Tan ",
		"key"	: "coleteTan",
		"imagem": "coleteTan.png",
		"id" 	: "cBoxColeteTan",
		"disponivel" : true,
		"preco"	: 20.0
	},
	{ 
		"name" 	: "Coldre",		
		"descricao": "Coldre lateral de perna com cinto tático",
		"key"	: "coldre",
		"imagem": "coldre.png",
		"id" 	: "cBoxColdre",
		"disponivel" : true,
		"preco"	: 10.0
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
				"telefone": "554784564503",
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
				"telefone": "554784564503",
				"valor": 55.0,
				"equipamentos": "m4"
			}
		]
	},
	{
		"data": "29/07/2018",
		"equipamentos":["m4", "glock", "mascara", "coldre", "coleteTan", "g36", "mascara1", "colete", "shotgun", "oculos", "balaclava"],
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
			},
			{
				"nome": "David",
				"telefone": "554792379460",
				"valor": 55.0,
				"equipamentos": "Shotgun + Óculos telado + Balaclava"
			}
		]
	},
	{
		"data": "05/08/2018",
		"equipamentos":["g36", "colete", "mascara", "oculos", "mascara1", "balaclava"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "David",
				"telefone": "554792379460",
				"valor": 68.0,
				"equipamentos": "G36 + Mascara telada + Colete"
			}
		]
	},
	{
		"data": "12/08/2018",
		"equipamentos":["glock", "colete", "mascara"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "David",
				"telefone": "554792379460",
				"valor": 38.0,
				"equipamentos": "Glock + Mascara telada + Colete"
			}
		]
	},
	{
		"data": "19/08/2018",
		"equipamentos":["m4a1", "colete", "mascara", "coleteTan"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "David",
				"telefone": "554792379460",
				"valor": 63.0,
				"equipamentos": "M4A1 + Mascara telada + Colete"
			},
			{
				"nome": "Erick",
				"telefone": "554788081590",
				"valor": 5.0,
				"equipamentos": "Colete Tan"
			}
		]
	},
	{
		"data": "25/08/2018",
		"equipamentos":["colete", "coleteTan"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Leopoldo",
				"telefone": "554791792502",
				"valor": 10.0,
				"equipamentos": "Colete + ColeteTan"
			}
		]
	},
	{
		"data": "26/08/2018",
		"equipamentos":["m4a1", "g36", "oculos", "oculos1","mascara", "mascara1", "shotgun", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Leonardo",
				"telefone": "554797761388",
				"valor": 127.0,
				"equipamentos": "M4A1 + G36 + Óculos telado + Óculos telado + Mascara telada + Mascara telada"
			},
			{
				"nome": "David",
				"telefone": "554792379460",
				"valor": 58.0,
				"equipamentos": "Shotgun + Mascara telada + Colete"
			}
		]
	},
	{
		"data": "01/09/2018",
		"equipamentos":["glock", "colete", "coleteTan"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Gustavo Henrique",
				"telefone": "554788694364",
				"valor": 40.0,
				"equipamentos": "glock + colete + colete Tan"
			}
		]
	},
	{
		"data": "02/09/2018",
		"equipamentos":["colete", "coleteTan", "m4a1", "mascara"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Leopoldo",
				"telefone": "554791792502",
				"valor": 10.0,
				"equipamentos": "Colete + ColeteTan"
			},
			{
				"nome": "Matheus Kaue",
				"telefone": "554797413577",
				"valor": 58.0,
				"equipamentos": "M4A1 + Mascara"
			}
		]
	},
	{
		"data": "05/09/2018",
		"equipamentos":["colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Igor",
				"telefone": "554788913099",
				"valor": 5.0,
				"equipamentos": "Colete"
			}
		]
	},
	{
		"data": "09/09/2018",
		"equipamentos":["m4a1","mascara", "colete", "g36", "oculos", "mascara1", "coleteTan", "glock", "oculos1", "shotgun"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Guilherme Andretta",
				"telefone": "554699177262",
				"valor": 63.0,
				"equipamentos": "M4A1 + Mascara telada + Colete"
			},
			{
				"nome": "Itrio Woods",
				"telefone": "554797611318",
				"valor": 71.0,
				"equipamentos": "G36 + Óculos + Mascara telada + Colete Tan"
			},
			{
				"nome": "Mateus Ferreira de lima ",
				"telefone": "554796167068",
				"valor": 66.0,
				"equipamentos": "Glock + Glock + Óculos telado + Mascara telada"
			},
			{
				"nome": "Emanuel",
				"telefone": "554784915592",
				"valor": 45.0,
				"equipamentos": "Shotgun + Óculos EPI"
			}
		]
	},
	{
		"data": "16/09/2018",
		"equipamentos":["m4a1","mascara", "coleteTan", "g36", "oculos", "glock", "oculos1", "mascara1"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Caue",
				"telefone": "554699177262",
				"valor": 30.0,
				"equipamentos": "M4A1 + Colete multican"
			},
			{
				"nome": "Allan de Souza Soares",
				"telefone": "554792464983",
				"valor": 100.0,
				"equipamentos": "Máscara telada + Óculos telado + Glock + G36 + Colete Tan"
			},
			{
				"nome": "Andreas Friedrich",
				"telefone": "554791767615",
				"valor": 6.0,
				"equipamentos": "Máscara telada + Óculos telado"
			}
		]
	},
	{
		"data": "23/09/2018",
		"equipamentos":["mascara", "mascara1"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Eduardo",
				"telefone": "554799163942",
				"valor": 6.0,
				"equipamentos": "2 mascaras"
			}
		]
	},
	{
		"data": "29/09/2018",
		"equipamentos":["glock", "colete", "m4a1"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Mateus",
				"telefone": "554796850612",
				"valor": 35.0,
				"equipamentos": "Glock + Colete"
			},
			{
				"nome": "Marcio José Reitz",
				"telefone": "554788470213",
				"valor": 55.0,
				"equipamentos": "M4A1"
			}
		]
	},
	{
		"data": "30/09/2018",
		"equipamentos":["g36", "colete", "oculos", "mascara"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Simei Pereira",
				"telefone": "554788058797",
				"valor": 71.0,
				"equipamentos": "G36 + Colete + oculos + mascara"
			}
		]
	},
	{
		"data": "07/10/2018",
		"equipamentos":["m4a1","glock", "oculos", "balaclava"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Allan de Souza Soares",
				"telefone": "554792464983",
				"valor": 90.0,
				"equipamentos": "M4A1 + glock + oculos + balaclava"
			}
		]
	},
	{
		"data": "20/10/2018",
		"equipamentos":["g36", "mascara", "coleteTan", "m4a1", "mascara1", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Juliano",
				"telefone": "554197021393",
				"valor": 68.0,
				"equipamentos": "G36 + Mascara + colete Tan"
			},
			{
				"nome": "Cristiano",
				"telefone": "554197021393",
				"valor": 63.0,
				"equipamentos": "M4A1 + Mascara + colete"
			}
		]
	},
	{
		"data": "21/10/2018",
		"equipamentos":["g36", "mascara", "coleteTan", "m4a1", "mascara1", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Juliano",
				"telefone": "554197021393",
				"valor": 0.0,
				"equipamentos": "G36 + Mascara + colete Tan"
			},
			{
				"nome": "Cristiano",
				"telefone": "554197021393",
				"valor": 63.0,
				"equipamentos": "M4A1 + Mascara + colete"
			}
		]
	},
	{
		"data": "05/11/2018",
		"equipamentos":["glock", "coleteTan", "oculos"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Samuel da costa correa ",
				"telefone": "554799649838",
				"valor": 38.0,
				"equipamentos": "Glock + Oculos + colete Tan"
			}
		]
	},
	{
		"data": "10/11/2018",
		"equipamentos":["m4a1", "ares", "oculos", "oculos1", "mascara", "mascara1", "colete-multicam", "colete"],
		"responsavel": "Mauricio Michels",
		"obs": [
			{
				"nome": "Dirceu",
				"telefone": "554796540031",
				"valor": 210.0,
				"equipamentos": "M4A1 + Ares Amoeba + Óculos telado + Óculos telado + Máscara telada + Máscara telada + Colete multicam + Colete"
			}
		]
	},
	{
		"data": "24/11/2018",
		"equipamentos":["ares", "mascara", "oculos", "m4a1", "oculos1", "balaclava", "ics", "g36", "colete-multicam"],
		"responsavel": "Lew",
		"obs": [
			{
				"nome": "Luís Carlos",
				"telefone": "554288021253",
				"valor": 75.0,
				"equipamentos": "M4A1 + oculos telado + Balaclava"
			},
			{
				"nome": "Leonardo Geremias",
				"telefone": "554899714196",
				"valor": 85.0,
				"equipamentos": "Ares + Óculos telado + Máscara telada"
			},
			{
				"nome": "Victor Amaral",
				"telefone": "554799388701",
				"valor": 60.0,
				"equipamentos": "ICS"
			} ,
			{
				"nome": "Marco Peretti",
				"telefone": "554792639323",
				"valor": 80.0,
				"equipamentos": "G36 + colete multicam"
			}
		]
	},
	{
		"data": "25/11/2018",
		"equipamentos":["ares", "mascara", "coldre", "glock", "oculos", "g36", "ics", "colete", "colete-plate", "m4a1"],
		"responsavel": "Lew",
		"obs": [
			{
				"nome": "Lucas Erias Comin",
				"telefone": "554797643629",
				"valor": 125.0,
				"equipamentos": "Ares Amoeba + Máscara telada + Glock + Coldre + oculos telado"
			},
			{
				"nome": "Rodrigo C Ricioli",
				"telefone": "554799169455",
				"valor": 160.0,
				"equipamentos": "G36 + ICS + Colete + Colete plate"
			},
			{
				"nome": "Robson da Silva",
				"telefone": "554796337799",
				"valor": 54.0,
				"equipamentos": "M4A1"
			}
		]
	},
	{
		"data": "09/12/2018",
		"equipamentos":["m4a1", "g36", "oculos", "oculos1", "mascara", "mascara1"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Leonardo",
				"telefone": "554797761388",
				"valor": 170.0,
				"equipamentos": "M4A1 + G36 + Oculos + Oculos + Mascara + Mascara"
			}
		]
	},
	{
		"data": "09/12/2018",
		"equipamentos":["m4a1", "g36", "oculos", "oculos1", "mascara", "mascara1"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Leonardo",
				"telefone": "554797761388",
				"valor": 170.0,
				"equipamentos": "M4A1 + G36 + Oculos + Oculos + Mascara + Mascara"
			}
		]
	},
	{
		"data": "16/12/2018",
		"equipamentos":["l96", "coldre"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Sidmar Cunhago",
				"telefone": "554784087583",
				"valor": 80.0,
				"equipamentos": "L96 + coldre"
			}
		]
	},
	{
		"data": "12/01/2019",
		"equipamentos":["m4a1", "colete-multicam", "ics"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Ricky",
				"telefone": "",
				"valor": 0.0,
				"equipamentos": "M4A1 + colete-multicam"
			},
			{
				"nome": "Willian",
				"telefone": "554797471568",
				"valor": 60.0,
				"equipamentos": "ICS"
			}
		]
	},
	{
		"data": "20/01/2019",
		"equipamentos":["coleteTan", "glock", "coldre", "m4a1", "oculos1", "mascara1", "colete-multicam", "g36"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Alex Hedler",
				"telefone": "554797249361",
				"valor": 60.0,
				"equipamentos": "coleteTan + glock + coldre"
			},
			{
				"nome": "Roberto",
				"telefone": "554796050956",
				"valor": 60.0,
				"equipamentos": "G36"
			},
			{
				"nome": "Wagner",
				"telefone": "554798901018",
				"valor": 105.0,
				"equipamentos": "M4A1 + Oculos + Mascara + Colete multicam"
			}
		]
	},
	{
		"data": "09/02/2019",
		"equipamentos":["m4a1", "glock"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Carlos Eduardo José Cordeiro",
				"telefone": "554797095946",
				"valor": 60.0,
				"equipamentos": "M4A1"
			},
			{
				"nome": "Miguel Buss Rocha",
				"telefone": "554796764565",
				"valor": 30.0,
				"equipamentos": "Glock"
			}
		]
	},
	{
		"data": "10/02/2019",
		"equipamentos":[],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Henrique PS",
				"telefone": "554788694364",
				"valor": 75.0,
				"equipamentos": "M4A1 + Mascara"
			}
		]
	},
	{
		"data": "17/02/2019",
		"equipamentos":["m4a1", "g36", "oculos", "oculos1", "mascara", "mascara1"],
		"responsavel": "Mauricio",
		"obs": [
			{
				"nome": "Renato",
				"telefone": "554784638700",
				"valor": 170.0,
				"equipamentos": "M4A1 + G36 + 2 oculos + 2 Mascara"
			}
		]
	}

];

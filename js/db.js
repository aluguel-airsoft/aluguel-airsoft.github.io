var porcentDesconto = 0.117;
var precoMaximo = 85;

var promoCodes = [				
	{
		"code": "FIRMA",
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
		"valor": 0.092,
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
		"data": "17/12/2017",
		"locador": "",
		"equipamentos":[equipamentosExistentes[0].name, equipamentosExistentes[2].name, equipamentosExistentes[4].name]
	},
	{
		"data": "03/12/2017",
		"locador": "Gean Back Viper",
		"equipamentos":[equipamentosExistentes[3].name]
	}
];
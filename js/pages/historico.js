$( document ).ready(function() {

	//------ Date picker -----------

	$('#dataDesejada').datepicker({						
		format: "dd/mm/yyyy",
		startDate: "Today",
		language: "pt-BR",
		daysOfWeekHighlighted: "0",
	});


	//------ Date change ----------

	$('#dataDesejada').datepicker().on('changeDate', function() {
		showReservas();
	});

	$('#dataDesejada').change(function() {				
		showReservas();
	});

	var showReservas = function(argument) {				
		if (res) {
			var htmlToAppend = "<div class=\"row\">\
				<div class=\"col-md-12 col-xs-12 mb-sm\">\
					<b><h4 class=\"text-center\">Responsável: "+res.responsavel+"</h4></b> \
				</div>\
			</div>";
			if (res.equipamentos) {

			}
			if (res.obs) {
				htmlToAppend += "<div class=\"row\">";
				for(var i in res.obs){
					htmlToAppend += "<div class=\"col-md-12 col-xs-12 mb-sm\">\
							<b><h5>" + res.obs[i].nome + "\
								<small> <a target=\"_blank\" href=\"https://api.whatsapp.com/send?phone="+res.obs[i].telefone+"\">("+res.obs[i].telefone+")</a></small>\
							</h5></b>\
							<span>- Equipamentos: "+res.obs[i].equipamentos+" \
								<br/>\
								- Preço: <b>R$ "+res.obs[i].valor.toFixed(2) +"</b>\
							</span>\
						</div>";

					if (res.obs.length-1 > i) {				
						htmlToAppend += "<div class=\"col-md-12 col-xs-12\">\
							<legend></legend>\
						</div>\
						"
					}
				}
				htmlToAppend += "</div>";
			}
			$( "#reservas" ).append( htmlToAppend );
		}
	};

	$( "#veri" ).click(function() {		
		verificaDatas();
	});	


	var verificaDatas = function(dtInicial)	{	
		$('#reservas div').empty();	
		var res = findReserva($("#dataDesejada").val());
		
		var equipamentosEntreDatas = [];
		var datas = returnAllDatas();
		dtFinal = new Date();
		
		datInicio = new Date(dtInicial.substring(6,10), 
							 dtInicial.substring(3,5), 
							 dtInicial.substring(0,2));
		datInicio.setMonth(datInicio.getMonth() - 1); 

		for(var i in datas){
			dataAtual = new Date(datas[i].substring(6,10), 
								 datas[i].substring(3,5), 
								 datas[i].substring(0,2));
			dataAtual.setMonth(dataAtual.getMonth() - 1); 

			if(datInicio <= dataAtual && dtFinal >= dataAtual){

				equipamentosEntreDatas.push(findReserva(datas[i]));

			} else {
			}
		}   

		for(var i in equipamentosEntreDatas){
			var equip = equipamentosEntreDatas[i];



		}
		return array; 
	}

	//------ Page configs --------
	var initialConfig = function(){						
		document.getElementById("ano").textContent = new Date().getFullYear();
	};
	initialConfig();

});
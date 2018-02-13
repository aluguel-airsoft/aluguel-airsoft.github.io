$( document ).ready(function() {
	var precoEquipamentos = 0.0;
	var equipSelecionados = [];

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
		$('#reservas div').empty();	
		var res = findReserva($("#dataDesejada").val());
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


	var verificaDatas = function (dtInicial, dtFinal){	
		
		var dtini = dtInicial;
		var dtfim = dtFinal;
		
		if ((dtini == '') && (dtfim == '')) {
			alert('Complete os Campos.');
			campos.inicial.focus();
			return false;
		}
		
		datInicio = new Date(dtini.substring(6,10), 
							 dtini.substring(3,5), 
							 dtini.substring(0,2));
		datInicio.setMonth(datInicio.getMonth() - 1); 
		
		
		datFim = new Date(dtfim.substring(6,10), 
						  dtfim.substring(3,5), 
						  dtfim.substring(0,2));
		datFim.setMonth(datFim.getMonth() - 1); 

		if(datInicio <= datFim){
			alert('Cadastro Completo!');
			return true;
		} else {
			alert('ATENÇÃO: Data Inicial é maior que Data Final');
			document.all.campos.final.focus();
			document.all.campos.final.select();
			return false;
		}    
	}

	//------ Page configs --------
	var initialConfig = function(){						
		document.getElementById("ano").textContent = new Date().getFullYear();
	};
	initialConfig();

});
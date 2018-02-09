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
		var res = findReserva($("#dataDesejada").val());
		if (res) {
			var htmlToAppend = "";
			if (res.equipamentos) {

			}
			if (res.obs) {
				htmlToAppend += "<div class=\"row mt-xl\">";
				for(var i in res.obs){
					htmlToAppend += "<div class=\"col-md-12 col-xs-12 mb-sm\">\
							<b><h5>" + res.obs[i].nome + "\
								<small> <a target=\"_blank\" href=\"https://api.whatsapp.com/send?phone="+res.obs[i].telefone+"\">("+res.obs[i].telefone+")</a></small>\
							</h5></b>\
							<span>Equipamentos: "+res.obs[i].equipamentos+" \
								<br/>\
								Preço: <b>R$ "+res.obs[i].valor.toFixed(2) +"</b>\
							</span>\
						</div>";

					if (res.obs.length-1 > i) {				
						htmlToAppend += "<div class=\"col-md-12 col-xs-12 mb-sm\">\
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

	//------ Page configs --------
	var initialConfig = function(){					
		document.getElementById("ano").textContent = new Date().getFullYear();
	};
	initialConfig();

});
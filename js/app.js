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

	$("#dataDesejada").keyup(function(campoData){
		if (campoData) {
			var data = campoData.currentTarget.value;
			if (data.length == 2){
				data = data + '/';
				$("#dataDesejada").val(data);
				return true;              
			}
			if (data.length == 5){
				data = data + '/' + new Date().getFullYear();
				$("#dataDesejada").val(data);
				$("#codigoPromocional").focus();
				return true;
			}
		}
	});

	var validaData = function() {
		var data = $("#dataDesejada").val();
		var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02]) [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
		if (!((data.match(RegExPattern)) && (data!=''))) {
			alert('Data inválida.');
			$("#dataDesejada").focus();
			$("#dataDesejada").val("");
			return false;
		}
		else
			var dataArray = data.split("/");
			if (dataArray[2].length < 4) {
				dataArray[2] = "20" + dataArray[2];
				$("#dataDesejada").val(dataArray.join("/"));
				if(!validaData()){
					return false;
				}
			}
			return true;
	};

//------ Checkbox change -------

	window.onChangeFunc = function(thisInput) {		
		var objEquip = findExistEquip("id",thisInput.id);
		if(thisInput.checked) {
			precoEquipamentos += objEquip.preco;
			equipSelecionados.push(objEquip);
		}else {
			precoEquipamentos -= objEquip.preco;
			equipSelecionados.splice( equipSelecionados.indexOf(objEquip), 1);
		}
		writeTotal();
	};

//------ Codigo change -------

	$('#codigoPromocional').change(function() {		
		writeTotal();
	});

//------ Date change ----------

	$('#dataDesejada').datepicker().on('changeDate', function() {
		if(validaData()){
			toggleHide();
		}
	});

	$('#dataDesejada').change(function() {			
		if(validaData()){
			toggleHide();
		}
	});

//------ Confirma -------------

	$( "#confirmar" ).click(function() {			
		var texto = "Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20e%20tenho%20interesse%20em%20alugar%20seus%20equipamentos%20de%20Airsoft.%0AEquipamentos%3A%20%0A";
		var selecionouAlgum = false;
		var equipamentosKey = [];

		for(var i in equipSelecionados){
			texto += "-%20"+ equipSelecionados[i].name +"%0A";
			selecionouAlgum = true;
			equipamentosKey.push(equipSelecionados[i].key);
		}

		if (!selecionouAlgum) {
			alert("Selecione ao menos um equipamento");
			return;
		}

		var userName = $("#userName").val();
		if (!userName) {
			alert("Favor informe seu nome para a reserva");
			return;
		}

		var data = $("#dataDesejada").val();
		if (data) {
			var equipIndis = findEquipReservados(data, equipamentosKey);
			if (equipIndis && equipIndis.length > 0) {
				var auxEquips = "";
				for(var i in equipIndis){
					if (auxEquips) {
						auxEquips += " - "
					}
					auxEquips += findExistEquip("key", equipIndis[i]).name;
				}
				alert("Infelizmente já existe reserva para o(s) equipamento(s) \"" + auxEquips + "\" para o dia "+data);
				return;
			}else{
				texto += "%0ANome%3A%20"+encodeURI(userName)+"%20";
				texto += "%0AData%3A%20"+encodeURI(data)+"%20";
			}
		}else {
			alert("Selecione uma data para locação");
			return;
		}
		
		texto += "%0ATotal%3A%20"+encodeURI("R$ " + getTotal().toFixed(2))+"%20";

		var objPromo = validaPromo();
		if(objPromo){
			texto += "%0A%0AC%C3%B3digo%20promocional%20utilizado%3A%20*" + objPromo.code+"*";
		}

		// var url = "https://api.whatsapp.com/send?text="+texto+"&phone=554797275424";
		var url = "https://api.whatsapp.com/send?text="+texto+"&phone=554799458621";
		window.open(url);
	});

//------ Aux functions --------

	var getTotal = function() {						
		if (validaDesconto()) {
			var totalComDesconto = Math.round(precoEquipamentos - precoEquipamentos*porcentDesconto);
			return totalComDesconto;
		}else{
			return precoEquipamentos;
		}
	};

	var writeTotal = function() {					
		$("#total").text("R$ " + getTotal().toFixed(2));
	};

	var validaDescontoPorSelecao = function() {		
		if(equipSelecionados.indexOf(findExistEquip("key", "m4")) >= 0 &&
			equipSelecionados.indexOf(findExistEquip("key", "glock")) >= 0){
			return true;
		}
		return false;
	};

	var validaDesconto = function() {				
		var objPromo = validaPromo();
		if (objPromo) {
			porcentDesconto = objPromo.valor;
			$("#promAplicada").text("Código promocional aplicado: " + objPromo.code + " (" + objPromo.valor * 100 + "%)");
			return true;
		}else if(validaDescontoPorSelecao()){
			$("#promAplicada").text("");
			return true;
		}else {
			$("#promAplicada").text("");
			return false;
		}
	};

	var validaPromo = function() {					
		var promo = findExistPromo($("#codigoPromocional").val().toUpperCase());		
		if(promo){
			return promo;
		}else {
			return false;
		}
	};

	var setHide = function(idCBox) {				
		if(!$("#"+idCBox + "Hide").hasClass("hide")){
			$("#"+idCBox + "Hide").addClass("hide");
		}
		if ($("#"+idCBox)[0]){
			if ($("#"+idCBox)[0].checked){
				$("#"+idCBox)[0].checked = false;
				$("#"+idCBox + "Hide .checkbox").removeClass("checked");
				return true; 
			}
		}
		return false;
	};

	var rmHide = function(idCBox) {					
		if($("#"+idCBox + "Hide").hasClass("hide")){
			$("#"+idCBox + "Hide").removeClass("hide");
		}
	};

	var toggleHide = function(argument) {			
		var res = findReserva($("#dataDesejada").val());
		var indisponiveis = "";
		if (res) {
			for(var i in equipamentosExistentes){
				if (res.equipamentos.includes(equipamentosExistentes[i].key)){
					if(setHide(equipamentosExistentes[i].id)){
						if (indisponiveis) {
							indisponiveis += " - ";
						}
						indisponiveis += equipamentosExistentes[i].name;

						precoEquipamentos -= equipamentosExistentes[i].preco;
						equipSelecionados.splice( equipSelecionados.indexOf(equipamentosExistentes[i]), 1);
						writeTotal();
					}
				}else{
					rmHide(equipamentosExistentes[i].id);
				}
			}
			if (indisponiveis) {
				alert("Para a data selecionada os equipamentos: \"" + indisponiveis + "\" já foram locados. Estes foram retirados da lista");
			}
		}else{
			for(var i in equipamentosExistentes){
				rmHide(equipamentosExistentes[i].id);
			}
		}
	};

//------ Page configs --------
	var initialConfig = function(){					
		document.getElementById("ano").textContent = new Date().getFullYear();
	};
	initialConfig();

});

var equipBuild = function() {
	var htmlToAppend = "";
	for(var i in equipamentosExistentes){
		if (equipamentosExistentes[i].disponivel) {
			htmlToAppend += "<div class=\"row mt-xl\" id=\""+equipamentosExistentes[i].id+"Hide\">\
				<div class=\"col-md-2 col-xs-5\">\
					<img src=\"assets/images/" + equipamentosExistentes[i].imagem + "\" class=\"img-no-padding img-responsive\">\
				</div>\
				<div class=\"col-md-7 col-xs-5\">\
					<h6>" + equipamentosExistentes[i].name + "<br/><small>"+equipamentosExistentes[i].descricao+" <br/><b>(R$ "+equipamentosExistentes[i].preco.toFixed(2) +")</b></small></h6>\
				</div>\
				<div class=\"col-md-3 col-xs-2\">\
					<div>\
						<label class=\"checkbox\" for=\""+equipamentosExistentes[i].id+"\">\
							<input type=\"checkbox\" onchange=\"onChangeFunc(this)\" value=\"S\" id=\""+equipamentosExistentes[i].id+"\" data-toggle=\"checkbox\">\
						</label>\
					</div>\
				</div>\
			</div>";
		}
	}

	$( "#equipamentos" ).append( htmlToAppend );
};
equipBuild();

// http://amsul.ca/pickadate.js/
// https://github.com/RobinHerbots/Inputmask
// http://robinherbots.github.io/Inputmask/
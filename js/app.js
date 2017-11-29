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

	//------ Checkbox change -------

	window.onChangeFunc = function(thisInput) {		
		var objEquip = findExistEquip("id","#"+thisInput.id);
		if(thisInput.checked) {
			precoEquipamentos += objEquip.preco;
			equipSelecionados.push(objEquip);
		}else {
			precoEquipamentos -= objEquip.preco;
			equipSelecionados.splice( equipSelecionados.indexOf(objEquip), 1);
		}
		setTotal();
	};

	//------ Date change ----------

	$('#dataDesejada').datepicker().on('changeDate', function() {
		toggleHide();
	});

	$('#dataDesejada').change(function() {			
		toggleHide();
	});

	//------ Confirma -------------

	$( "#confirmar" ).click(function() {			

		var texto = "Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20e%20tenho%20interesse%20em%20alugar%20seus%20equipamentos%20de%20Airsoft.%0AEquipamentos%3A%20%0A";
		var selecionouAlgum = false;
		var equipamentosName = [];

		for(var i in equipSelecionados){
			texto += "-%20"+ equipSelecionados[i].name +"%0A";
			selecionouAlgum = true;
			equipamentosName.push(equipSelecionados[i].name);
		}

		if (!selecionouAlgum) {
			alert("Selecione ao menos um equipamento");
			return;
		}

		var data = $("#dataDesejada").val();
		if (data) {
			var equipIndis = equipReservados(data, equipamentosName);
			if (equipIndis && equipIndis.length > 0) {
				var auxEquips = "";
				for(var i in equipIndis){
					if (auxEquips) {
						auxEquips += " - "
					}
					auxEquips += equipIndis[i];
				}
				alert("Infelizmente já existe reserva para o(s) equipamento(s) \"" + auxEquips + "\" para o dia "+data);
				return;
			}else{
				texto += "%0A%20Data%3A%20"+encodeURI(data)+"%20";
			}
		}else {
			alert("Selecione uma data para locação");
			return;
		}
		texto += "%0A%20Total%3A%20"+encodeURI("R$ " + precoEquipamentos.toFixed(2))+"%20%0A";

		var url = "https://api.whatsapp.com/send?text="+texto+"&phone=554799458621";
		window.open(url);
	});

	//------ Aux functions --------

	var setTotal = function() {						
		if (validaDesconto()) {
			var totalComDesconto = Math.round(precoEquipamentos - precoEquipamentos*porcentDesconto);
			if (totalComDesconto > precoMaximo) {
				totalComDesconto = precoMaximo;
			}
			$("#total").text("R$ " + (totalComDesconto).toFixed(2));
		}else {
			$("#total").text("R$ " + precoEquipamentos.toFixed(2));
		}
	}

	var validaDesconto = function() {				
		if(equipSelecionados.indexOf(equipamentosExistentes[0]) >= 0 &&
			equipSelecionados.indexOf(equipamentosExistentes[1]) >= 0){
			return true;
		}else {
			return false;
		}
	};

	var setHide = function(idCBox) {				
		if(!$(idCBox + "Hide").hasClass("hide")){
			$(idCBox + "Hide").addClass("hide");
		}
		if ($(idCBox)[0].checked){
			$(idCBox)[0].checked = false;
			$(idCBox + "Hide .checkbox").removeClass("checked");
			return true; 
		}
		return false;
	};

	var rmHide = function(idCBox) {					
		if($(idCBox + "Hide").hasClass("hide")){
			$(idCBox + "Hide").removeClass("hide");
		}
	};

	var toggleHide = function(argument) {			
		var res = findReserva($("#dataDesejada").val());
		var indisponiveis = "";
		if (res) {
			for(var i in equipamentosExistentes){
				if (res.equipamentos.includes(equipamentosExistentes[i].name)){
					if(setHide(equipamentosExistentes[i].id)){
						if (indisponiveis) {
							indisponiveis += " - ";
						}
						indisponiveis += equipamentosExistentes[i].name;

						precoEquipamentos -= equipamentosExistentes[i].preco;
						equipSelecionados.splice( equipSelecionados.indexOf(equipamentosExistentes[i]), 1);
						setTotal();
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

	var findExistEquip = function(attr, keyWord){	
		return equipamentosExistentes.find(function(aux){return aux[attr] == keyWord})
	};	

	var findReserva = function(data){				
		for (var i in reservas) {
			if(reservas[i].data == data){
				return reservas[i];
			}
		}
	};

	var equipReservados = function(data, equipamentosRequeridos) {
		var equipAlugados = [];
		for (var i in reservas) {
			if(reservas[i].data == data){
				equipAlugados = intersection(equipamentosRequeridos, reservas[i].equipamentos);
				return equipAlugados;
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

	//------ Page configs --------
	var initialConfig = function(){					
		document.getElementById("ano").textContent = new Date().getFullYear();

		$("#precoMaximo").text(precoMaximo.toFixed(2));

		$("#precoM4").text(			"(R$ " + findExistEquip("key","m4").preco.toFixed(2) + 		")");
		$("#precoGlock").text(		"(R$ " + findExistEquip("key","glock").preco.toFixed(2) + 	")");
		$("#precoOculos").text(		"(R$ " + findExistEquip("key","oculos").preco.toFixed(2) + 	")");
		$("#precoMascara").text(	"(R$ " + findExistEquip("key","mascara").preco.toFixed(2) + 	")");
		$("#precoBalaclava").text(	"(R$ " + findExistEquip("key","balaclava").preco.toFixed(2) + ")");
		$("#precoColete").text(		"(R$ " + findExistEquip("key","colete").preco.toFixed(2) + 	")");
		$("#precoColdre").text(		"(R$ " + findExistEquip("key","coldre").preco.toFixed(2) + 	")");
	};
	initialConfig();

});
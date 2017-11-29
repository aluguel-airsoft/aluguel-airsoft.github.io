$( document ).ready(function() {
	var precoEquipamentos = 0.0;
	document.getElementById("ano").textContent = new Date().getFullYear();

	$("#precoM4").text(			"(R$ " + precoM4.toFixed(2) + 			")");
	$("#precoGlock").text(		"(R$ " + precoGlock.toFixed(2) + 		")");
	$("#precoOculos").text(		"(R$ " + precoOculos.toFixed(2) + 		")");
	$("#precoMascara").text(	"(R$ " + precoMascara.toFixed(2) + 		")");
	$("#precoBalaclava").text(	"(R$ " + precoBalaclava.toFixed(2) + 	")");
	$("#precoColete").text(		"(R$ " + precoColete.toFixed(2) + 		")");
	$("#precoColdre").text(		"(R$ " + precoColdre.toFixed(2) + 		")");

	//------ Date picker -----------

	$('#dataDesejada').datepicker({			
		format: "dd/mm/yyyy",
		startDate: "Today",
		language: "pt-BR",
		daysOfWeekHighlighted: "0",
	});

	//------ Checkbox change -------

	$('#cBoxM4').change(function() {		
		if(this.checked) {
			precoEquipamentos += precoM4;
		}else {
			precoEquipamentos -= precoM4;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxGlock').change(function() {		
		if(this.checked) {
			precoEquipamentos += precoGlock;

		}else {
			precoEquipamentos -= precoGlock;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxOculos').change(function() {	
		if(this.checked) {
			precoEquipamentos += precoOculos;

		}else {
			precoEquipamentos -= precoOculos;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxMascara').change(function() {	
		if(this.checked) {
			precoEquipamentos += precoMascara;

		}else {
			precoEquipamentos -= precoMascara;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxBalaclava').change(function() {	
		if(this.checked) {
			precoEquipamentos += precoBalaclava;

		}else {
			precoEquipamentos -= precoBalaclava;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxColete').change(function() {	
		if(this.checked) {
			precoEquipamentos += precoColete;

		}else {
			precoEquipamentos -= precoColete;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxColdre').change(function() {	
		if(this.checked) {
			precoEquipamentos += precoColdre;

		}else {
			precoEquipamentos -= precoColdre;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	//------ Date change ----------

	$('#dataDesejada').datepicker().on('changeDate', function() {
		var res = findReserva($("#dataDesejada").val());

		if (res) {
			if (res.equipamentos.includes(equipamentosExistentes[0])){
				if(!$("#cBoxM4Hide").hasClass("hide")){
					$("#cBoxM4Hide").addClass("hide");
				}
			}else{
				if($("#cBoxM4Hide").hasClass("hide")){
					$("#cBoxM4Hide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[1])){
				if(!$("#cBoxGlockHide").hasClass("hide")){
					$("#cBoxGlockHide").addClass("hide");
				}
			}else{
				if($("#cBoxGlockHide").hasClass("hide")){
					$("#cBoxGlockHide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[2])){
				if(!$("#cBoxOculosHide").hasClass("hide")){
					$("#cBoxOculosHide").addClass("hide");
				}
			}else{
				if($("#cBoxOculosHide").hasClass("hide")){
					$("#cBoxOculosHide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[3])){
				if(!$("#cBoxMascaraHide").hasClass("hide")){
					$("#cBoxMascaraHide").addClass("hide");
				}
			}else{
				if($("#cBoxMascaraHide").hasClass("hide")){
					$("#cBoxMascaraHide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[4])){
				if(!$("#cBoxBalaclavaHide").hasClass("hide")){
					$("#cBoxBalaclavaHide").addClass("hide");
				}
			}else{
				if($("#cBoxBalaclavaHide").hasClass("hide")){
					$("#cBoxBalaclavaHide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[5])){
				if(!$("#cBoxColeteHide").hasClass("hide")){
					$("#cBoxColeteHide").addClass("hide");
				}
			}else{
				if($("#cBoxColeteHide").hasClass("hide")){
					$("#cBoxColeteHide").removeClass("hide");	
				}
			}
			if (res.equipamentos.includes(equipamentosExistentes[6])){
				if(!$("#cBoxColdreHide").hasClass("hide")){
					$("#cBoxColdreHide").addClass("hide");
				}
			}else{
				if($("#cBoxColdreHide").hasClass("hide")){
					$("#cBoxColdreHide").removeClass("hide");	
				}
			}
		}
	});

	//------ Confirma -------------

	$( "#confirmar" ).click(function() {	

		var texto = "Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20e%20tenho%20interesse%20em%20alugar%20seus%20equipamentos%20de%20Airsoft.%0AEquipamentos%3A%20%0A";
		var selecionouAlgum = false;
		var equipamentos = [];

		if($("#cBoxM4")[0].checked){
			texto += "-%20M4%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[0]);
		}
		if($("#cBoxGlock")[0].checked){
			texto += "-%20Glock%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[1]);
		}
		if($("#cBoxOculos")[0].checked){
			texto += "-%20Óculos telado%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[2]);
		}
		if($("#cBoxMascara")[0].checked){
			texto += "-%20Máscara telada%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[3]);
		}
		if($("#cBoxBalaclava")[0].checked){
			texto += "-%20Balaclava%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[4]);
		}
		if($("#cBoxColete")[0].checked){
			texto += "-%20Colete%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[5]);
		}
		if($("#cBoxColdre")[0].checked){
			texto += "-%20Coldre%0A";
			selecionouAlgum = true;
			equipamentos.push(equipamentosExistentes[6]);
		}
		
		if (!selecionouAlgum) {
			alert("Selecione ao menos um equipamento");
			return;
		}

		var data = $("#dataDesejada").val();
		if (data) {
			var equipIndis = equipReservados(data, equipamentos);
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

});
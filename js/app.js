$( document ).ready(function() {
	var precoEquipamentos = 0.0;
	document.getElementById("ano").textContent = new Date().getFullYear();

	var mensagemPadrao = function(argument) {
		return "";
	};

	$('#cBoxM4').change(function() {
		if(this.checked) {
			precoEquipamentos += 55.0;
		}else {
			precoEquipamentos -= 55.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxGlock').change(function() {
		if(this.checked) {
			precoEquipamentos += 30.0;

		}else {
			precoEquipamentos -= 30.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxOculos').change(function() {
		if(this.checked) {
			precoEquipamentos += 3.0;

		}else {
			precoEquipamentos -= 3.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxMascara').change(function() {
		if(this.checked) {
			precoEquipamentos += 3.0;

		}else {
			precoEquipamentos -= 3.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxBalaclava').change(function() {
		if(this.checked) {
			precoEquipamentos += 2.0;

		}else {
			precoEquipamentos -= 2.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxColete').change(function() {
		if(this.checked) {
			precoEquipamentos += 5.0;

		}else {
			precoEquipamentos -= 5.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$('#cBoxColdre').change(function() {
		if(this.checked) {
			precoEquipamentos += 4.0;

		}else {
			precoEquipamentos -= 4.0;
		}
		$("#total").text("R$ " + precoEquipamentos.toFixed(2));
	});

	$( "#confirmar" ).click(function() {

		var texto = "Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20e%20tenho%20interesse%20em%20alugar%20seus%20equipamentos%20de%20Airsoft%0AEquipamentos%3A%20%0A";

		if($("#cBoxM4")[0].checked){
			texto += "-%20M4%0A";
		}
		if($("#cBoxGlock")[0].checked){
			texto += "-%20Glock%0A";
		}
		if($("#cBoxOculos")[0].checked){
			texto += "-%20Óculos telado%0A";
		}
		if($("#cBoxMascara")[0].checked){
			texto += "-%20Máscara telada%0A";
		}
		if($("#cBoxBalaclava")[0].checked){
			texto += "-%20Balaclava%0A";
		}
		if($("#cBoxColete")[0].checked){
			texto += "-%20Colete%0A";
		}
		if($("#cBoxColdre")[0].checked){
			texto += "-%20Coldre%0A";
		}
		
		texto += "%0A%20Total%3A%20"+encodeURI("R$ " + precoEquipamentos.toFixed(2))+"%20%0A";

		var url = "https://api.whatsapp.com/send?text="+texto+"&phone=554799458621";
		window.open(url);
	});

});
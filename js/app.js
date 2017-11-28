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

		var equipamentosSelecionados = [];

		if($("#cBoxM4")[0].checked){
			equipamentosSelecionados.push("M4");
		}
		if($("#cBoxGlock")[0].checked){
			equipamentosSelecionados.push("Glock");
		}
		if($("#cBoxOculos")[0].checked){
			equipamentosSelecionados.push("Oculos");
		}
		if($("#cBoxMascara")[0].checked){
			equipamentosSelecionados.push("Mascara");
		}
		if($("#cBoxBalaclava")[0].checked){
			equipamentosSelecionados.push("Balaclava");
		}
		if($("#cBoxColete")[0].checked){
			equipamentosSelecionados.push("Colete");
		}
		if($("#cBoxColdre")[0].checked){
			equipamentosSelecionados.push("Coldre");
		}

		var url = "https://api.whatsapp.com/send?text=Ol%C3%A1%2C%20vi%20seu%20an%C3%BAncio%20e%20tenho%20interesse%20em%20alugar%20seus%20equipamentos%20de%20Airsoft&phone=554799458621";

		// window.location.href 
		window.open(url);

	});

});
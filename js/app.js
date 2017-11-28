$( document ).ready(function() {

	document.getElementById("ano").textContent = new Date().getFullYear();

	$( "#confirmar" ).click(function() {
		alert( "Handler for .click() called." );
	});

});
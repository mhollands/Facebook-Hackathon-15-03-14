eventID = document.URL.substring(32, 48);

var fbDiv = document.createElement('div');
				fbDiv.setAttribute('id', 'fb-root');
				fbDiv.style.display = "none";
				document.body.insertBefore(fbDiv);

	var script = document.createElement('script');
    script.setAttribute('src', 'https://connect.facebook.net/en_UK/all.js');
    document.body.insertBefore(script);

window.onload = function() {
	var names = [];
	accessToken = 'CAAFWXBUwFG4BAHiiJexQZCvy9Yk2U7rMIIzcF919FhwD2nsyrSnpntoTWHKaSU1lg9PJ2CbTkiiq2bhqZAZCQyJG4FuZBGceWKKSaehCNzpo4sjZA13RSZCof1iN4ySj9kmXMooyBxKalbx05mIFfB1xevkMX6Li1YTDrkdCcrpdzUihiZAwTXJFPKeQgsYpE0ZD';
	FB.api('/' + eventID + '/attending/', { access_token : accessToken}, function(response) {
		for (var i = 0; i < response.data.length; i++) {names[i] = (response.data[i].name);
		names.sort();
		var s = "";
		for (name in names) {
		s += "<option>" + names[name] + "</option>\n";
		}
		document.getElementsByName("attending")[0].innerHTML = s;
	}
	});

};


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
	accessToken = 'CAAFWXBUwFG4BAGgw58UpgZCVth0ZCZAnF5dZAHUdDDRs0lcUCyF1ZCqm7yiEa8WZBHkwoAole878gsPoNnHyOWDonEvYjIouvhQz2wG97iM0QGQeRM0K8w4S2L7JakkCQrhzGpZB2b1kqwWQiRAblxNWaitDFTNZAmuxJlF2d3jDkZC7aSmeS5m7su596gDBx6fkZD';
	FB.api('/' + eventID + '/attending/', { access_token : accessToken}, function(response) {
		for (var i = 0; i < response.data.length; i++) {names[i] = (response.data[i].name);
		var s = "";
		for (name in names) {
		s += "<option>" + names[name] + "</option>\n";
		}
		document.getElementsByName("attending")[0].innerHTML = s;
	}
	});

};


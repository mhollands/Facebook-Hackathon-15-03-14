eventID = document.URL.substring(32, 48);

var fbDiv = document.createElement('div');
				fbDiv.setAttribute('id', 'fb-root');
				fbDiv.style.display = "none";
				document.body.insertBefore(fbDiv);

	var script = document.createElement('script');
    script.setAttribute('src', 'https://connect.facebook.net/en_UK/all.js');
    document.body.insertBefore(script);

if(document.readyState == "complete")
{
	console.log("blahblah");
	window.setTimeout(populate, 500);
}
	
window.addEventListener("load", populate)

function populate(){
	var names = [];
	var accessToken = document.getElementById('token').innerHTML;

	FB.api('/' + eventID, { access_token : accessToken}, function(response) {

		var myName = document.getElementsByClassName("fbxWelcomeBoxName")[0].innerHTML; 
		
		
		var isAdmin = (response.owner.name == myName);
		if(isAdmin == true)
		{
			FB.api('/' + eventID + '/attending/', { access_token : accessToken}, function(response) {
			for (var i = 0; i < response.data.length; i++) names[i] = (response.data[i].name);
			names.sort();
			var s = "";
			for (name in names) {
				s += "<option>" + names[name] + "</option>\n";
			}
			document.getElementsByName("attending")[0].innerHTML = s;
			});
		}
		else{
		document.getElementsByName("attending")[0].innerHTML = "<option>"+myName+"</option>";
		}
		
	});
	
};


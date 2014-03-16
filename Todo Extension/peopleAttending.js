eventID = document.URL.substring(32, 48);





if(document.readyState == "complete")
{
	console.log("blahblah");
	populate();
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
			var taggy = document.createElement('div');
			taggy.setAttribute('id','isAdmin');
			taggy.style.display="none";
			document.head.insertBefore(taggy);
			
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


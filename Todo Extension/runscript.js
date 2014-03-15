

//alert(document.readyState);


var rems = document.getElementsByClassName("rightColumnWrapper")[0];
//var rems = document.getElementById("pagelet_reminders");

if(rems != null)
{
	alert("found");
	document.body.style.background = '#F9966B';
	var div = document.createElement('div');
	div.innerHTML = "<p>example insert</p>";
	div.style.background = 'red';
	rems.insertBefore(div);
	rems.zIndex = '100';
}
else{

}

//chrome.tabs.onUpdated.addListener(stuff);


//document.body.appendChild(div);
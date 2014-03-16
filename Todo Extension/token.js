window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
	console.log(event.data);
	localStorage.token = event.data;
}
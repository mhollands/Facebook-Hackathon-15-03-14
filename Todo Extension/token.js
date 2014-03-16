window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
	console.log(event.data);
	chrome.storage.sync.set({'token': event.data});
}
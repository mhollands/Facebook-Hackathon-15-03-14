var rems = document.getElementsByClassName("rightColumnWrapper")[0];
//var rems = document.getElementById("pagelet_reminders");

//GET LIST OF EVENTS FROM FACEBOOK API
var events = new Array();
events[0] = ["Party", "12345"];
events[1] = ["Holiday", "00000"];
events[2] = ["Work", "54321"];

/*
var link = document.createElement('link');
link.setAttribute("rel", "stylesheet"); link.setAttribute("href", "//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"); document.head.insertBefore(link);

var script = document.createElement('script');
script.setAttribute("src", "//code.jquery.com/jquery-1.9.1.js"); document.head.insertBefore(script);

script = document.createElement('script');
script.setAttribute("src", "//code.jquery.com/ui/1.10.4/jquery-ui.js"); document.head.insertBefore(script);

link = document.createElement('link');
link.setAttribute("rel", "stylesheet"); link.setAttribute("href", "/resources/demos/style.css"); document.head.insertBefore(link);

script = document.createElement('script');
script.innerHTML = '$(function() {$( "#accordion" ).accordion();});';
document.head.insertBefore(script);
*/

if(rems != null)
{
    alert("found");

    //insert layout breaks
    rems.insertBefore(document.createElement("br"));
    rems.insertBefore(document.createElement("hr"));

    //create the overall div
    var div = document.createElement('div');

    //go through every event
    for (var i = 0; i < events.length; i++)
    {
        //create the event title
        var header = document.createElement('h3');
        header.innerText = events[i][0];
        div.insertBefore(header);
        //create box with checks in it
        var box = document.createElement('div');
        div.insertBefore(box);
        //create layout line
        div.insertBefore(document.createElement("hr"));

        //GET LIST OF TODOS FROM PARSE
        var items = new Array();
        items[0] = ["movies", "true", "val1"];
        items[1] = ["food", "false", "val2"];

        //for every item to do
        for (var u = 0; u < items.length; u++) {
            //create a text description
            var text = document.createElement('p');
            text.innerText = items[u][0];
            text.style.textIndent = "5em";
            box.insertBefore(text);

            //create checkbox
            var checkbox = document.createElement('input');
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", items[u][0]);
            checkbox.checked = (items[u][1] == "true" ? true : false);
            checkbox.onclick = checkbox_toggle;
            //put it after the text
            text.insertBefore(checkbox);
        }

        
    }
	
    rems.insertBefore(div, document.getElementById("pagelet_trending_tags_and_topics"));
    rems.zIndex = '100';
}
else{

}

function checkbox_toggle()
{
    alert("toggle");

}

//document.getElementsByClassName("accordion")[0].accordion();
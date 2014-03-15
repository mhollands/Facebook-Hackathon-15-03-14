
/*
var connection = new ActiveXObject("ADODB.Connection");

var connectionstring = "Data Source=sql2.freesqldatabase.com;Initial Catalog=sql233229;User ID=sql233229;Password=VN2URbE4q9Qm;";

connection.Open(connectionstring);
var rs = new ActiveXObject("ADODB.Recordset");

var command = 'CREATE TABLE table_name(col1 int);';

rs.Open("CREATE", connection);
rs.MoveFirst
while (!rs.eof) {
    document.write(rs.fields(1));
    rs.movenext;
}

rs.close;
connection.close;

//myFunction();
*/
function func() {

    var isEvent = (document.URL.indexOf("https://www.facebook.com/events/") == 0);

    var rems = null;

    var eventid = 0;

    if (isEvent)
    {
        rems = document.getElementById("contentArea");
        eventid = getEventIDFromUrl();
    }
    else
    {
        rems = document.getElementsByClassName("rightColumnWrapper")[0];
    }
    
 
    //var rems = document.getElementById("pagelet_reminders");

    //GET LIST OF EVENTS FROM FACEBOOK API
    var events = new Array();
    events[0] = ["Party", "1478584339036425"];
    events[1] = ["Holiday", "00000"];
    events[2] = ["Work", "54321"];

    if (rems != null) {
        //alert("found");

        //insert layout breaks
        rems.insertBefore(document.createElement("br"));
        rems.insertBefore(document.createElement("hr"));

        //create the overall div
        var div = document.createElement('div');
        div.setAttribute("id", "todoList");

        //go through every event
        for (var i = 0; i < events.length; i++) {

            if (isEvent == false || eventid == events[i][1]) {
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
        }

        if (isEvent) {
            
            var createbox = document.createElement('input');
            createbox.setAttribute('type', 'text');
            createbox.setAttribute('value', 'Create new task...');
            createbox.style.marginLeft = "5em";
            createbox.onfocus = createbox_focussed;
            div.insertBefore(createbox);
            
            //var frame = document.createElement('iframe');
            //frame.src = "http://stackoverflow.com/questions/18228993/textbox-default-text-make-dissapear-on-focus";
            //div.insertBefore(frame);
        }
       

        //add it to the page depending on whether its newsfeed or event
        if (isEvent) {
			rems.insertBefore(div, document.getElementById("event_description"));
			//rems.insertBefore(div);
            div.style.backgroundColor = "white";
        }
        else {
            rems.insertBefore(div);
        }
        rems.zIndex = '100';
    }
    else {
       //alert("not found");
    }

}

window.setInterval(function () {
    if(document.getElementById("todoList")==null)
    {
        func();
    }
}, 1000);

var myfileurl = "http://www.this-page-intentionally-left-blank.org/";

function createbox_focussed(e)
{
    alert(e.innerText);
}

function checkbox_toggle()
{
    alert("toggle");
}

function getEventIDFromUrl()
{
    var eventID = document.URL.substring(32, 48);
    return eventID;
}

//document.getElementsByClassName("accordion")[0].accordion();

function myFunction()
{
    loadjscssfile("parse-1.2.13.min.js", "js") //dynamically load and add this .js file

    Parse.$ = jQuery;
    Parse.initialize("3bWxW7KCxkHuf0OeM2s3KhTneI1j23ZnVu3hfvzK","RZ0WWQQFWQa9tFPyPreB1V9Amu0ZGnWzE0X8y48t");
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.set("eventId","00001");
    testObject.set("eventName","test event");
    testObject.save();
    //testObject.save({foo: "bar111"}).then(function(object) {
    alert("yay! it worked");
    alert(testObject.get("eventId"));
    alert(testObject.get("eventName"));

    //});
}



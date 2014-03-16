

function func() {

    Parse.$ = jQuery;
    Parse.initialize("AUHoFI9B7N6wfw0xjAtNv2AEpfNB7xpSlN67Rt07", "TkLHOAvw7UZDQ8LljMutMzRbGLeaS1rt5K3ByxFW");

    //var script = document.createElement('script');
    //script.setAttribute('src', 'http://www.parsecdn.com/js/parse-1.2.13.min.js');
    //document.head.insertBefore(script);

    //myFunction();

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

    //GET LIST OF EVENTS FROM FACEBOOK API
    var events = new Array();
    //events[0] = ["Party", "1478584339036425"];
    //events[1] = ["Holiday", "00000"];
    //events[2] = ["Work", "54321"];

    //alert(p.length);

    //ar tasks = getTasksForUser("Matt Hollands");

    if (rems != null) {
        //alert("found");

        //insert layout breaks
        rems.insertBefore(document.createElement("br"));
        rems.insertBefore(document.createElement("hr"));

        //create the overall div
        var div = document.createElement('div');
        div.setAttribute("id", "todoList");

        if (isEvent) {
            //add create box
            var createbox = document.createElement('input');
            createbox.setAttribute('type', 'text');
            createbox.setAttribute('value', 'Create new task...');
            createbox.setAttribute('id', 'createbox');
            createbox.style.marginLeft = "5em";
            createbox.style.width = "50%";
            createbox.onfocus = createbox_focussed;
            div.insertBefore(createbox);
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

        getEventsForUser("Bunty Makhija");

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

function createbox_focussed()
{
    if (document.getElementById('createbox').getAttribute('value') == 'Create new task...') {
        document.getElementById('createbox').setAttribute('value', '');
    }
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

function getEventsForUser(userName) {
    var Task = Parse.Object.extend("Task");
    var t1 = new Task();

    var query = new Parse.Query(Task);

    query.equalTo("User_name", userName);
    var events = new Array();
    var usedIds = new Array();

    query.find({
        success: function (res) {

            for (var i = 0; i < res.length; i++) {
                var id = res[i].get('Event_id');
                var name = res[i].get('Event_name');
                
                if(usedIds.indexOf(id) == -1)
                {
                    usedIds[usedIds.length] = id;
                    events[events.length] = [name, id];
                }
            }
            alert(events.length);

            var isEvent = (document.URL.indexOf("https://www.facebook.com/events/") == 0);
            if (isEvent) { eventid = getEventIDFromUrl(); }
            

            var div = document.getElementById('todoList');

            for (i = 0; i < events.length; i++) {
                alert("going");
                if (isEvent == false || eventid == events[i][1]) {
                    
                    var header = document.createElement('h3');
                    header.innerText = events[i][0];
                    div.insertBefore(header);
                    //create box with checks in it
                    var box = document.createElement('div');
                    box.setAttribute('id','box'+events[i][1])
                    div.insertBefore(box);
                    //create layout line
                    div.insertBefore(document.createElement("hr"));

                    //query tasks
                    var Task = Parse.Object.extend("Task");
                    var t1 = new Task();

                    var query = new Parse.Query(Task);

                    query.equalTo("User_name", userName);
                    query.equalTo("Event_id", events[i][1]);
                                       

                    query.find({
                        success: function (tasks) {
                            // results is an array of Parse.Object.
                            alert(tasks.length);

                            for (var u = 0; u < tasks.length; u++) {
                                var text = document.createElement('p');
                                text.innerText = tasks[u].get('Task_name');
                                text.style.textIndent = "5em";
                                text.setAttribute('id', tasks[u].get('Event_id'));
                                document.getElementById('box'+tasks[u].get('Event_id')).insertBefore(text);
                                
                                //create checkbox
                                var checkbox = document.createElement('input');
                                checkbox.setAttribute("type", "checkbox");
                                checkbox.setAttribute("name", tasks[u].get('Task_name'));
                                checkbox.checked = (tasks[u].get('completed') == "true" ? true : false);
                                checkbox.onclick = checkbox_toggle;
                                //put it after the text
                                text.insertBefore(checkbox);
                            }
                        },

                        error: function (error) {
                            // error is an instance of Parse.Error.
                            alert("error");
                        }
                    });

                }
            }

        },

        error: function (error) {
            // error is an instance of Parse.Error.
            alert("error");
        }
    });

}
/*
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
*/
function getTasksForUser(userName)
{
    var Task = Parse.Object.extend("Task");
    var t1 = new Task();

    var query = new Parse.Query(Task);

    query.equalTo("User_name", userName);

    var results = new Array();

    query.find({
        success: function (res) {
            // results is an array of Parse.Object.
            alert("ok");
            alert(res.length);
            
            for (var i = 0; i < res.length; i++) {
                results[i] = [res[i].get("Task_name"), res[i].get("complete")];
            }


        },

        error: function (error) {
            // error is an instance of Parse.Error.
            alert("error");
        }
    });

    return results;

}

function myFunction()
{

    //Parse.$ = jQuery;
    //Parse.initialize("AUHoFI9B7N6wfw0xjAtNv2AEpfNB7xpSlN67Rt07", "TkLHOAvw7UZDQ8LljMutMzRbGLeaS1rt5K3ByxFW");
    var Task = Parse.Object.extend("Task");
    var t1 = new Task();

    var query = new Parse.Query(Task);
    
    query.equalTo("User_name", "Matt Hollands");
    
    query.find({
        success: function (results) {
            // results is an array of Parse.Object.
            alert("ok");
            alert(results.length);
        },

        error: function (error) {
            // error is an instance of Parse.Error.
            alert("error");
        }
    });
   
}



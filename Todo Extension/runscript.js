

function func() {

    Parse.$ = jQuery;
    Parse.initialize("AUHoFI9B7N6wfw0xjAtNv2AEpfNB7xpSlN67Rt07", "TkLHOAvw7UZDQ8LljMutMzRbGLeaS1rt5K3ByxFW");

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




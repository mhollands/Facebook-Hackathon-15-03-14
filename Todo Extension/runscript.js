

function func() {
    Parse.$ = jQuery;
    Parse.initialize("AUHoFI9B7N6wfw0xjAtNv2AEpfNB7xpSlN67Rt07", "TkLHOAvw7UZDQ8LljMutMzRbGLeaS1rt5K3ByxFW");


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

    if (rems != null) {
        //alert("found");

        //insert layout breaks
        rems.insertBefore(document.createElement("br"));
        rems.insertBefore(document.createElement("hr"));

        //create the overall div
        var div = document.createElement('div');
        div.setAttribute("id", "todoList");

        if (isEvent) {
            var createListBox = document.createElement('select');
            createListBox.setAttribute('name', 'attending');
            //createListBox.setAttribute('multiple', 'multiple');
            createListBox.setAttribute('id', 'createlistbox');
            div.insertBefore(createListBox);
            //add create box
            var createbox = document.createElement('input');
            createbox.setAttribute('type', 'text');
            createbox.setAttribute('value', 'Create new task...');
            createbox.setAttribute('id', 'createbox');
            createbox.setAttribute('name', 'newTaskName');
            createbox.style.marginLeft = "5em";
            createbox.style.width = "50%";
            createbox.onfocus = createbox_focussed;
            div.insertBefore(createbox);

            var createbutton = document.createElement('input');
            createbutton.setAttribute('type', 'button');
            createbutton.value = "Create";
            createbutton.onclick = createButtonClick;
            div.insertBefore(createbutton);
			
			var createToken = document.createElement('div');
			createToken.setAttribute('style', 'display:none');
			createToken.setAttribute('id', 'token');
			div.insertBefore(createToken);
			chrome.storage.sync.get('token', function(result) { createToken.innerHTML = result['token']; });


            var s = document.createElement('script');
            s.src = chrome.extension.getURL('peopleAttending.js');
            (document.head || document.documentElement).appendChild(s);

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

        var myname = document.getElementsByClassName("fbxWelcomeBoxName");
        getEventsForUser(myname[0].innerHTML);

    }
    else {
       //alert("not found");
    }

}

function createButtonClick()
{
    var taskName = document.getElementById('createbox').value;
    var eventName = document.title;

    var list = document.getElementById('createlistbox');
    
    for (var i = 0; i < list.options.length; i++) {
        if (list.options[i].selected == true) {
           createTask(list.options[i].value, taskName, getEventIDFromUrl(), eventName, 2014, 1, 1);
        }
    }
    update();
}

window.setInterval(function () {
    if(document.getElementById("todoList")==null)
    {
        func();
    }
}, 1000);

function createbox_focussed()
{
    if (document.getElementById('createbox').getAttribute('value') == 'Create new task...') {
        document.getElementById('createbox').setAttribute('value', '');
    }
}

function checkbox_toggle(sender)
{
    if (sender.target.checked == true) {

        var r = confirm("Are you sure you have completed the task??");
        if (r == true) {
            var Task = Parse.Object.extend("Task");

            var query = new Parse.Query(Task);

            query.equalTo("objectId", sender.target.getAttribute('uid'));

            query.find({
                success: function (res) {
                    res[0].set('completed', sender.target.checked);
                    res[0].save();
                },
                error: function (error) {
                    alert("error");
                }
            });
        }
        else {
            sender.target.checked = false;
        }
    }
    else {
        var Task = Parse.Object.extend("Task");

        var query = new Parse.Query(Task);

        query.equalTo("objectId", sender.target.getAttribute('uid'));

        query.find({
            success: function (res) {
                res[0].set('completed', sender.target.checked);
                res[0].save();
            },
            error: function (error) {
                alert("error");
            }
        });
    }
    update();
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

            var isEvent = (document.URL.indexOf("https://www.facebook.com/events/") == 0);
            if (isEvent) { eventid = getEventIDFromUrl(); }
            

            var div = document.getElementById('todoList');

            for (i = 0; i < events.length; i++) {
                if (isEvent == false || eventid == events[i][1]) {
                    
                    var header = document.createElement('h3');
                    header.innerText = events[i][0];
                    div.insertBefore(header, document.getElementById('createlistbox'));
                    //create box with checks in it
                    var box = document.createElement('div');
                    box.setAttribute('id','box'+events[i][1])
                    div.insertBefore(box, document.getElementById('createlistbox'));
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
                                checkbox.setAttribute('uid', tasks[u].id);
                                checkbox.checked = tasks[u].get('completed');
                                checkbox.onclick = checkbox_toggle;
                                //put it after the text
                                text.insertBefore(checkbox);
                               
                                var delbut = document.createElement('input');
                                delbut.setAttribute('type', 'button');
                                delbut.value = "✖";
                                delbut.style.marginLeft = "0px";
                                delbut.onclick = delete_button_clicked;
                                delbut.style.border = "none";
                                delbut.style.background = "white";
                                text.insertBefore(delbut);
                                
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

function update()
{
    var element = document.getElementById('todoList');
    element.parentElement.removeChild(element);
}

function delete_button_clicked(sender)
{
    var Task = Parse.Object.extend("Task");

    var query = new Parse.Query(Task);

    query.equalTo("objectId", sender.target.previousSibling.getAttribute('uid'));

    query.find({
        success: function (myObj) {
            myObj[0].destroy({});
            update();
        },
        error: function (error) {
            alert("error");
        }
    });

}



function createTask(userName, taskName, eventId, eventName, year, month, date)
{
    var Task = Parse.Object.extend("Task");
    var newTask = new Task();

    newTask.set('User_name', userName);
    newTask.set('Task_name', taskName);
    newTask.set('Event_id', eventId);
    newTask.set('Event_name', eventName);
    newTask.set('completed', false);
    newTask.set('end_year', year);
    newTask.set('end_month', month);
    newTask.set('end_date', date);
    
    newTask.save();
}




// (function() {
    let taskId = 101;
    if(localStorage.taskId)
        taskId = localStorage.taskId;
    else
        localStorage.taskId = taskId;
    let taskClick = false;
    let delVar = 0;
    let selectedId = 0;

    let TaskList = {
    };

    let UserCardList = {

    };
    const TASKID = document.getElementById("task_id");
    const DUEDATE = document.getElementById("due_d");
    const ASSIGNEE = document.getElementById("assign_d");
    const TODO = document.getElementById("todo");
    const DOING = document.getElementById("doing");
    const DONE = document.getElementById("done");
    const TITLE = document.getElementById("title_d");
    const TASKS = localStorage.getItem('TaskList');
    const USERS = localStorage.getItem("UserList");

    function onLoadFunction() {
            let x = TASKS;
            if(USERS)
            {
                UserCardList = JSON.parse(USERS);
            }
            if(x != null){
                TaskList = JSON.parse(TASKS);
                console.log("abc");
            }
            else
            {
                localStorage.setItem('TaskList',JSON.stringify(TaskList));
                console.log("xyz");
            }
            showAllUsers();
            showAllTasksList(TaskList);
    }

    function displayEventHandler(id) {
        console.log("display");
        console.log(id);


        let taskName = TaskList[id].TaskName;
        let currStatus = TaskList[id].Status;
        let userName = TaskList[id].UserName;
        let due = TaskList[id].DueDate;

        TASKID.value = id;
        TITLE.value = taskName;
        DUEDATE.value = due;
        ASSIGNEE.value = userName;
        console.log(TASKID.value);

        if (TaskList[id].Status == 0) {
            TODO.checked = true;
        }
        else if (TaskList[id].Status == 2) {
            DONE.checked = true;
        }
        else {
            DOING.checked = true;
        }


        // let TaskDescription = document.getElementsByClassName("Card_Part2");
        // let childDiv = TaskDescription[0].childNodes;
        // childDiv[1].innerHTML = taskName;
        // console.log(childDiv[5].className);
        // let inputs = childDiv[5].getElementsByTagName('input');
        //
        // for(let i of inputs)
        // {
        //     if(i.value == currStatus)
        //     {
        //         console.log("aaa"+" "+currStatus);
        //         i.checked = true;
        //     }
        // }
        //
        // let memberDetail = (childDiv[7].childNodes)[3];
        // // console.log((memberDetail.childNodes)[1].innerHTML);
        // // console.log(userName);
        //
        // (memberDetail.childNodes)[1].innerHTML = userName;
        delVar = id;
        taskClick = true;

    }

    function deletionEventHandler(id) {

        console.log("deletion");
        console.log(id);
        let item = TaskList[id];
        let uid = item['UserId'];
        let currStat = item['Status'];
        console.log(currStat);
        let CardSel = document.getElementById(uid);
        let TaskListNode = CardSel.childNodes[2 * currStat + 3];
        console.log(TaskListNode.className);
        console.log(document.getElementById(id));
        // delete TaskList[id];
        removeFromLocalStorage(id);
        TaskListNode.removeChild(document.getElementById(id));

    }

    function showAllUsers() {
        let UserListNode = document.getElementById("TaskDetails");
        Object.keys(UserCardList).forEach((itemId) => {
            const itemNode = document.createElement("div");
            const item = UserCardList[itemId];

            itemNode.setAttribute("id", item["id"]);
            itemNode.setAttribute("class", "Card");

            itemNode.innerHTML = `
        
                    <p class="Title_Card">${item["Name"]}</p>
                    <div class="Todo heading_Cards" onclick="{onClickHeading()}" id="Todo" ondrop="drop()" ondragover="allowDrop()">Todo<img src="img/plus.png" class = "plus">
                    </div>
                    <div class="Doing heading_Cards" onclick="{onClickHeading()}" id="Doing" ondrop="drop()" ondragover="allowDrop()">Doing<img src="img/plus.png" class = "plus">
                    </div>
                    <div class="Done heading_Cards" onclick="{onClickHeading()}" id="Done" ondrop="drop()" ondragover="allowDrop()">Done<img src="img/plus.png" class = "plus">
                    </div>        
        `;
            UserListNode.appendChild(itemNode);
        });


    }

    function onClickHeading() {
        // console.log(event.target.className);
        // console.log(event.target.parentNode.className);
        let currStat = event.target;
        let className = currStat.className;
        if(className == "plus")
        {
            refreshEntries();
            document.getElementById("")
            ASSIGNEE.value = UserCardList[currStat.parentNode.parentNode.id].Name;

            TODO.checked = true;
            if(currStat.parentNode.className == "Doing heading_Cards")
            {
                DOING.checked = true;
            }
            else if(currStat.parentNode.className == "Done heading_Cards")
            {
                DONE.checked = true;
            }

            taskClick = false;
            // console.log(UserCardList[currStat.parentNode.parentNode.id]);
        }
        else if(className == "Todo heading_Cards" || className == "Doing heading_Cards" || className == "Done heading_Cards")
        {

        }
        else
        {
            return;
        }
    }

    function drop() {
        console.log("dr0p");
        let data = event.dataTransfer.getData("text");
        // console.log(event.target.id);
        let val = event.target.id;
        let uid = event.target.parentNode.id;
        let stat = 0;
        if (val == "Doing")
            stat = 1;
        else if (val == "Done")
            stat = 2;
        let tid = selectedId;
        let tname = TaskList[tid].TaskName;
        let dued = TaskList[tid].DueDate;
        if (UserCardList[uid] != undefined) {
            deletionEventHandler(tid);
            TaskList[tid] = {
                "UserName": UserCardList[uid].Name,
                "id": tid,
                "TaskName": tname,
                "Status": stat,
                "Desc": "",
                "UserId": uid,
                "DueDate": dued,
            }

            // displayEventHandler(tid);
            taskClick = false;
            addToLocalStorage(tid,TaskList[tid]);
            addTask(TaskList[tid]);
        }
    }

    function allowDrop() {
        //console.log("allowDrop");
        event.preventDefault();
    }

    function drag() {

        let id = event.target.id;
        event.dataTransfer.setData("text", id);
        console.log("idhar to aa gaya");
        console.log(id);
        selectedId = id;
        // displayEventHandler(id);
    }

    function showAllTasksList(TaskList) {
        Object.keys(TaskList).forEach((itemId) => {

            addTask(TaskList[itemId]);

            // const itemNode = document.createElement("p");
            // const item = TaskList[itemId];
            //
            // itemNode.setAttribute("id", item["id"]);
            // itemNode.setAttribute("class", "Title_List");
            // itemNode.setAttribute("draggable",true);
            // itemNode.setAttribute("ondragstart",`drag()`);
            // // console.log(item["id"]);
            // // console.log(item["Status"]);
            // // console.log(item["TaskName"]);
            //
            // let uid = item["UserId"];
            // let currStat = item["Status"];
            //
            // let CardSel = document.getElementById(uid);
            // let TaskListNode = null;
            // TaskListNode = CardSel.childNodes[2*currStat + 3];
            // console.log(item["UserName"]);
            // // console.log(TaskListNode.className);
            //
            // itemNode.innerHTML = `<p onclick={displayEventHandler("${item['id']}")} ondragstart=drag() >${item["TaskName"]}</p>`;
            // console.log(item);
            // TaskListNode.appendChild(itemNode);
        });
    }

    function addNewUser() {
        taskClick = false;
        refreshEntries();
        lastId++;
    }

    function submitTask() {
        console.log(taskClick);
        if (taskClick) {
            alert("Already Submitted");
            return;
        }
        let uname = ASSIGNEE.value;
        let tname = TITLE.value;
        let status;
        if (TODO.checked) {
            status = 0;
        }
        else if (DONE.checked) {
            status = 2;
        }
        else if (DOING.checked) {
            status = 1;
        }
        let dued = DUEDATE.value;
        TaskList[localStorage.taskId] = {
            "UserName": uname,
            "id": localStorage.taskId,
            "TaskName": tname,
            "Status": status,
            "Desc": "",
            "UserId": uname.charAt(uname.length - 1),
            "DueDate": dued,
        }
        addToLocalStorage(localStorage.taskId,TaskList[taskId]);
        addTask(TaskList[localStorage.taskId]);
        localStorage.taskId++;

    }

    function onclickTask(id){

        console.log(id);
        let captured = event.target.className;
        if(captured == "imgDel")
        {
            deletionEventHandler(id);
            refreshEntries();
        }

        else if(captured == "imgEdit")
        {
            console.log("here her here here ");
            editEventHandler(id);
        }

        else if(captured == "Title_List")
        {
            displayEventHandler(id);
        }

        else
        {
            return;
        }
    }

    function addTask(item) {
        const itemNode = document.createElement("p");
        itemNode.setAttribute("id", item["id"]);
        itemNode.setAttribute("class", "Title_List");
        itemNode.setAttribute("draggable", true);
        itemNode.setAttribute("ondragstart", `drag()`);

        let uid = item["UserId"];
        let currStat = item["Status"];

        let CardSel = document.getElementById(uid);
        let TaskListNode = CardSel.childNodes[2 * currStat + 3];
        console.log(item["UserName"]);
        // console.log(TaskListNode.className);

        itemNode.innerHTML = `<p onclick={onclickTask("${item["id"]}")} class = "Title_List" >${item["TaskName"]}
<img src="img/edit.png" class = "imgEdit"><img src="img/cancel.png" class = "imgDel"></p>`;
        // itemNode.getElementsByClassName("Title_List")[0].addEventListener('click',onclickTask(item["id"]),false);
        // itemNode.getElementsByClassName("Title_List")[0].on
        TaskListNode.appendChild(itemNode);

        refreshEntries();
    }

    function editEventHandler(id) {
        let item = TaskList[id];
        console.log(item);
        displayEventHandler(id);
        // deletionEventHandler(id);
        // debugger;
        let submitBtn = document.getElementById('add_button');
        submitBtn.style.cssText = 'display:none';

        let editBtn = document.getElementById('edit_button');
        editBtn.style.cssText = 'visibility:visible';
        editBtn.setAttribute("onclick",`changeDetails(${id});return false;`);

        let canBtn = document.getElementById('can_button');
        canBtn.style.cssText = 'visibility:visible';
        canBtn.setAttribute("onclick",`refreshEntries();return false;`);

    }

    function changeDetails(id){
        console.log("come here");
        deletionEventHandler(id);
        let status;
        if (TODO.checked) {
            status = 0;
        }
        else if (DONE.checked) {
            status = 2;
        }
        else if (DOING.checked) {
            status = 1;
        };
        let uname = ASSIGNEE.value;
        TaskList[id] = {
            "UserName": uname,
            "id": id,
            "TaskName": TITLE.value,
            "Status": status,
            "Desc": "",
            "UserId": uname.charAt(uname.length - 1),
            "DueDate": DUEDATE.value,
        };
        addToLocalStorage(id,TaskList[id]);
        addTask(TaskList[id]);

        refreshEntries();
}

    function refreshEntries() {
        console.log("aaaaaa");
        ASSIGNEE.value = "";
        TITLE.value = "";
        DUEDATE.value = "";
        TODO.checked = false;
        DOING.checked = false;
        DONE.checked = false;

        let submitBtn = document.getElementById('add_button');
        submitBtn.style.cssText = 'display:block';

        let editBtn = document.getElementById('edit_button');
        editBtn.style.cssText = 'visibility:hidden';

        let canBtn = document.getElementById('can_button');
        canBtn.style.cssText = 'visibility:hidden';
    }

    function removeFromLocalStorage(id) {
        let retrievedList = JSON.parse(TASKS);
        delete retrievedList[id];
        localStorage.setItem('TaskList',JSON.stringify(retrievedList));
    }

    function addToLocalStorage(id,item) {
        let retrievedList = JSON.parse(TASKS);
        retrievedList[id] = item;
        localStorage.setItem('TaskList',JSON.stringify(retrievedList));
}
//     onLoadFunction();
// })();


// itemNode.getElementsByClassName("Title_List")[0].addEventListener('click',function (e){onclickTask(this,item["id"]);},false);
//399

// (function() {
    let taskId = 108;

    var taskClick = false;
    let delVar = 0;
    let selectedId = 0;
    const TaskList = {
        101: {
            "UserName": "User1",
            "id": 101,
            "TaskName": "Task1",
            "Status": 0,
            "Desc": "",
            "UserId": 1,
            "DueDate": "2020-01-01",
        },
        102: {
            "UserName": "User2",
            "id": 102,
            "TaskName": "Task2",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        },
        103: {
            "UserName": "User2",
            "id": 103,
            "TaskName": "Task3",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        },
        104: {
            "UserName": "User2",
            "id": 104,
            "TaskName": "Task4",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        },
        105: {
            "UserName": "User2",
            "id": 105,
            "TaskName": "Task5",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        },
        106: {
            "UserName": "User2",
            "id": 106,
            "TaskName": "Task6",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        },
        107: {
            "UserName": "User2",
            "id": 107,
            "TaskName": "Task7",
            "Status": 1,
            "Desc": "",
            "UserId": 2,
            "DueDate": "2025-01-01",
        }

    };
    const UserCardList = {
        1: {
            UserName: "User1",
            UserId: 1,
        },
        2: {
            UserName: "User2",
            UserId: 2,
        },
        3: {
            UserName: "User3",
            UserId: 3,
        },
        4: {
            UserName: "User4",
            UserId: 4,
        },
        5: {
            UserName: "User5",
            UserId: 5,
        },
    };

    function onLoadFunction() {
        showAllUsers();
        showAllTasksList(TaskList);
    }

    window.onLoadFunction = onLoadFunction;

    function hideCancelButton(){
        let cancelBtn = document.getElementById('del_button');
        cancelBtn.style.cssText = 'visibility:hidden';
    }

    function displayEventHandler(id) {
        console.log("display");
        console.log(id);

        hideCancelButton();

        let taskName = TaskList[id].TaskName;
        let currStatus = TaskList[id].Status;
        let userName = TaskList[id].UserName;
        let due = TaskList[id].DueDate;

        document.getElementById("task_id").value = id;
        document.getElementById("title_d").value = taskName;
        document.getElementById("due_d").value = due;
        document.getElementById("assign_d").value = userName;
        console.log(document.getElementById("task_id").value);

        if (TaskList[id].Status == 0) {
            document.getElementById("todo").checked = true;
        }
        else if (TaskList[id].Status == 2) {
            document.getElementById("done").checked = true;
        }
        else {
            document.getElementById("doing").checked = true;
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
        delete TaskList[id];

        TaskListNode.removeChild(document.getElementById(id));

    }

// let ptags = document.getElementsByClassName("Title_List");
// // console.log(ptags);
// for(let i in ptags){
//     ptags[i].onclick = displayEventHandler;
// }
    function showAllUsers() {
        let UserListNode = document.getElementById("TaskDetails");
        Object.keys(UserCardList).forEach((itemId) => {
            const itemNode = document.createElement("div");
            const item = UserCardList[itemId];

            itemNode.setAttribute("id", item["UserId"]);
            itemNode.setAttribute("class", "Card");

            itemNode.innerHTML = `
        
                    <p class="Title_Card">${item["UserName"]}</p>
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
            document.getElementById("")
            document.getElementById("assign_d").value = UserCardList[currStat.parentNode.parentNode.id].UserName;

            document.getElementById("todo").checked = true;
            if(currStat.parentNode.className == "Doing heading_Cards")
            {
                document.getElementById("doing").checked = true;
            }
            else if(currStat.parentNode.className == "Done heading_Cards")
            {
                document.getElementById("done").checked = true;
            }

            taskClick = false;
            let submitBtn = document.getElementById('add_button');
            submitBtn.setAttribute("onclick",`submitUser("${true}")`);

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
                "UserName": UserCardList[uid].UserName,
                "id": tid,
                "TaskName": tname,
                "Status": stat,
                "Desc": "",
                "UserId": uid,
                "DueDate": dued,
            }

            // displayEventHandler(tid);
            taskClick = false;
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

    function submitUser(flag) {
        console.log(taskClick);
        if (taskClick) {
            alert("Already Submitted");
            return;
        }
        let uname = document.getElementById("assign_d").value;
        let tname = document.getElementById("title_d").value;
        let status;
        if (document.getElementById("todo").checked) {
            status = 0;
        }
        else if (document.getElementById("done").checked) {
            status = 2;
        }
        else if (document.getElementById("doing").checked) {
            status = 1;
        }

        let dued = document.getElementById("due_d").value;
        if (flag) {
            TaskList[taskId] = {
                "UserName": uname,
                "id": taskId,
                "TaskName": tname,
                "Status": status,
                "Desc": "",
                "UserId": uname.charAt(uname.length - 1),
                "DueDate": dued,
            }

            addTask(TaskList[taskId]);
            taskId++;
        }
        else {
            let id = document.getElementById("task_id").value;
            TaskList[id] = {
                "UserName": uname,
                "id": id,
                "TaskName": tname,
                "Status": status,
                "Desc": "",
                "UserId": uname.charAt(uname.length - 1),
                "DueDate": dued,
            }

            addTask(TaskList[id]);
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
        let TaskListNode = null;
        TaskListNode = CardSel.childNodes[2 * currStat + 3];
        console.log(item["UserName"]);
        // console.log(TaskListNode.className);

        itemNode.innerHTML = `<p onclick={onclickTask("${item["id"]}")} class = "Title_List" >${item["TaskName"]}
<img src="img/edit.png" class = "imgEdit"><img src="img/cancel.png" class = "imgDel"></p>`;

        TaskListNode.appendChild(itemNode);

        refreshEntries();
    }

    function onclickTask(id){

        console.log(id);
        let captured = event.target.className;
        if(captured == "imgDel")
        {
            deletionEventHandler(id);
        }

        else if(captured == "imgEdit")
        {
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

    function editEventHandler(id) {
        let item = TaskList[id];
        console.log(item);
        displayEventHandler(id);
        // deletionEventHandler(id);

        let cancelBtn = document.getElementById('del_button');
        cancelBtn.style.cssText = 'visibility:visible';
        cancelBtn.setAttribute("onclick",`onCancel()`);

        let submitBtn = document.getElementById('add_button');
        submitBtn.setAttribute("onclick",`onSubmit("${id}")`);

    }

    function onSubmit(id){
        deletionEventHandler(id);
        taskClick = false;
        submitUser(false);

        hideCancelButton();

        return false;
    }

    function onCancel(){
        refreshEntries();
        hideCancelButton();
    }

    function refreshEntries() {
        console.log("aaaaaa");
        document.getElementById("assign_d").value = "";
        document.getElementById("title_d").value = "";
        document.getElementById("due_d").value = "";
        document.getElementById("todo").checked = false;
        document.getElementById("doing").checked = false;
        document.getElementById("done").checked = false;
    }
// })()

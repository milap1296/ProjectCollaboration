(function () {

    const SUBBTN = document.getElementById("add_button");
    const TASKID = document.getElementById("task_id");
    const DUEDATE = document.getElementById("due_d");
    const ASSIGNEE = document.getElementById("assign_d");
    const TODO = document.getElementById("todo");
    const DOING = document.getElementById("doing");
    const DONE = document.getElementById("done");
    const TITLE = document.getElementById("title_d");
    const TASKS = localStorage.getItem('TaskList');
    const USERS = localStorage.getItem("UserList");
    const optionTemplate = function (user) {
        return `<option value="${user.id}">${user.Name}</option>`;
    }

    let model = {
        taskClick: false,
        delVar: 0,
        selectedId: 0,
        editId: 0,
        TaskList: {},
        UserCardList: {},
    };

    let octopus = {

        init: function () {
            // model.init();
            view.init();

            document.getElementById("form").addEventListener("submit", function () {
                octopus.submitTask();
                // return false;
            }, true);

            if (!localStorage.taskId) {
                localStorage.taskId = 101;
            }

            let selection = document.getElementById("assign_d");
            let optionsHTML = '';

            for (itemId in model.UserCardList) {
                optionsHTML += optionTemplate(model.UserCardList[itemId]);
            }

            selection.innerHTML = optionsHTML;
        },

        deletionEventHandler: function (id) {
            console.log("deletion");
            console.log(id);
            let item = model.TaskList[id];
            // debugger;
            // console.log(event.target.parentNode.parentNode.id);
            // console.log(event.target.parentNode.parentNode.className);
            let uid = item['UserId'];
            let currStat = item['Status'];
            console.log(currStat);
            let CardSel = document.getElementById(uid);
            let TaskListNode = CardSel.childNodes[2 * currStat + 3];
            console.log(TaskListNode.className);
            console.log(document.getElementById(id));
            // delete model.TaskList[id];
            octopus.removeFromLocalStorage(id);
            TaskListNode.removeChild(document.getElementById(id));
        },

        onClickHeading: function () {
            let currStat = event.target;
            let className = currStat.className;
            if (className == "plus") {
                octopus.refreshEntries();
                ASSIGNEE.value = currStat.parentNode.parentNode.id;

                TODO.checked = true;
                if (currStat.parentNode.className == "Doing heading_Cards") {
                    DOING.checked = true;
                }
                else if (currStat.parentNode.className == "Done heading_Cards") {
                    DONE.checked = true;
                }

                model.taskClick = false;

                // console.log(UserCardList[currStat.parentNode.parentNode.id]);
            }
            else if (className == "Todo heading_Cards" || className == "Doing heading_Cards" || className == "Done heading_Cards") {

            }
            else {
                return;
            }
        },

        submitTask: function () {
            console.log("submitTask");
            console.log(model.taskClick);
            if (model.taskClick) {
                alert("Already Submitted");
                return;
            }
            debugger;
            let uid = ASSIGNEE.value;
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
            model.TaskList[localStorage.taskId] = {
                "UserName": model.UserCardList[uid].Name,
                "id": localStorage.taskId,
                "TaskName": tname,
                "Status": status,
                "Desc": "",
                "UserId": uid,
                "DueDate": dued,
            }
            octopus.addToLocalStorage(localStorage.taskId, model.TaskList[localStorage.taskId]);
            octopus.addTask(model.TaskList[localStorage.taskId]);
            // localStorage.taskId++;
            localStorage.taskId++;
            event.preventDefault();
            // return false;
        },

        drop: function () {
            console.log("dr0p");
            let data = event.dataTransfer.getData("text");
            // console.log(event.target.id);
            let val = event.target.id;
            debugger;
            let uid = event.target.parentNode.id;
            let stat = 0;
            if (val == "Doing")
                stat = 1;
            else if (val == "Done")
                stat = 2;
            let tid = model.selectedId;
            let tname = model.TaskList[tid].TaskName;
            let dued = model.TaskList[tid].DueDate;
            if (model.UserCardList[uid] != undefined) {
                octopus.deletionEventHandler(tid);
                model.TaskList[tid] = {
                    "UserName": model.UserCardList[uid].Name,
                    "id": tid,
                    "TaskName": tname,
                    "Status": stat,
                    "Desc": "",
                    "UserId": uid,
                    "DueDate": dued,
                };

                // displayEventHandler(tid);
                model.taskClick = false;
                octopus.addToLocalStorage(tid, model.TaskList[tid]);
                octopus.addTask(model.TaskList[tid]);
            }
        },

        allowDrop: function () {
            event.preventDefault();
        },

        drag: function () {
            // debugger;
            let id = event.target.id;
            event.dataTransfer.setData("text", id);
            console.log("idhar to aa gaya");
            console.log(id);
            model.selectedId = id;
            // view.displayEventHandler(id);
        },

        addTask: function (item) {
            console.log("in Add Task function");
            const itemNode = document.createElement("p");
            itemNode.setAttribute("id", item["id"]);
            itemNode.setAttribute("class", "Title_List");
            itemNode.setAttribute("draggable", true);
            // itemNode.setAttribute("ondragstart", `octopus.drag()`);

            itemNode.ondragstart = octopus.drag;


            let uid = item["UserId"];
            let currStat = item["Status"];

            let CardSel = document.getElementById(uid);
            let TaskListNode = CardSel.childNodes[2 * currStat + 3];
            console.log(item["UserName"]);


            itemNode.innerHTML = `<p class = "Title_List">${item["TaskName"]}
<img src="img/edit.png" class = "imgEdit"><img src="img/cancel.png" class = "imgDel"></p>`;

            itemNode.getElementsByClassName("Title_List")[0].addEventListener("click", function () {
                view.onclickTask(item["id"]);
            }, true);

            TaskListNode.appendChild(itemNode);
            console.log(itemNode);

            octopus.refreshEntries();

        },

        editEventHandler: function (id) {
            let item = model.TaskList[id];
            console.log(item);
            view.displayEventHandler(id);
            // deletionEventHandler(id);

            let submitBtn = document.getElementById('add_button');
            submitBtn.style.cssText = 'display:none';

            let editBtn = document.getElementById('edit_button');
            editBtn.style.cssText = 'visibility:visible';
            // editBtn.setAttribute("onclick",`changeDetails(${id});return false;`);
            // debugger;
            model.editId = id;
            editBtn.removeEventListener("click", octopus.myFunction);
            editBtn.addEventListener("click", octopus.myFunction);

            let canBtn = document.getElementById('can_button');
            canBtn.style.cssText = 'visibility:visible';
            canBtn.onclick = octopus.refreshEntries;

        },

        myFunction: function () {
            octopus.changeDetails(model.editId);
        },

        changeDetails: function (id) {
            // debugger;
            console.log("changeDetails " + id);
            octopus.deletionEventHandler(id);

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
            ;
            let uid = ASSIGNEE.value;
            model.TaskList[id] = {
                "UserName": model.UserCardList[uid],
                "id": id,
                "TaskName": TITLE.value,
                "Status": status,
                "Desc": "",
                "UserId": uid,
                "DueDate": DUEDATE.value,
            };
            octopus.addToLocalStorage(id, model.TaskList[id]);
            octopus.addTask(model.TaskList[id]);
            octopus.refreshEntries();
            event.preventDefault();
        },

        refreshEntries: function () {
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
        },

        removeFromLocalStorage: function (id) {
            let retrievedList = JSON.parse(TASKS);
            delete retrievedList[id];
            localStorage.setItem('TaskList', JSON.stringify(retrievedList));
        },

        addToLocalStorage: function (id, item) {
            let retrievedList = JSON.parse(TASKS);
            retrievedList[id] = item;
            localStorage.setItem('TaskList', JSON.stringify(retrievedList));
        }
    };

    let view = {
        init: function () {
            this.onLoadFunction();
        },

        onLoadFunction: function () {

            let x = TASKS;
            if (USERS) {
                model.UserCardList = JSON.parse(USERS);
            }
            if (x != null) {
                model.TaskList = JSON.parse(TASKS);
                console.log("abc");
            }
            else {
                localStorage.setItem('TaskList', JSON.stringify(model.TaskList));
                console.log("xyz");
            }

            this.showAllUsers();
            this.showAllTasksList(model.TaskList);
        },

        displayEventHandler: function (id) {
            console.log("display");
            console.log(id);

            let taskName = model.TaskList[id].TaskName;
            let currStatus = model.TaskList[id].Status;
            debugger;
            let userName = model.UserCardList[model.TaskList[id].UserId].Name;
            let due = model.TaskList[id].DueDate;

            TASKID.value = id;
            TITLE.value = taskName;
            DUEDATE.value = due;
            ASSIGNEE.value = model.TaskList[id].UserId;

            if (model.TaskList[id].Status == 0) {
                TODO.checked = true;
            }
            else if (model.TaskList[id].Status == 2) {
                DONE.checked = true;
            }
            else {
                DOING.checked = true;
            }

            model.delVar = id;
            model.taskClick = true;
            // debugger;
            SUBBTN.style.cssText = "display:none";
        },

        showAllUsers: function () {
            let UserListNode = document.getElementById("TaskDetails");
            Object.keys(model.UserCardList).forEach((itemId) => {
                const itemNode = document.createElement("div");
                const item = model.UserCardList[itemId];

                itemNode.setAttribute("id", item["id"]);
                itemNode.setAttribute("class", "Card");

                // debugger;

                itemNode.innerHTML = `
        
                    <p class="Title_Card">${item["Name"]}</p>
                    <div class="Todo heading_Cards" id="Todo">Todo<img src="img/plus.png" class = "plus">
                    </div>
                    <div class="Doing heading_Cards" id="Doing">Doing<img src="img/plus.png" class = "plus">
                    </div>
                    <div class="Done heading_Cards" id="Done">Done<img src="img/plus.png" class = "plus">
                    </div>        
        `;

                let todoHead = itemNode.getElementsByClassName("Todo heading_Cards")[0];
                let doingHead = itemNode.getElementsByClassName("Doing heading_Cards")[0];
                let doneHead = itemNode.getElementsByClassName("Done heading_Cards")[0];

                todoHead.addEventListener("click", function () {
                    octopus.onClickHeading();
                }, true);
                todoHead.ondrop = octopus.drop;
                todoHead.ondragover = octopus.allowDrop;
                doingHead.addEventListener("click", function () {
                    octopus.onClickHeading();
                }, true);
                doingHead.ondrop = octopus.drop;
                doingHead.ondragover = octopus.allowDrop;
                doneHead.addEventListener("click", function () {
                    octopus.onClickHeading();
                }, true);
                doneHead.ondrop = octopus.drop;
                doneHead.ondragover = octopus.allowDrop;
                UserListNode.appendChild(itemNode);
            });
        },

        showAllTasksList: function (TaskList) {
            Object.keys(TaskList).forEach((itemId) => {
                octopus.addTask(TaskList[itemId]);
                console.log("inShowAll");
            });
        },

        onclickTask: function (id) {

            console.log(id + " andar aaya");
            let captured = event.target.className;
            if (captured == "imgDel") {
                octopus.deletionEventHandler(id);
                octopus.refreshEntries();
            }

            else if (captured == "imgEdit") {
                // debugger
                console.log(id + " in");
                octopus.editEventHandler(id);
                console.log(id + " out")
            }

            else if (captured == "Title_List") {
                octopus.refreshEntries();
                view.displayEventHandler(id);
            }

            else {
                return;
            }
        }
    };

    octopus.init();
})();



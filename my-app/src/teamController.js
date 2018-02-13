let NAME,AGE,ROLE;
let model = {
    UserList:{
        1: {
            "Name": "User1",
            "Role": 101,
            "age": "23",
            "id": "1",
            "img": "img/default_profile.png"
        },
    },
    ids:2,
    UserListNode:null,
    editId:0,
};

let octopus = {
    init: function() {
        if(localStorage.getItem("ids"))
        {
            model.ids = localStorage.getItem("ids");
        }
        else
        {
            localStorage.setItem("ids",model.ids);
        }

        let retrievedList = localStorage.getItem('userList');
        if(retrievedList != null){
            model.UserList = JSON.parse(retrievedList);
        }
        else
        {
            localStorage.setItem('userList',JSON.stringify(model.UserList));
        }


    },

    // getData: function () {
    //     let retrievedList = localStorage.getItem('UserList');
    //     if(retrievedList != null){
    //         model.UserList = JSON.parse(retrievedList);
    //         view.showUsersList(model.UserList);
    //     }
    //     else
    //     {
    //         localStorage.setItem('UserList',JSON.stringify(model.UserList));
    //     }
    //
    //     if(localStorage.getItem("ids"))
    //     {
    //         model.ids = localStorage.getItem("ids");
    //     }
    //     else
    //     {
    //         localStorage.setItem("ids",model.ids);
    //     }
    // },

    getUserList: function(){
        if(localStorage.getItem("userList") === null)
        {
            console.log("hey")
            let userList = {"2":{"Name":"milap","Role":"sde","img":"img/default_profile.png","age":"21","id":"2"}};
            octopus.setUserList(JSON.stringify(userList));
        }
        return JSON.parse(localStorage.getItem("userList"))
    },

    setUserList: function(userList){
        console.log("abc");
        localStorage.setItem("userList", userList);
    },

    deleteUser: function (id) {
        console.log(id + " in UserDelete");
        // delete UserList[id];
        octopus.removeFromLocalStorage(id);
        return octopus.getUserList();
        // model.UserListNode.removeChild(document.getElementById(id));
        // octopus.refreshEntries();
    },

    submitUser: function () {
        NAME = document.getElementById("name");
        ROLE = document.getElementById("role");
        AGE = document.getElementById("age");
        console.log("idhar bi aa");
        let name = NAME.value;
        let role = ROLE.value;
        let age = AGE.value;

        model.UserList[model.ids] = {
            "Name": name,
            "Role": role,
            "img": "img/default_profile.png",
            "age":age,
            "id":model.ids
        };

        //octopus.addUser(model.UserList[model.ids]);
        octopus.addToLocalStorage(model.ids,model.UserList[model.ids]);
        model.ids++;
        localStorage.setItem("ids",model.ids);
        octopus.refreshEntries();
        // event.preventDefault();
        return octopus.getUserList();
    },
/*
    addUser: function (item) {
        console.log("in add "+item);
        const itemNode = document.createElement("div");

        itemNode.setAttribute("id", item["id"]);
        itemNode.setAttribute("class", "container");

        itemNode.innerHTML = `
            <img src="${item["img"]}" alt="${item["Name"]}" class="image"/>
            <div class = "edit_del">
                <img src="img/edit.png" class = "img"/>
                <img src="img/cancel.png" class = "img"/>
            </div>
            <div class="middle">
                <p class="Details">Role: ${item["Role"]}</p>
                <p class="Details">Age: ${item["age"]}</p>
                <p class="Details">ID: ${item["id"]}</p>
            </div>
            <p class = "Name">${item["Name"]}</p>
    `;

        itemNode.getElementsByClassName("img")[0].addEventListener("click",function(){
            octopus.editUser(item["id"]);
            // return false;
        },true);

        itemNode.getElementsByClassName("img")[1].addEventListener("click",function(){
            octopus.deleteUser(item["id"]);
            // return false;
        },true);
        model.UserListNode.appendChild(itemNode);
    },
*/

    removeFromLocalStorage: function (id) {
        let retrievedList = JSON.parse(localStorage.getItem('userList'));
        delete retrievedList[id];
        localStorage.setItem('userList',JSON.stringify(retrievedList));
    },
    addToLocalStorage: function (id,item) {
        let retrievedList = JSON.parse(localStorage.getItem('userList'));
        retrievedList[id] = item;
        localStorage.setItem('userList',JSON.stringify(retrievedList));
    },
    refreshEntries:function () {

        NAME.value = "";
        ROLE.value = "";
        AGE.value = "";

        let submitBtn = document.getElementById('add_button');
        submitBtn.style.cssText = 'display:block';

        let editBtn = document.getElementById('edit_button');
        editBtn.style.cssText = 'visibility:hidden';

        let canBtn = document.getElementById('can_button');
        canBtn.style.cssText = 'visibility:hidden';

    },
/*


    editUser: function (id) {
        console.log(id);
        NAME.value = model.UserList[id].Name;
        ROLE.value = model.UserList[id].Role;
        AGE.value = model.UserList[id].age;

        let submitBtn = document.getElementById('add_button');
        submitBtn.style.cssText = 'display:none';

        let editBtn = document.getElementById('edit_button');
        editBtn.style.cssText = 'visibility:visible';

        model.editId = id;
        editBtn.removeEventListener("click",octopus.myFunction);
        editBtn.addEventListener("click",octopus.myFunction);

        let canBtn = document.getElementById('can_button');
        canBtn.style.cssText = 'visibility:visible';
        canBtn.onclick = octopus.refreshEntries;
    },
    myFunction: function(){
        octopus.changeDetails(model.editId);
    },
    changeDetails: function (id) {
        console.log(NAME.value);
        octopus.deleteUser(id);
        model.UserList[id] = {
            "Name": NAME.value,
            "Role": ROLE.value,
            "img": "img/default_profile.png",
            "age": AGE.value,
            "id":id,
        };
        octopus.addToLocalStorage(id,model.UserList[id]);
        octopus.addUser(model.UserList[id]);

        octopus.refreshEntries();
        event.preventDefault();

    },



*/
};

export default octopus;
//ch
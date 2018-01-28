let ids=3;
let UserList = {
    1: {
        "Name": "ABC",
        "Role": "Developer",
        "img": "img/default_profile.png",
        "age":"age",
        "id":1
    },
    2: {
        "Name": "XYZ",
        "Role": "Senior Developer",
        "img": "img/default_profile.png",
        "age":"age",
        "id":2
    }
};
let UserListNode = null;
function onLoadFunction() {
    UserListNode = document.getElementById("UserDetails");
    showUsersList(UserList);
}

function showUsersList(UserList) {
    Object.keys(UserList).forEach((itemId) => {
        const itemNode = document.createElement("div");
    const item = UserList[itemId];
    console.log(UserList);
    // debugger;
    itemNode.setAttribute("id", item["id"]);
    itemNode.setAttribute("class", "container");

        itemNode.innerHTML = `
           <img src="${item["img"]}" alt="${item["Name"]}" class="image"/>
        <div class = "edit_del">
            <img src="img/edit.png" onclick={editUser("${item["id"]}")} class = "img"/>
            <img src="img/cancel.png" onclick={deleteUser("${item["id"]}")} class = "img"/>
        </div>
        <div class="middle">
            <p class="Details">Role: ${item["Role"]}</p>
            <p class="Details">Age: ${item["age"]}</p>
            <p class="Details">ID: ${item["id"]}</p>
        </div>
        <p class = "Name">${item["Name"]}</p>
`;
    UserListNode.appendChild(itemNode);
});
}

function editUser(id){
    console.log(id);
    document.getElementById("name").value = UserList[id].Name;
    document.getElementById("role").value = UserList[id].Role;
    document.getElementById("age").value = UserList[id].age;

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
    deleteUser(id);
    UserList[id] = {
        "Name": document.getElementById("name").value,
        "Role": document.getElementById("role").value,
        "img": "img/default_profile.png",
        "age": document.getElementById("age").value,
        "id":id,
    };
    addUser(UserList[id]);

    refreshEntries();
}

function deleteUser(id){
    console.log(id + " in UserDelete");
    delete UserList[id];
    UserListNode.removeChild(document.getElementById(id));
}

function submitUser() {
    console.log("idhar bi aa");
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let age = document.getElementById("age").value;

    UserList[ids] = {
        "Name": name,
        "Role": role,
        "img": "img/default_profile.png",
        "age":age,
        "id":ids
    };

    addUser(UserList[ids]);
    ids++;
    // showUsersList(UserList);
    refreshEntries();
}

function refreshEntries() {
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("age").value = "";

    let submitBtn = document.getElementById('add_button');
    submitBtn.style.cssText = 'display:block';

    let editBtn = document.getElementById('edit_button');
    editBtn.style.cssText = 'visibility:hidden';

    let canBtn = document.getElementById('can_button');
    canBtn.style.cssText = 'visibility:hidden';
}

function addUser(item) {
    console.log("in add "+item);
    const itemNode = document.createElement("div");

    itemNode.setAttribute("id", item["id"]);
    itemNode.setAttribute("class", "container");

    itemNode.innerHTML = `
           <img src="${item["img"]}" alt="${item["Name"]}" class="image"/>
        <div class = "edit_del">
            <img src="img/edit.png" onclick={editUser("${item["id"]}")} class = "img"/>
            <img src="img/cancel.png" onclick={deleteUser("${item["id"]}")} class = "img"/>
        </div>
        <div class="middle">
            <p class="Details">Role: ${item["Role"]}</p>
            <p class="Details">Age: ${item["age"]}</p>
            <p class="Details">ID: ${item["id"]}</p>
        </div>
        <p class = "Name">${item["Name"]}</p>
`;
    UserListNode.appendChild(itemNode);
}

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import octopus from './teamController.js';

function userTemplate(user,deleteUser,updateUser){
    return <UserCard user={user}  onDeleteClick={deleteUser} onEditClick={updateUser}  key={user.id}/>
}

class App extends Component {
    constructor(props){
        super(props);
        debugger;
        octopus.init();
    }
    render() {
      return (
          <div>
            <Header></Header>
            <NavBar></NavBar>
            <UserList></UserList>
          </div>
      );
    }
}

class Header extends Component{
    render(){
        return(
            <div className="Header">
                Collaboration
            </div>
    )
    }
}

class NavBar extends Component{
    render(){
        return(
        <div className="topnav">
            <a id="home" href="backup.html">Home</a>
            <a className="active" id="team" href="#">Team</a>
        </div>
        );
    }
}

class UserList extends Component{
    constructor(props)
    {
        super(props);
        this.state = {userList : octopus.getUserList()};
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }
    deleteUser(userId){
        let userList = octopus.deleteUser(userId);
        this.setState({userList:userList});
    }

    updateUser(userId){

    }

    submitUser(e){
        let userList = octopus.submitUser();
        this.setState({userList:userList});
        e.preventDefault();
    }

    render(){
        let component = [];
        Object.keys(this.state.userList).forEach((userId) => {
            let user = this.state.userList[userId]
            console.log(user)
            component.push(userTemplate(user,this.deleteUser,this.updateUser));
        })
        return (
            <div className="Wrapper" style={{height: '50%'}}>
                <div className="TaskDetails" id="UserDetails" style={{width: '90%'}}>
                    {component}
                </div>

                <Form onSubmitClick = {this.submitUser}></Form>

            </div>
        )
    }
}

class UserCard extends Component{



    render(){
        let item = this.props.user;
        console.log("sdkmfck "+this.props.onDeleteClick)
        return(
            <div className="container" id={item["id"]}>
                <img src={require('./default_profile.png')} alt={item["Name"]} className="image"/>
                <div className = "edit_del">
                    <img src={require('./edit.png')} onClick={() => this.props.onEditClick(item["id"])} className= "img"/>
                    <img src={require('./cancel.png')} onClick={() => this.props.onDeleteClick(item["id"])} className = "img"/>
                </div>
                <div className="middle">
                    <p className="Details">Role: {item["Role"]}</p>
                    <p className="Details">Age: {item["age"]}</p>
                    <p className="Details">ID: {item["id"]}</p>
                </div>
                <p className= "Name">{item["Name"]}</p>
            </div>
        );
    }
}

class Form extends Component{
    render(){
        return(
            <div className="AddUser">
                <p id = "addNewUser" style={{cursor:'pointer',display:'block',background:'#DEE0E1',textAlign:'center'}}>Add New User</p>
                <form id="form1" onSubmit={(e) => this.props.onSubmitClick(e)}>
                    Name:<br />
                    <input type="text" name="Name" id="name" required /><br />
                    Role:<br />
                    <input type="text" name="Role" id="role" required /><br />
                    Age:<br />
                    <input type="text" name="Age" id="age" required /><br /><br />
                    <div>
                        <input type="submit" className="sub_button" id="add_button"></input>
                        <button className="edit_button" id="edit_button">Edit</button>
                        <button className="can_button" id="can_button">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default App;

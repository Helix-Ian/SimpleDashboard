import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard'

class ShowUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  } 

  componentDidMount() {
    axios
      .get('http://localhost:8083/api/users')
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowUserList');
      })
  };


  render() {
    const users = this.state.users;
    const columns = [
      {text: "First Name", name: 'fName'},
      {text: "Middle Name", name: 'mName'},
      {text: "Last Name", name: 'lName'},
      {text: "Age", name: 'age'},
      {text: "Birth Date", name: 'birthDate'},
      {text: "Manager", name: 'manager'}
    ]
    
    return (
    <div>
      <div className="headerLink">
        <h2 className="listTitle">users List</h2>
            <Link to="/page-controller" className="addLink">
            + GO TO PAGE CONTROLLER
            ></Link>
      </div>
      <div>
        <UserDashboard columns={columns} users={users}/>
      </div>
    </div>
    );
  }
}

export default ShowUserList;
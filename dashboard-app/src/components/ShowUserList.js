import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import {UserDashboard} from './UserDashboard'

class ShowUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
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
    console.log("PrintUser: " + JSON.stringify(users));

    return (
    <div>
      <div className="headerLink">
        <h2 className="listTitle">users List</h2>
            <Link to="/create-user" className="addLink">
            + Add New User
            ></Link>
      </div>
    </div>
    );
  }
}

export default ShowUserList;
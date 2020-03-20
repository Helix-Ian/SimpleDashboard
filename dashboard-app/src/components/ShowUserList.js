import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
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
      {text: "Report Name", name: 'fName'},
      {text: "Company", name: 'mName'},
      {text: "Sector", name: 'lName'},
      {text: "Generated", name: 'age'},
      {text: "Relationship Manager", name: 'birthDate'},
      {text: "", name: 'manager'}
    ]
    
    return (
    <div>
      <div className="headerLink">
        <h2 className="listTitle">Report Dashboard</h2>
            
      </div>
      <div>
        <UserDashboard columns={columns} users={users}/>
      </div>
    </div>
    );
  }
}

export default ShowUserList;
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import UserDashboard from './UserDashboard'
import {PageContext} from '../App';

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
        <PageContext.Consumer>
          {ctx => <button onClick={() => ctx.switchPage("value")}>Switch to Page Controller</button>}
        </PageContext.Consumer>
      </div>
      <div>
        <UserDashboard columns={columns} users={users}/>
      </div>
    </div>
    );
  }
}

export default ShowUserList;
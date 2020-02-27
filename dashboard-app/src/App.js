import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateUser from './components/CreateUser';
import ShowUserList from './components/ShowUserList';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUserInfo from './components/UpdateUserInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ShowUserList} />
          <Route path='/create-user' component={CreateUser} />
          <Route path='/edit-user/:id' component={UpdateUserInfo} />
          <Route path='/show-user/:id' component={ShowUserDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
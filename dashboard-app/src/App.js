import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ShowUserList from './components/ShowUserList';
import PageController from './components/PageController';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUserInfo from './components/UpdateUserInfo';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ShowUserList} />
          <Route path='/page-controller' component={PageController} />
        </div>
      </Router>
    );
  }
}

export default App;
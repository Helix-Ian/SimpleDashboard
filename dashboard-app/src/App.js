import React, { Component } from 'react';
import './App.css';
import ShowUserList from './components/ShowUserList';
import PageController from './components/PageController';

export const PageContext = React.createContext({switchPage: () => {}});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageController: null
    };
    this.pageContext = {
      switchPage: (controller) => {
        this.setState({pageController: controller});
      }
    };
  }

  render() {
    return (
      <div>
        <PageContext.Provider value={this.pageContext}>
          {this.state.pageController != null ? (
            // potentially add info to pagecontroller here
            <PageController />
            ) : (
            <ShowUserList />
          )}
        </PageContext.Provider>
      </div>
    );
  }
}

export default App;
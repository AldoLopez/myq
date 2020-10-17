import React from 'react';
import './App.css';
import netlifyIdentity from 'netlify-identity-widget';
import { loginUser, logoutUser } from './identityActions';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { toggleLight } from './Toggles/Utils';
netlifyIdentity.init();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.setState({ user: JSON.parse(user) });
    } else {
      loginUser();
    }
    netlifyIdentity.on('login', (user) => this.setState({ user }, loginUser()));
    netlifyIdentity.on('logout', (user) =>
      this.setState({ user: null }, logoutUser())
    );
  }

  handleLogIn = () => {
    netlifyIdentity.open();
  };

  handleLogOut = () => {
    netlifyIdentity.logout();
  };

  render() {
    return (
      <div className='root'>
        <Router>
          <div>
            {this.state.user ? (
              <header className='App-header'>
                <Button
                  id='toggleLight'
                  label='Toggle Light'
                  color='primary'
                  onClick={toggleLight}
                ></Button>
                <Button variant='contained' onClick={this.handleLogOut}>
                  Logout
                </Button>
              </header>
            ) : (
              <header>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.handleLogIn}
                >
                  Login to Access
                </Button>
              </header>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

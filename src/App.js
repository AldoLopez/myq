import React from 'react';
import './App.css';
import netlifyIdentity from 'netlify-identity-widget';
import { loginUser, logoutUser } from './identityActions';
import auth from './hoc/AuthHOC';
import Garage from './Garage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
                <Link to='/garage' className='home' alt='garage'>
                  <Button variant='contained' color='primary'>
                    <span>Garage</span>
                  </Button>
                </Link>
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
            <section>
              <Route exact path='/garage' component={auth(Garage)} />
            </section>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

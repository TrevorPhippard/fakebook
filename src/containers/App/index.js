import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { withAuthentication } from '../Sessions';

// import Acct from "../../components/Acct";

import Profile from '../../containers/Profile';
import Login from '../../containers/Login';

import Cover from '../../components/Cover';
import Toolbar from '../../components/Toolbar';

import { fbTheme } from '../../ui/theme';
import { ThemeProvider } from 'styled-components';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={fbTheme}>
        <Router>
          <Fragment>
            <Login />
            <Toolbar />
            <Cover />
            <Profile />
          </Fragment>
        </Router>
      </ThemeProvider>
    );
  }
}

export default withAuthentication(App);

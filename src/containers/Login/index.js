import React from 'react';

import SignInPage from './SignIn';
import SignUpPage from './SignUp';

// make sure to import Router even though it doesn't get called here.
// not sure why its not getting it from the top level
// tried other more explict ways of using the router element, no luck

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthUserContext } from '../Sessions';
import Modal from '../Modal';

const Login = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <div></div>
      ) : (
        <Modal>
          <Route path={'/'} />
          <Route path={'/signup'} component={SignUpPage} />
          <Route path={'/signin'} component={SignInPage} />
          <Route path={'/signout'} component={SignInPage} />
        </Modal>
      )
    }
  </AuthUserContext.Consumer>
);

export default Login;

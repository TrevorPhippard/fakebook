import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../containers/Sessions';
import SignOutButton from '../../containers/Login/SignOut';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={'/signin'}>Sign In</Link>
    </li>
  </ul>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

export default Navigation;

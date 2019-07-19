import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import defaultFriend from './defaultFriend';
import Button from '../../components/Button';

const SignUpPage = () => (
  <Fragment>
    <h1>SignUp</h1>
    <SignUpForm />
    <hr />
    <SignInLink />
  </Fragment>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set(defaultFriend(authUser.user.uid, username, email));
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('./signout');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          error.message = `
                          An account with this E-Mail address already exists.
                          Try to login with this account instead. If you think the
                          account is already used from one of the social logins, try
                          to sign in with one of them. Afterward, associate your accounts
                          on your personal account page.
                        `;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <Button disabled={isInvalid}>Sign Up</Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={'/signup'}>Sign Up</Link>
  </p>
);
const SignInLink = () => (
  <p>
    Have an account? <Link to={'/signin'}>Sign In</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink, SignInLink };

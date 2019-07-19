import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
          this.props.onSetAuth(authUser ? authUser : null);
          this.props.onSetUser(authUser ? authUser.uid : null);
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
          this.props.onSetAuth(null);
          this.props.onSetUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return compose(
    withFirebase,
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = dispatch => ({
  onSetAuth: payload => dispatch({ type: 'AUTH_USER_SET', payload }),
  onSetUser: payload => dispatch({ type: 'USER_SET', payload }),
});

export default withAuthentication;

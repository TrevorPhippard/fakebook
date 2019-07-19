import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Navbar from '../../components/Navbar';
import Wall from '../../components/Wall';
import Info from '../../components/Info';
import Friends from '../../components/Friends';

import { withFirebase } from '../../containers/Firebase';

const defaultAcct = 'jBgyLa8UECY73aDdoX6T78FYxwn1';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: true,
      currUser: null,
    };

    this.users = this.props.firebase.users;
  }

  componentDidMount() {
    if (!this.props.profile) {
      this.setState({ loading: true });
    }
    this.onListenForusers();
  }

  componentDidUpdate() {
    this.onListenForusers();
  }

  onListenForusers = () => {
    var flag = this.props.uid !== this.state.currUser; // flag prevents looping
    if (flag) {
      this.users().on('value', snapshot => {
        let data = snapshot.val();

        this.setState({
          loading: false,
          currUser: this.props.uid,
        });
        this.props.onSetInfo(data[this.props.uid || defaultAcct]);
      });
    }
  };

  componentWillUnmount() {
    this.users().off();
  }

  render() {
    const { profile, onSetUser, authUser } = this.props;

    let loading = this.state ? this.state.loading : true;
    let noInfo = profile === undefined || profile === null;
    let editFlag = authUser === (profile ? profile.uid : null);

    return loading || noInfo ? (
      <h3>Loading...</h3>
    ) : (
      <div className="container">
        <Navbar profile={profile} />
        <main>
          <aside>
            <Info profile={profile} editable={editFlag} />
            <Friends profile={profile} changeStateUser={onSetUser} />
          </aside>
          <Wall msgs={profile.msg} changeStateUser={onSetUser} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  profile: state.pageState.profile,
  uid: state.pageState.uid,
});

const mapDispatchToProps = dispatch => ({
  onSetInfo: payload => dispatch({ type: 'USERINFO_SET', payload }),
  onSetUser: payload => dispatch({ type: 'USER_SET', payload }),
  onSetWall: payload => dispatch({ type: 'WALL_SET', payload }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Profile);

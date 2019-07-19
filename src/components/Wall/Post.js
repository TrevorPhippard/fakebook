import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../containers/Firebase';
import Wrapper from '../Wrapper';
import Button from '../Button';

const StyledWrapper = styled(Wrapper)`
  textarea {
    border: 0;
    border-radius: 0;
    resize: none;
    width: 100%;
    padding: 5px;
  }

  button {
    padding: 5px;
    color: #fff;
    border: 1px solid #3b5998;
  }
`;

const INITIAL_STATE = {
  msg: '',
  usr: '',
  error: null,
};

class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { msg } = this.state;
    const { profile, authUserData } = this.props;
    this.setState({ msg: '' });

    let postInfo = {
      createAt: 1,
      display_name: authUserData.info.name,
      id: authUserData.uid,
      pic: authUserData.info.pic,
      text: msg,
    };

    this.props.firebase.writeNewPost({
      id: profile.uid,
      post: postInfo,
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { msg, error } = this.state;
    return (
      <StyledWrapper>
        <form onSubmit={this.onSubmit}>
          <div className="post">
            <textarea
              name="msg"
              value={msg}
              onChange={this.onChange}
              type="text"
              placeholder="Write Comment...."
            />
          </div>
          <ul>
            <li>
              <Button>Post</Button>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-file-image"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-ellipsis-h"></i>
              </a>
            </li>
          </ul>

          {error && <p>{error.message}</p>}
        </form>
      </StyledWrapper>
    );
  }
}

const mapStateToProps = state => ({
  authUserData: state.sessionState.authUserData,
  authUser: state.sessionState.authUser,
  profile: state.pageState.profile || {},
  uid: state.pageState.uid || {},
});

const Post = compose(
  withFirebase,
  connect(mapStateToProps),
)(PostComponent);

export default Post;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../../containers/Firebase';

class Uploader extends Component {
  constructor(props) {
    super();
    this.state = {
      uploading: false,
      percent: 0,
      file: '',
    };
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    var userImage = this.props.firebase.getimg(
      'avatars/' + this.props.username + '.webp',
    );
    console.log(userImage);
  }

  handleFileSelect(e) {
    this.setState({ file: e.target.files[0] });
  }
  handleFileUpload() {
    this.setState({ uploading: true });
    this.props.firebase.storageRef
      .child(`avatars/${this.props.username}`)
      .put(this.state.file);
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <input type="file" onChange={this.handleFileSelect} />
          <button onClick={this.handleFileUpload}>Upload</button>
        </div>
        {this.state.uploading ? (
          <div>
            <div className="load-bar" />
            <span>Uploading: {this.state.percent}%</span>
          </div>
        ) : (
          ''
        )}
        <pre>
          <code>
            {this.state.error ? (
              <span className="error">{this.state.error}</span>
            ) : (
              ''
            )}
          </code>
        </pre>
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
  callAction: payload => dispatch({ type: 'ACTION', payload }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Uploader);

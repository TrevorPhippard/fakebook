import React, { Component } from 'react';
import Button from '../../components/Button';
import { withFirebase } from '../Firebase';
import Uploader from '../Upload';

const INITIAL_STATE = {
  job: '',
  school: '',
  course: '',
  location: '',
  error: null,
};

class EditableFields extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.profile = props.profile;
  }

  onSubmit = event => {
    const { job, school, course, location, error } = this.state;

    this.setState({ job, school, course, location, error });

    this.props.firebase.EditProfileData(this.profile.uid, {
      job,
      school,
      course,
      location,
    });

    this.props.cb();
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { job, school, course, location, error } = this.state;
    const username = this.profile.username;

    return (
      <form className="infoForm" onSubmit={this.onSubmit}>
        <li>
          <h4>Profile Picture</h4>
          <Uploader username={username} />
        </li>
        <li>
          <input
            name="job"
            value={job}
            onChange={this.onChange}
            type="text"
            placeholder="Job"
          />
        </li>
        <li>
          <input
            name="school"
            value={school}
            onChange={this.onChange}
            type="text"
            placeholder="School"
          />
        </li>
        <li>
          <input
            name="course"
            value={course}
            onChange={this.onChange}
            type="text"
            placeholder="Course"
          />
        </li>
        <li>
          <input
            name="location"
            value={location}
            onChange={this.onChange}
            type="text"
            placeholder="Location"
          />
        </li>
        <Button>Save Changes</Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(EditableFields);

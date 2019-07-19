import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Wrapper from '../Wrapper';
import EditInfo from '../../containers/EditInfo';

const StyledWrapper = styled(Wrapper)`
  .info {
    min-width: 350px;
    padding: 20px;
    font-size: 14px;
    line-height: 25px;
    background-color: #fff;
    margin-bottom: 10px;
    margin-top: 0;
  }

  .info h3 {
    margin-bottom: 10px;
  }

  .info li {
    list-style-type: none;
    display: block;
    padding-bottom: 15px;
  }

  .infoForm li {
    padding-bottom: 5px;
  }
  .info p {
    display: inline;
    font-weight: 100;
  }
`;

const JustInfo = props => {
  var info = props.profile.info;
  return (
    <Fragment>
      <li className="fa fa-briefcase">
        <p> {info ? info.job : ''}</p>
      </li>
      <li className="fa fa-university">
        <p> {info ? info.school : ''}</p>
      </li>
      <li className="fa fa-graduation-cap">
        <p> {info ? info.course : ''}</p>
      </li>
      <li className="fa fa-home">
        <p> {info ? info.location : ''}</p>
      </li>
    </Fragment>
  );
};

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };

    this.profile = this.profile;
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
    }));
  };

  render() {
    var mode = this.state.editMode;
    var profile = this.props.profile;
    var editable = this.props.editable;

    return (
      <StyledWrapper>
        <ul className="info">
          <h3>
            INFO
            {editable ? (
              <span
                className="fa fa-edit"
                onClick={() => this.onToggleEditMode()}
              ></span>
            ) : (
              <Fragment />
            )}
          </h3>
          {mode ? (
            <EditInfo profile={profile} cb={this.onToggleEditMode} />
          ) : (
            <JustInfo profile={profile} />
          )}
        </ul>
      </StyledWrapper>
    );
  }
}

export default Info;

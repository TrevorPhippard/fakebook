import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { themeHover } from '../../ui/theme';

const StyledWrapper = styled(Wrapper)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: auto;

  margin-top: -100px;
  margin-left: -150px;
  padding: 20px;
  border-radius: 5px;

  background: #fff;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  z-index: 20;

  display: ${props => {
      return props.show ? 'block' : 'none';
    }}
    .active {
    background-color: #f50;
  }

  button {
    border-radius: 5px;
    border: 0px solid #333;
    color: #fff;
    padding: 5px 10px;
    margin: 10px 0;

    &:hover {
      background-color: ${themeHover};
    }
  }

  hr {
    margin: 10px 0;
  }

  input {
    background-color: #f6f6f6;
    padding: 7px 16px;
    width: 85%;
    margin: 5px;
    border: 0px solid #333;
    border-radius: 5px 5px 5px 5px;
  }

  input:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
  }

  a,
  a:visited {
    text-decoration: none;
    color: #333366;
    font-weight: bold;
    display: block;
    margin: 10px 0;
  }
  a:hover,
  a:active {
    color: #558;
    text-decoration: none;
  }
  span {
    position: absolute;
    top: -5px;
    right: 10px;
  }
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      path: '/',
    };
  }

  checkPath() {
    if (
      this.props.location === undefined ||
      this.props.location.pathname === '/'
    ) {
      this.setState({
        show: false,
        path: this.props.location.pathname,
      });
    } else {
      this.setState({
        show: true,
        path: this.props.location.pathname,
      });
    }
  }

  componentDidMount() {
    if (this.state.path !== this.props.location.pathname) {
      this.checkPath();
    }
  }

  componentDidUpdate() {
    if (this.state.path !== this.props.location.pathname) {
      this.checkPath();
    }
  }

  render() {
    return (
      <StyledWrapper show={this.state.show}>
        <span>
          <Link to={'/'}>×</Link>
        </span>
        {this.props.children}
      </StyledWrapper>
    );
  }
}

export default withRouter(Modal);

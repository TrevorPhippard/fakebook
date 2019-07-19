import React, {  Fragment } from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation';
import {
  themedColor,
  themedColorSecondary,
  themeLogo,
} from '../../ui/theme';
import Wrapper from '../Wrapper';
import { AuthUserContext } from '../../containers/Sessions';

const StyledWrapper = styled(Wrapper)`
  background-color: ${themedColor};

  .logo {
    padding: 10px;
    height: 30px;
  }
  input {
    height: 30px;
    width: 300px;
    border-radius: 5px;
    padding-left: 10px;
    margin-right: 10px;
    border: none;
    background-color: ${themedColorSecondary};
    color: #fff;
  }

  ul li {
    display: inline-block;
    color: #fff;
  }

  ul li a,
  ul li button {
    color: #fff;
    padding: 10px;
    border: 0px solid #fff;
  }

  .logo {
    width: 30px;
    height: 30px;
    padding: 0px;
    margin: 10px;
    fill: #fff;
    background-color: #333;
    background: url(${themeLogo});
    background-size: contain;
  }
`;

const Toolbar = () => (
  <StyledWrapper>
    <div className="container">
      <ul>
        <li>
          <div className="logo"></div>
        </li>
        <li>
          <input placeholder="search" />
        </li>
        <li>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? (
                <h6>Hello: {authUser.username}</h6>
              ) : (
                <Fragment />
              )
            }
          </AuthUserContext.Consumer>
        </li>
        <li>
          <Navigation />
        </li>
      </ul>
    </div>
  </StyledWrapper>
);

export default Toolbar;

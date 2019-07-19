import React from 'react';
import styled from 'styled-components';
import Wrapper from '../Wrapper';

const StyledWrapper = styled(Wrapper)`
  position: relative;
  background-color: #fff;

  .main-nav {
    display: flex;
    justify-content: left;
    font-weight: bold;
    margin: 0;
    padding-left: 175px;
  }
  .main-nav li {
    list-style-type: none;
    padding: 10px;
    border-right: solid 1px #ddd;
  }

  .porfile_pic {
    position: absolute;
    top: -130px;
    width: 150px;
    height: 150px;
    background: url(${props =>
        props.styles ? props.styles.pic : ''})
      no-repeat;
    background-size: cover;
    background-position: center center;
    background-color: #000;
    border: solid 4px white;
    left: 20px;
    .names {
      color: white;
      transform: translateX(160px) translateY(60px);
      h2,
      h5 {
        margin: 0;
        padding: 0;
      }
      h2 {
        font-size: 32px;
      }
      h5 {
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    padding-top: 120px;

    .main-nav {
      padding-left: 0px;
      justify-content: center;
    }

    .porfile_pic {
      width: 160px;
      left: 50%;
      transform: translateX(-50%);

      & .names {
        transform: translateY(170px);
        left: 0%;
        text-align: center;
        white-space: nowrap;
        color: #555;
      }
    }
  }
`;

const Navbar = props => {
  let info = props.profile.info;
  return (
    <StyledWrapper styles={info}>
      <div className="porfile_pic">
        <div className="names">
          <h2 className="name">{info ? info.name : ''}</h2>
          <h5 className="title">{info ? info.job : ''}</h5>
        </div>
      </div>
      <ul className="main-nav">
        <li>Timeline</li>
        <li>About</li>
        <li>Photos</li>
        <li>Video</li>
        <li>More</li>
      </ul>
    </StyledWrapper>
  );
};

export default Navbar;

import React from 'react';
import styled from 'styled-components';
import { themeHover } from '../../ui/theme';
import ImgBox from '../ImgBox';
import Wrapper from '../Wrapper';

const StyledWrapper = styled(Wrapper)`
  .friendsList {
    min-width: 350px;
    width: 350px;
    padding: 20px;
    font-size: 14px;
    line-height: 25px;
    background-color: #fff;
  }
  .friendsList h3 {
    display: block;
    margin-bottom: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;

    &:before {
      font-family: 'Font Awesome 5 Free';
      padding-right: 10px;
    }
  }

  .friendsList li {
    list-style-type: none;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 10px;

    &: hover {
      color: ${themeHover};
    }
  }
  .friendsList p {
    display: inline;
    font-weight: 100;
  }

  .Imgbox {
    width: 100px;
    height: 100px;
  }
`;

const Friends = props => {
  let pal = props.profile.friends;

  return (
    <StyledWrapper>
      <ul className="friendsList">
        <h3 className="fa fa-user-friends">Friends</h3>
        {pal ? (
          Object.keys(pal).map(key => (
            <li key={key}>
              <div onClick={() => props.changeStateUser(key)}>
                <ImgBox pic={pal ? pal[key].profile_pic : ''} />
                <p> {pal ? pal[key].display_name : ''}</p>
              </div>
            </li>
          ))
        ) : (
          <p>no new Friends</p>
        )}
      </ul>
    </StyledWrapper>
  );
};

export default Friends;

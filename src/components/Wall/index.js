import React from 'react';
import styled from 'styled-components';

import Post from './Post';
import Comment from './Comment';
import Wrapper from '../Wrapper';

const StyledWrapper = styled(Wrapper)`
  background: #e9ebee;
  overflow: auto;

  & .wallCont {
    border-radius: 2px;
    border: 1px solid #dddfe2;
    padding: 0px;
    margin-bottom: 10px;
    overflow: hidden;
    background: #f6f7f9;
  }
  & ul li {
    list-style-type: none;
    display: inline-block;
    padding-left: 5px;
  }
`;

const Wall = props => {
  let { changeStateUser, msgs } = props;

  return (
    <StyledWrapper>
      <div className="wallCont">
        <Post />
      </div>
      {msgs ? (
        Object.keys(msgs).map(key => (
          <div key={key} className="wallCont">
            <Comment
              msg={msgs[key]}
              changeStateUser={changeStateUser}
            />
          </div>
        ))
      ) : (
        <p>no new messages</p>
      )}
    </StyledWrapper>
  );
};

export default Wall;

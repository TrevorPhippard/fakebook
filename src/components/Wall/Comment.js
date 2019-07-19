import React from 'react';
import styled from 'styled-components';
import { themeHover } from '../../ui/theme';
import ImgBox from '../ImgBox';
import Wrapper from '../Wrapper';

const StyledWrapper = styled(Wrapper)`
  background: #fff;

  .post-header {
    text-decoration: none;

    & span {
      padding-right: 10px;
    }

    & .Imgbox {
      width: 60px;
      height: 60px;
      display: inline-block;
    }
  }
  .post-content {
    padding: 10px 5px;
  }
  .post-footer {
    border-top: 1px solid #dddfe2;
    padding: 5px;
    margin: 0;
    & li {
      display: inline-block;
      padding-right: 15px;
      color: ${themeHover};
    }
  }
`;

const Comment = props => {
  let { pic, display_name, createdAt, text, id } = props.msg;
  let changeStateUser = props.changeStateUser;

  return (
    <StyledWrapper>
      <div className="post-header">
        <div onClick={() => changeStateUser(id)}>
          <span>
            <ImgBox pic={pic} />
          </span>
          <span className="name"> {display_name}</span>
          <span className="date" href="./">
            time: {createdAt}
          </span>
        </div>
      </div>
      <div className="post-content">{text}</div>
      <div>
        <ul className="post-footer ">
          <li>
            <a href="/" title="like">
              <i className="fa fa-thumbs-up"></i>
            </a>
          </li>
          <li>
            <a href="/" title="Leave a comment">
              <i className="fa fa-comment"></i>
            </a>
          </li>
          <li>
            <a
              href="/"
              title="Send this to friends or post it to your timeline"
            >
              <i className="fa fa-share"></i>
            </a>
          </li>
        </ul>
      </div>
    </StyledWrapper>
  );
};

export default Comment;

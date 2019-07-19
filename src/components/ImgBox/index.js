import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { themeHover } from '../../ui/theme';

const wrapper = props => (
  <div className={classnames(props.className) + ' Imgbox'}>
    {props.children}
  </div>
);

const ImgBox = styled(wrapper)`
  background: url(${props => (props.pic ? props.pic : '')}) no-repeat;
  background-size: cover;
  background-position: center top;
  box-sizing: border-box;

  &: hover {
    border: 1px solid ${themeHover};
  }
`;

export default ImgBox;

import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { themeHover, themedColor } from '../../ui/theme';

const wrapper = props => (
  <button
    className={classnames(props.className)}
    disabled={props.isInvalid}
    type="submit"
  >
    {props.children}
  </button>
);

const Button = styled(wrapper)`
  border-radius: 2px;
  border: 0px solid #333;
  color: #fff;
  padding: 5px 10px;
  margin: 10px 0;
  background-color: ${themedColor};

  &:hover {
    background-color: ${themeHover};
  }
`;

export default Button;

import React from 'react';
import classnames from 'classnames';
const Wrapper = props => (
  <div className={classnames(props.className)}>{props.children}</div>
);

export default Wrapper;

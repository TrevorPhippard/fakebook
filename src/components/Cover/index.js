import React from 'react';
import styled from 'styled-components';
import { themeBg } from '../../ui/theme';
import Wrapper from '../Wrapper';

const StyledWrapper = styled(Wrapper)`
  height: 230px;
  background-color: #333;
  background: url(${themeBg}) no-repeat;
  background-size: cover;
  background-position: 0 center;
`;
const Cover = props => <StyledWrapper />;

export default Cover;

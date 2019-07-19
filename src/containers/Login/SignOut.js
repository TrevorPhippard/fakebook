import React from 'react';
import { withFirebase } from '../Firebase';
import styled from 'styled-components';
import { themedColor } from '../../ui/theme';
import Wrapper from '../../components/Wrapper';

// import Button from '../../components/Button';

const StyledWrapper = styled(Wrapper)`
  button {
    background-color: ${themedColor};
  }
`;

const SignOutButton = ({ firebase }) => (
  <StyledWrapper>
    <button onClick={firebase.doSignOut}>Sign Out</button>
  </StyledWrapper>
);

export default withFirebase(SignOutButton);

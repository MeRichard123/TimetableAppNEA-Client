import React, { useEffect } from 'react';
import styled from 'styled-components';
import StyledPage from '../components/Layout/Page';
import { useAuthToken, useAuth } from '../Utils/store';
import API from '../Utils/API';

const StyledContainer = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  height: 85vh;
`;
const StyledTitle = styled.h1`
  font-size: 3rem;
`;

const SignOut = () => {
  const token = useAuthToken((state) => state.token);
  const setAuthed = useAuth((state) => state.setAuthed);
  useEffect(() => {
    API.LogOutUser(token);
    setAuthed(false);
  }, []);
  return (
    <StyledPage>
      <StyledContainer>
        <StyledTitle>
          Logged Out
        </StyledTitle>
      </StyledContainer>
    </StyledPage>
  );
};

export default SignOut;

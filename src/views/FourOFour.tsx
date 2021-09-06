import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledContainer = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
`;
const StyledHeading = styled.h1`
    font-size: 5.5rem;
`;
const StyledInfoText = styled.p`
    font-size: 1.1rem;
    margin: -40px 10px 0 10px;
`;
const Clock = styled.div`
   position: relative;
   background: ${(props) => props.theme.text};
   width: 30vh;
   height: 30vh;
   border-radius: 15vh;
   margin: 0 10px 10px 0;
`;

const Rotate = keyframes`
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
`;

const HourHand = styled.div`
   background: ${(props) => props.theme.background};
   width: 5px;
   height: 10vh;
   border-radius: 15vh;
   position: absolute;
   transform-origin: bottom center;
   left: 50%;
   top: 20%;
   transform: translate(-50%, -20%);
   animation: ${Rotate} 6s linear infinite;
`;

const FourOFour = () => (
  <StyledContainer>
    <Clock>
      <HourHand />
    </Clock>
    <div style={{ textAlign: 'center' }}>
      <StyledHeading>Oops...</StyledHeading>
      <StyledInfoText>
        Looks like the page you are trying to visit doesn&apos;t exists.
      </StyledInfoText>
    </div>
  </StyledContainer>
);

export default FourOFour;

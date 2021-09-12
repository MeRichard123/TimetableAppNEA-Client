import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LandingImage from '../Assets/landing.jpg';
import Button from '../components/Shared/Button';

const StyledMain = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    max-height: 100vh;
    width: 100%;
    @media screen and (max-width: 900px){
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
    }
`;
const StyledTitle = styled.h1`
 font-family: "Poppins", sans-serif;
 font-size: clamp(2.5rem, 3.6vw, 15rem);
 color: ${(props) => props.theme.text}; 
 @media screen and (max-width: 900px){
    margin-top: 5rem;
  }
`;
const StyledAccentSpan = styled.span`
    color: ${(props) => props.theme.accent};
`;

const StyledTitleSection = styled.section`
    margin: auto;
    text-align: center;
`;

const StyledImage = styled.img`
    width:100%;
    max-height: 100vh;
    object-fit: cover;
    /* Darken the image on dark mode */
    filter: ${(props) => (props.theme.background === '#242424' ? 'brightness(50%)' : '')};
    @media screen and (max-width: 900px){
        height: 30vh;
    }
`;

function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
  useEffect(() => {
    alert('Welcome to KsTabler. This site is still in Beta, so bugs are expected. Note that classes have only been added for Yr7 and Yr8, and teachers have only been added for Maths, English and IT');
  }, []);
  return (
    <StyledMain>
      <Helmet>
        <title>KSTabler</title>
      </Helmet>
      <StyledTitleSection>
        <StyledTitle>
          Managing KSCS Timetables
          <br />
          <StyledAccentSpan>with Ease</StyledAccentSpan>
        </StyledTitle>
      </StyledTitleSection>
      <StyledImage src={LandingImage} alt="" />
      {isMobile && <Link to="/timetable"><Button big>Get Started</Button></Link>}
    </StyledMain>

  );
}
export default Home;

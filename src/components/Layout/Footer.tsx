import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.footer`
    padding: 1.5rem;
    color: ${(props) => props.theme.text};
    display: flex;
    border-top: 3px solid ${(props) => props.theme.text};
    margin: 0 50px;
    justify-content: center;
    align-items: center;
    `;
const StyledLink = styled.a`
margin: 0 5px;
  &:focus{
    outline: 2px solid #515151;
    outline-offset: 1px;
  }
`;
const StyledWrapper = styled.div`
    background-color: ${(props) => props.theme.background};
`;
const StyledAuthor = styled.span`
  position: relative;
  display: inline-block;

    &:after{
    display: block;
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    transition: height 250ms ease-in-out;
    background: ${(props) => props.theme.text};
    bottom: 4px;
  }
  &:hover{
    &:after{
      height: 4px;
    }
  }
`;

const Footer = () => (
  <StyledWrapper>

    <StyledFooterContainer>
      <p>Built with ❤ by</p>
      <StyledLink href="https://richardcoric.netlify.com" target="_blank" rel="noreferrer">
        <StyledAuthor>Richard</StyledAuthor>
      </StyledLink>
    </StyledFooterContainer>

  </StyledWrapper>
);

export default Footer;

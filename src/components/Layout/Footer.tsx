import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    margin: 0 50px;
    color: ${(props) => props.theme.text};
    border-top: 3px solid ${(props) => props.theme.text};
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
    content: "";
    display: block;
    position: absolute;
    bottom: 4px;
    width: 100%;
    height: 1px;
    transition: height 250ms ease-in-out;
    background: ${(props) => props.theme.text};
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Shared/Button';
import { useAuth } from '../../Utils/store';

interface NavBarProps{
  readonly Authenticated: boolean;
}

const StyledNav = styled.nav<NavBarProps>`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    z-index: 999;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: ${(props) => props.theme.navColour};
    @media screen and (max-width: 700px){
      justify-content: ${(props) => (props.Authenticated ? 'center' : '')};
    }
`;
const StyledLogo = styled.span`
    margin-left: 10px;
    padding: 5px;
    font-family: 'Megrim', cursive;
    font-size: clamp(1.5rem, 1.5vw, 10rem);
    color: ${(props) => props.theme.text};
`;

interface LinkProps{
  location: boolean;
}

const StyledNavLink = styled.span<LinkProps>`
  margin: 0 15px;
  color: ${(props) => props.theme.text};
  text-decoration: ${(props) => (props.location ? 'underline' : '')};
`;

const NavBar = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const location = useLocation();

  return (
    <StyledNav Authenticated={isAuthenticated}>
      <StyledLogo><Link to="/">KSTabler</Link></StyledLogo>
      {!isAuthenticated ? (

        <Link to="/signin" tabIndex={-1}>
          <Button marginRight="30px">
            Sign In
          </Button>
        </Link>

      ) : (
        <div>
          <Link to="/timetable">
            <StyledNavLink location={location.pathname === '/timetable'}>
              Timetable
            </StyledNavLink>
          </Link>
          <Link to="/overview">
            <StyledNavLink location={location.pathname === '/overview'}>
              Overview
            </StyledNavLink>
          </Link>
          <Link to="/signout">
            <Button marginRight="30px">
              Sign Out
            </Button>
          </Link>

        </div>

      )}
    </StyledNav>
  );
};

export default NavBar;

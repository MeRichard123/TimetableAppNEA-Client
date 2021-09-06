import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButtonContainer = styled.div`
    position: fixed;
    bottom: 5px;
    right: 5px;
    z-index: 999;
`;

const StyledThemeToggleButton = styled.button`
    all: initial;
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50vh;
    background:${(props) => (props.theme === 'light' ? 'black' : 'white')};
    color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
    font-size: 2rem;
    transition: background 200ms ease-in-out, color 200ms ease-in-out;
    cursor: pointer;

    &:before{
        font-family: FontAwesome;
        font-weight: 900;
        content: '\f185';
        transition: opacity 200ms ease-in-out;
        position: absolute;
        opacity:  ${(props) => (props.theme === 'light' ? '0' : '1')};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &:after{
        font-family: FontAwesome;
        font-weight: 900;
        content: "\f186";
        transition: opacity 200ms ease-in-out;
        position: absolute;
        opacity:  ${(props) => (props.theme === 'dark' ? '0' : '1')};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &:focus{
    outline: 4px solid ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    outline-offset: 2px;
  }
`;

interface Props{
    setTheme: (theme: string) => void;
    theme: string;
}

const ThemeToggle: React.FC<Props> = ({ setTheme, theme }) => {
  const body = document.querySelector('body');

  return (
    <StyledButtonContainer>
      <StyledThemeToggleButton
        theme={theme}
        type="button"
        onClick={
          () => {
            if (theme === 'dark') { body?.classList.remove('dark'); } else {
              body?.classList.add('dark');
            }
            return (theme === 'dark' ? setTheme('light') : setTheme('dark'));
          }
        }
      />

    </StyledButtonContainer>

  );
};

export default ThemeToggle;

ThemeToggle.propTypes = {
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

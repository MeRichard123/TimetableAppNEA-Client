import styled from 'styled-components';
import React from 'react';

const Btn = styled.button`
  all: initial;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.1rem;
  border-radius: 0.375rem;
  border-color: rgba(209, 213, 219, 1);
  color: white;
  background: ${(props) => props.theme.accent};
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size:0.875rem;
  line-height: 1.25rem;
  user-select: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: 4px solid #344db1;
    outline-offset: 2px;
  }
  @media screen and (min-width: 3000px){
    padding: 1.2rem 2.4rem;
    font-size: 2rem;
  }
`;

const ExportBtn = styled(Btn)`
position:relative;
pointer-events: ${(props) => (props.theme.background === '#242424' ? 'none' : 'pointer')};
opacity: ${(props) => (props.theme.background === '#242424' ? 0.5 : 1)};
&::after {
    content: '';
    inset: 0;
    background: transparent;
    position: absolute;
}
  &::before{
        content: "Can't Export in Dark Mode";
        position: absolute;
        display: ${(props) => (props.theme.background === '#242424' ? 'block' : 'none')};
        /* tooltip css */
        background: #fff;
        color: #000;
        padding: 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-family: "Poppins", sans-serif;
        text-align: center;
        z-index: 1;
        top: -1.5rem;
        left: -1.5rem;
        width: calc(100% + 3rem);
        height: calc(100% + 1.5rem);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        pointer-events: none;

      }
  
`;

const BigBtn = styled.button`
  all: initial;
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.8rem;
  border-radius: 0.375rem;
  background: ${(props) => props.theme.accent};
  color: white;
  border-color: rgba(209, 213, 219, 1);
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  line-height: 1.25rem;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-offset-shadow: inset 0 0 0 2px var(--tw-ring-offset-color);
    --tw-ring-shadow: inset 0 0 0 calc(2px + 2px) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;
type Props = {
  children: React.ReactNode
  big?: boolean;
  exportButton?: boolean;
  key?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  marginRight?: any;
  onClick?: () => void;
  width?: string;
}

const Button: React.FC<Props> = ({
  children, big, marginRight, type, width, onClick, exportButton,
}) => {
  if (big) {
    return (
      <BigBtn type={type} style={{ width: `${width}` }}>
        { children }
      </BigBtn>
    );
  }
  if (exportButton) {
    return (
      <ExportBtn type={type} style={{ width: `${width}` }} onClick={onClick}>
        {children}
      </ExportBtn>
    );
  }
  return <Btn type={type} style={{ marginRight, width: `${width}` }} onClick={onClick}>{children}</Btn>;
};

export default Button;

Button.defaultProps = {
  big: false,
  type: 'button',
  marginRight: '',
  width: '',
};

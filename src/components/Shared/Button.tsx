import styled from 'styled-components';
import React from 'react';

const Btn = styled.button`
  all: initial;
  display: inline-flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 0.5rem 1.1rem;
  font-family: "Poppins", sans-serif;
  border-radius: 0.375rem;
  user-select: none;
  color: white;
  background: ${(props) => props.theme.accent};
  cursor: pointer;
  border-color: rgba(209, 213, 219, 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size:0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: 4px solid #344db1;
    outline-offset: 2px;
  }
  @media screen and (min-width: 3000px){
    padding: 1.2rem 2.4rem;
    font-size: 2rem;
  }
`;
const BigBtn = styled.button`
  all: initial;
  display: inline-flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  padding: 0.8rem 1.8rem;
  border-radius: 0.375rem;
  user-select: none;
  color: white;
  background: ${(props) => props.theme.accent};
  cursor: pointer;
  border-color: rgba(209, 213, 219, 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 1.2rem;
  line-height: 1.25rem;
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
  key?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  marginRight?: any;
  width?: string;
}

const Button: React.FC<Props> = ({
  children, big, marginRight, type, width,
}) => {
  if (big) {
    return (
      <BigBtn type={type} style={{ width: `${width}` }}>
        { children }
      </BigBtn>
    );
  }
  return <Btn type={type} style={{ marginRight, width: `${width}` }}>{children}</Btn>;
};

export default Button;

Button.defaultProps = {
  big: false,
  type: 'button',
  marginRight: '',
  width: '',
};

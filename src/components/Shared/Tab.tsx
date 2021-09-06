import styled from 'styled-components';

import React from 'react';

interface ButtonProps{
    readonly active?: boolean;
}

const Btn = styled.button<ButtonProps>`
  all: initial;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  padding: 0.5rem 2.5rem;
  border-radius: 0.375rem;
  user-select: none;
  margin-right: 30px;
  font-family: "Poppins", sans-serif;
  margin-top: 15px;
  background: ${(props) => (props.active ? props.theme.accent : '')};
  color: ${(props) => (props.active ? 'white' : props.theme.accent)};
  border: 2px solid ${(props) => props.theme.accent};
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size:0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: 3.5px solid #344db1;
    outline-offset: 2px;
  }
  @media screen and (min-width: 3000px){
    padding: 1.2rem 2.4rem;
    font-size:2rem;
  }
`;

type Props = {
  children: React.ReactNode
    key?: any
    active?: boolean
    onClick: () => void
}

// eslint-disable-next-line react/prop-types
const Tab: React.FC<Props> = ({ children, active, ...rest }) => (
  <Btn active={active} {...rest}>{children}</Btn>
);

export default Tab;

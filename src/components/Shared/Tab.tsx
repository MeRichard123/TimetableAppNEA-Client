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
  margin-right: 30px;
  margin-top: 15px;
  border: 2px solid ${(props) => props.theme.accent};

  color: ${(props) => (props.active ? 'white' : props.theme.accent)};
  background: ${(props) => (props.active ? props.theme.accent : '')};
  font-family: "Poppins", sans-serif;
  line-height: 1.25rem;
  font-size:0.875rem;
  user-select: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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

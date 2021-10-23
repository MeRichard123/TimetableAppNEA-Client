import styled from 'styled-components';

export const StyledTableContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
    place-items: center;
    text-align: center;
    row-gap: 2.5rem;
    margin: 50px 5px 70px 5px;
    width: 100%;
`;
export const StyledLabel = styled.p`
    font-weight: bold;
`;

export const StyledUnitTwo = styled(StyledLabel)`
grid-row: 3/4; 
`;
export const StyledUnitForm = styled(StyledLabel)`
grid-row: 4/5; 
`;
export const StyledUnitThree = styled(StyledLabel)`
grid-row: 5/6; 
`;
export const StyledUnitFour = styled(StyledLabel)`
grid-row: 6/7; 
`;
export const StyledUnitFormTwo = styled(StyledLabel)`
grid-row: 7/8; 
`;
export const StyledUnitFive = styled(StyledLabel)`
grid-row: 8/9; 
`;

export const StyledMobileSelect = styled.select`
    all:initial;
    display: flex;
    align-items:center;
    width: 51px;
    height: 51px;
    border-radius: 15px;
    background: #556173;
    color: white;
    font-family: "Poppins", sans-serif;
    text-align-last: center;
    cursor: pointer;
    &:hover{
        background: #4d5561;
    }
    &:focus{
    outline: 3px solid #556173;
    outline-offset: 2px;
  
  }
`;
export const StyledSelectContainer = styled.div`
  position: relative;
  width: min-content;
  &:before{
    content: '\f078';
    position: absolute;
    top: 50%;
    right: 30px;
    font-family: FontAwesome;
    font-weight: 900;
    font-weight: 900;
    pointer-events: none;
    transform: translateY(-50%);
  }
`;
export const StyledSelect = styled.select`
  all: initial;
  padding: 0.5rem 3rem 0.5rem 2rem;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  font-family: "Poppins", sans-serif;
  &:focus{
    outline: 3px solid #515151;
    outline-offset: 2px;
  
  }
`;

interface OptionProps{
  readonly bold?: boolean;
}

export const StyledOption = styled.option<OptionProps>`
  padding: 0;
  margin: 0;
  font-weight: ${(props) => (props.bold ? 900 : 'initial')};
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-family: "Poppins", sans-serif;
  &:disabled{
    color: #777575;
  }
`;

export const StyledModalContainer = styled.div`
  margin: 10px;
  text-align: center;
`;

export const StyledInfoBox = styled.div`
  position: fixed;
  top: 50px;
  left: 15px;
  width: 200px;
  z-index: 9999;
  height: min-content;
  color: ${(props) => props.theme.background};
  background: ${(props) => props.theme.text};
`;

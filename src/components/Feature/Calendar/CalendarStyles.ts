import styled from 'styled-components';

export const StyledTableContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
    place-items: center;
    row-gap: 2.5rem;
    margin: 50px 5px 70px 5px;
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
    font-family: "Poppins", sans-serif;
    width: 51px;
    height: 51px;
    color: white;
    display: flex;
    align-items:center;
    text-align-last: center;
    border-radius: 15px;
    background: #556173;
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
  &:before{
        font-family: FontAwesome;
        font-weight: 900;
        font-weight: 900;
        content: '\f078';
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
  }
`;
export const StyledSelect = styled.select`
  all: initial;
  padding: 0.5rem 3rem 0.5rem 2rem;
  font-family: "Poppins", sans-serif;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  &:focus{
    outline: 3px solid #515151;
    outline-offset: 2px;
  
  }
`;

export const StyledOption = styled.option`
  font-family: "Poppins", sans-serif;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.background};
  margin: 0;
  padding: 0;
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

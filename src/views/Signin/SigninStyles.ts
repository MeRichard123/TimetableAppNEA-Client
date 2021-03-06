import styled from 'styled-components';

export const StyledError = styled.div`
  margin-bottom: 20px;
  text-align: center;
  color: #e74c3c;
`;
export const StyledFormContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70vh;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 27%;
  @media screen and (max-width: 1000px){
    width: 90%;
  }
`;
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;
export const StyledPasswordLabel = styled(StyledLabel)`
  position: relative;
`;
export const StyledInput = styled.input`
  all: initial;
  padding: 0.5rem 2.5rem;
  background: white;
  border: 2px solid #242424;
`;
export const StyledPShowPassBtn = styled.button`
  all: initial;
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
`;

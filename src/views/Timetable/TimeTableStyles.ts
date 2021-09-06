import styled from 'styled-components';

export const StyledTabGroup = styled.div`
  width: 100vw;
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  padding: 0 10px 10px 10px;
  overflow-y: visible;
  height: 100%;
  margin: 5px 0;
  @media screen and (min-width: 1010px){
    justify-content: center;
    overflow-x: hidden;
  }
`;
export const StyledTabContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  &::after{
    content: "";
    width: 80%;
    position: absolute;
    height: 2px;
    left: 50%;
    transform:translate(-50%, 15px);
    background: ${(props) => props.theme.text};
  }
`;

export const StyledErrorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
  color: white;
  border-radius: 25px;
  padding: 2rem 0;
  margin-top: 20px;
`;

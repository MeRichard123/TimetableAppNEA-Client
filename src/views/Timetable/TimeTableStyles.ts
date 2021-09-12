import styled from 'styled-components';

export const StyledTabGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100vw;
  height: 100%;
  padding: 0 10px 10px 10px;
  margin: 5px 0;
  overflow-y: visible;
  overflow-x: scroll;
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
    position: absolute;
    left: 50%;
    width: 80%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transform:translate(-50%, 15px);
  }
`;

export const StyledErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  margin-top: 20px;
  border-radius: 25px;
  background-color: #e74c3c;
  color: white;
`;

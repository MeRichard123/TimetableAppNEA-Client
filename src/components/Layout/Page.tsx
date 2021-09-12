import styled from 'styled-components';

const StyledPage = styled.main`
    padding-top: 70px;
    width: 100%;
    min-height: calc(100vh - 50px);
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    overflow: hidden;
    @media screen and (max-width: 900px){
      padding-top: 100px;
    }
`;
export default StyledPage;

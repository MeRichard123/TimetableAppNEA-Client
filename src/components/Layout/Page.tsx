import styled from 'styled-components';

const StyledPage = styled.main`
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    min-height: calc(100vh - 50px);
    width: 100%;
    overflow: hidden;
    padding-top: 70px;
        @media screen and (max-width: 900px){
      padding-top: 100px;
    }
`;
export default StyledPage;

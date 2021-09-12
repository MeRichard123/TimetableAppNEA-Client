import styled from 'styled-components';

interface ContainerProps {
    readonly disabled?: boolean;
}

export const StyledFormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    @media screen and (max-width:900px){
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export const StyledOverViewForm = styled.form`
    place-self: center;
    margin-top: 5rem;
    grid-column: 2/3;
    padding: 2.5rem;
    border-radius: 20px;
    background: ${(props) => props.theme.background};
    box-shadow:  20px 20px 60px ${(props) => props.theme.neumorphicShadowOne},
                -20px -20px 60px ${(props) => props.theme.neumorphicShadowTwo};
`;

export const StyledContainer = styled.form<ContainerProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    gap: 0.5rem;
    opacity: ${(props) => (props.disabled ? '50%' : '')};
    &:after{
        content: '';
        position:absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: ${(props) => (props.disabled ? '' : 'none')};
        opacity: ${(props) => (props.disabled ? '50%' : '')};
    }
`;

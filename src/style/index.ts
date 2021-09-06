import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html, body, *::after,*::before{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    font-family: "Poppins", sans-serif;
    }
    /* JqZSw light mode */
    /* EFeDO dark mode */
    body.dark .ReactModal__Content{
    background: #242424 !important;
    color: white !important;
    }
    body.dark .ReactModal__Content .close-btn{
    background: #808080;
    border-radius: 50%;
    margin:auto;
    }

    a{
    text-decoration: none;
    color: currentcolor;
    }

    .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    background: none;
    border: 0;
    transition: transform 250ms ease;
    }
    .close-btn:hover{
    transform: scale(1.2)
    }

    .tabs ::-webkit-scrollbar{
    height: 9px;
    }

    .tabs ::-webkit-scrollbar-track {
    background: #eeeeee;
    border-radius: 100vw;
    background-clip: content-box; 
    }


    .tabs ::-webkit-scrollbar-thumb {
    background: #515151;
    border-radius: 100vw;
    height: 10px;
    }

`;

export default GlobalStyles;

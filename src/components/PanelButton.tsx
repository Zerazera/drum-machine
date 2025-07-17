import styled from "@emotion/styled"

export const PanelButton = styled.button<{$isActive: boolean}>`
    color: ${({$isActive}) => $isActive ? 'white' : 'grey'};
    background-color: black;
    border: none;
    font-size: 4rem;
    cursor: pointer;

    &:active {
        color: white;
    }

    &:disabled {
        cursor: not-allowed;
        color: grey;
    }

    @media screen and ((width < 1360px) or (height < 544px)) {
        font-size: 2.5rem;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        font-size: 1.5rem;
    }
`
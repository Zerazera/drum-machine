import styled from "@emotion/styled"

export const PanelButton = styled.button<{$isActive: boolean}>`
    color: ${({$isActive}) => $isActive ? 'white' : 'grey'};
    background-color: black;
    border: none;
    font-size: calc(2.3 * (1vw + 1vh));
    cursor: pointer;

    &:active {
        color: white;
    }

    &:disabled {
        cursor: not-allowed;
        color: grey;
    }
`
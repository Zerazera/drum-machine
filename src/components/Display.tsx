import styled from "@emotion/styled"

const StyledDisplay = styled.div`
    width: 100%;
    aspect-ratio: 3.5 / 1;
    background-color: grey;
    grid-area: d;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (width < 400px) {
        width: 85%;
    }
`

const InnerDisplay = styled.div<{$poweredOn: boolean}>`
    width: 90%;
    height: 90%;
    border: 1px solid black;
    background-color: ${({$poweredOn}) => $poweredOn ? 'lightblue' : 'lightgrey'};
    padding: 2%;

    @media screen and (width < 1100px) {
        padding-bottom: 7vh;
    }

`

const DisplayValue = styled.div`
    font-family: Orbitron, sans-serif;
    font-size: calc(1vw + 1vh);
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    height: calc(1vw + 1vh);
`

const DisplayLabel = styled.div`
    border-bottom: 1px solid black;
    display: flex;
    justify-content: flex-end;
    font-size: calc(0.7 * (1vw + 1vh));
    font-weight: bold;
    color: black;

    @media screen and (width < 1100px) {
        margin-bottom: 1vh;
    }
`

export default function Display({isPoweredOn, volume, lastDrumButtonName}: {isPoweredOn: boolean, volume: number, lastDrumButtonName: string}) {
    return (
        <StyledDisplay>
            <InnerDisplay $poweredOn={isPoweredOn}>
                <DisplayValue id="display">{isPoweredOn ? lastDrumButtonName : ""}</DisplayValue>
                <DisplayLabel>Last played</DisplayLabel>
                <DisplayValue>{isPoweredOn ? (volume === 0 ? "Mute" : volume === 1 ? "Max" : `${(volume * 100).toFixed(0)}%`) : ""}</DisplayValue>
                <DisplayLabel>Volume</DisplayLabel>
            </InnerDisplay>
        </StyledDisplay>
    )
}
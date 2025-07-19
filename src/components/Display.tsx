import styled from "@emotion/styled"

const StyledDisplay = styled.div`
    aspect-ratio: 4 / 1;
    background-color: grey;
    grid-area: d;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and ((width < 680px) or (height < 272px)) {
        aspect-ratio: 10 / 3;
    }
`

const InnerDisplay = styled.div<{$poweredOn: boolean}>`
    width: 90%;
    height: 90%;
    border: 1px solid black;
    background-color: ${({$poweredOn}) => $poweredOn ? 'lightblue' : 'lightgrey'};
    padding: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const DisplayValue = styled.div`
    font-family: Orbitron, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    height: 22px;

    @media screen and ((width < 1360px) or (height < 544px)) {
        font-size: 1.1rem;
        height: 15px;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        font-size: 0.6rem;
        height: 8px;
    }
`

const DisplayLabel = styled.div`
    border-bottom: 1px solid black;
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    font-weight: bold;
    color: black;

    @media screen and ((width < 1360px) or (height < 544px)) {
        font-size: 0.6rem;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        font-size: 0.4rem;
    }
`

export default function Display({isPoweredOn, volume, lastDrumButtonName}: {isPoweredOn: boolean, volume: number, lastDrumButtonName: string}) {
    return (
        <StyledDisplay>
            <InnerDisplay $poweredOn={isPoweredOn}>
                <div>
                    <DisplayValue id="display">{isPoweredOn ? lastDrumButtonName : ""}</DisplayValue>
                    <DisplayLabel>Last played</DisplayLabel>
                </div>
                <div>
                    <DisplayValue>{isPoweredOn ? (volume === 0 ? "Mute" : volume === 1 ? "Max" : `${(volume * 100).toFixed(0)}%`) : ""}</DisplayValue>
                <DisplayLabel>Volume</DisplayLabel>
                </div>
            </InnerDisplay>
        </StyledDisplay>
    )
}
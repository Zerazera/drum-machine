import styled from "@emotion/styled"
import DrumButton from "./DrumButton"
import type { DrumButtonInfoType } from "../drumButtonInfo"

const StyledDrumButtons = styled.div`
    grid-area: b;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    row-gap: 5%;
    font-size: 1.2rem;
`

type DrumButtonsProps = {
    isPoweredOn: boolean, 
    volume: number, 
    drumButtonInfo: DrumButtonInfoType[],
    handleDrumButtonClick: (shortcutKey: string) => void,
    addKeyMapping: (key: string, fn: () => void) => void,
    removeKeyMapping: (key: string) => void,
}

export default function DrumButtons({isPoweredOn, volume, handleDrumButtonClick, addKeyMapping, removeKeyMapping, drumButtonInfo}: DrumButtonsProps) {
    return (
        <StyledDrumButtons>
            {drumButtonInfo.map(dbi => 
                <DrumButton 
                    key={dbi.shortcutKey} 
                    isPoweredOn={isPoweredOn} 
                    volume={volume} 
                    drumButtonInfo={dbi}
                    handleDrumButtonClick={handleDrumButtonClick}
                    addKeyMapping={addKeyMapping}
                    removeKeyMapping={removeKeyMapping}
                />
            )}
        </StyledDrumButtons>

    )
}
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import VolumeButton from "./VolumeButton"
import PowerButton from "./PowerButton"

const StyledPanelButtons = styled.div`
    grid-area: p;
    display: flex;
    justify-content: center;
    gap: 10%;
`

const VolumeBank = styled.div`
    border: 2px inset darkgrey;
    padding-inline: 1vw;

    display: flex;
    align-items: center;
    gap: 1vw;
    margin-bottom: 5%;
`

const PanelLabel = styled.div`
    display: flex;
    justify-content: center;
    font-size: calc(0.7 * (1vw + 1vh));
    font-weight: bold;
`

const PanelGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5%;
`

type PanelButtonsProps = {
    isPoweredOn: boolean,
    volume: number,
    toggleIsPoweredOn: () => void, 
    increaseVolume: () => void, 
    decreaseVolume: () => void,
    addKeyMapping: (key: string, fn: () => void) => void,
    removeKeyMapping: (key: string) => void,
    addRepeatableKeyMapping: (key: string, keydownFn: () => void, keyupFn: () => void) => void,
    removeRepeatableKeyMapping: (key: string) => void
}

export default function PanelButtons({isPoweredOn, volume, toggleIsPoweredOn, increaseVolume, decreaseVolume, addKeyMapping, removeKeyMapping, addRepeatableKeyMapping, removeRepeatableKeyMapping}: PanelButtonsProps) {
    return (
        <StyledPanelButtons>
            <PanelGroup>
                <PowerButton
                    isPoweredOn={isPoweredOn}
                    toggleIsPoweredOn={toggleIsPoweredOn}
                    addKeyMapping={addKeyMapping}
                    removeKeyMapping={removeKeyMapping}
                >
                    <FontAwesomeIcon icon={faPowerOff} />
                </PowerButton>
                <PanelLabel>Power</PanelLabel>
                <PanelLabel>Enter / Space</PanelLabel>
            </PanelGroup>
            <PanelGroup>
                <VolumeBank>
                    <VolumeButton 
                        volumeFn={decreaseVolume} 
                        shortcutKey="-" 
                        isDisabled={!isPoweredOn || volume === 0} 
                        addRepeatableKeyMapping={addRepeatableKeyMapping}
                        removeRepeatableKeyMapping={removeRepeatableKeyMapping}
                    >
                        <FontAwesomeIcon icon={faCaretDown} />
                    </VolumeButton>
                    <VolumeButton 
                        volumeFn={increaseVolume} 
                        shortcutKey="+" 
                        isDisabled={!isPoweredOn || volume === 100} 
                        addRepeatableKeyMapping={addRepeatableKeyMapping}
                        removeRepeatableKeyMapping={removeRepeatableKeyMapping}
                    >
                        <FontAwesomeIcon icon={faCaretUp} />
                    </VolumeButton>
                </VolumeBank>
                <PanelLabel>Volume</PanelLabel>
                <PanelLabel>- / +</PanelLabel>
                <PanelLabel>Press and Hold</PanelLabel>
            </PanelGroup>
        </StyledPanelButtons>
    )
}
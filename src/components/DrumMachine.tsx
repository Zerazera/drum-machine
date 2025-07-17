import { useState } from "react";
import styled from "@emotion/styled";
import DrumButtons from "./DrumButtons";
import Display from "./Display";
import PanelButtons from "./PanelButtons";
import { drumButtonInfo } from "../drumButtonInfo"
import { useKeymap } from "../hooks/useKeymap";
import { useRepeatableKeymap } from "../hooks/useRepeatableKeymap";

const Machine = styled.div`
    width: 1360px;
    aspect-ratio: 1 / 0.4;
    background-color: black;
    color: white;
    padding: 1%;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(2, 1fr);
    
    // b - buttons
    // d - display
    // p - panel buttons
    grid-template-areas: "b d"
                         "b p"
                         "b .";
    grid-gap: 5% 2%;

    @media screen and ((width < 1360px) or (height < 544px)) {
        width: 1020px;
    }

    @media screen and ((width < 1020px) or (height < 408px)) {
        width: 680px;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        width: 340px;
        aspect-ratio: 1 / 0.5;
    }
`

export default function DrumMachine() {
    const [isPoweredOn, setIsPoweredOn] = useState(true)
    const [volume, setVolume] = useState(.5)
    const [lastDrumButtonName, setLastDrumButtonName] = useState('--')
    const [drumButtons, setDrumButtons] = useState(drumButtonInfo)
    const {addKeyMapping, removeKeyMapping} = useKeymap()
    const {addRepeatableKeyMapping, removeRepeatableKeyMapping} = useRepeatableKeymap()

    const handleDrumButtonClick = (shortcutKey: string) => {
        setDrumButtons(prev => prev.map(drumButton => {
            if (drumButton.shortcutKey === shortcutKey) {
                setLastDrumButtonName(drumButton.name);                
                return {...drumButton, isPlaying: true}
            } else {
                return {...drumButton, isPlaying: false};
            }
        })
        )
    }

    const toggleIsPoweredOn = () => setIsPoweredOn(prev => !prev)
    const increaseVolume = () => {volume < 1 && setVolume(prev => +(prev + 0.01).toFixed(2))}
    const decreaseVolume = () => {volume > 0 && setVolume(prev => +(prev - 0.01).toFixed(2))}

    return (
        <Machine id="drum-machine">
            <DrumButtons 
                isPoweredOn={isPoweredOn} 
                volume={volume} 
                drumButtonInfo={drumButtons} 
                handleDrumButtonClick={handleDrumButtonClick}
                addKeyMapping={addKeyMapping}
                removeKeyMapping={removeKeyMapping}
            />
            <Display 
                isPoweredOn={isPoweredOn} 
                volume={volume} 
                lastDrumButtonName={lastDrumButtonName} 
            />
            <PanelButtons 
                isPoweredOn={isPoweredOn} 
                volume={volume} 
                toggleIsPoweredOn={toggleIsPoweredOn} 
                increaseVolume={increaseVolume} 
                decreaseVolume={decreaseVolume}
                addKeyMapping={addKeyMapping}
                removeKeyMapping={removeKeyMapping}
                addRepeatableKeyMapping={addRepeatableKeyMapping}
                removeRepeatableKeyMapping={removeRepeatableKeyMapping}
            />
        </Machine>
    )
}
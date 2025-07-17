import styled from "@emotion/styled"
import type { DrumButtonInfoType } from "../drumButtonInfo"
import { useRef, useEffect, useState } from "react"
import { getRandomColor } from "../getRandomColor"

const DrumButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
`

const StyledDrumButton = styled.button<{$isActive: boolean, $activeColor: string}>`
    --active-color: ${({$activeColor}) => $activeColor};
    --current-color: ${({$isActive}) => $isActive ? 'var(--active-color)' : 'white'};

    border-radius: 100px;
    width: 120px;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    font-size: 5rem;
    color: var(--current-color);
    border: 2px solid var(--current-color);
    font-weight: bold;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
        color: var(--active-color);
        border-color: var(--active-color);
    }

    &:disabled {
        cursor: not-allowed;
        color: grey;
        border-color: grey;
    }

    @media screen and ((width < 1360px) or (height < 544px)) {
        width: 90px;
        font-size: 3.5rem;
    }

    @media screen and ((width < 1020px) or (height < 408px)) {
        width: 60px;
        font-size: 2.3rem;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        width: 35px;
        font-size: 1.3rem;
    }
`

const DrumButtonText = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    font-size: 1.5rem;

    @media screen and ((width < 1360px) or (height < 544px)) {
        font-size: 1.3rem;
    }

    @media screen and ((width < 1020px) or (height < 408px)) {
        font-size: 0.89rem;
    }

    @media screen and ((width < 680px) or (height < 272px)) {
        font-size: 0.4rem;
    }
`

type DrumButtonProps = {
    isPoweredOn: boolean, 
    volume: number, 
    drumButtonInfo: DrumButtonInfoType,
    handleDrumButtonClick: (shortcutKey: string) => void,
    addKeyMapping: (key: string, fn: () => void) => void,
    removeKeyMapping: (key: string) => void,
}

export default function DrumButton({isPoweredOn, volume, addKeyMapping, removeKeyMapping, handleDrumButtonClick, drumButtonInfo: {shortcutKey, name, soundSrc, isPlaying}}: DrumButtonProps) {
    const [isActive, setIsActive] = useState(false)
    const [activeColor, setActiveColor] = useState(() => getRandomColor())
    const drumButtonRef = useRef<HTMLButtonElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const handleKeyPress = () => {        
            setIsActive(true)
            
            if (drumButtonRef.current) {
                drumButtonRef.current.focus()
                drumButtonRef.current.blur()
                drumButtonRef.current.click()
            }

            setTimeout(() => setIsActive(false), 100)        
        }
    
        addKeyMapping(shortcutKey, handleKeyPress)
        return () => removeKeyMapping(shortcutKey)
    }, [])

    audioRef.current && (audioRef.current.volume = volume)

    const resetAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }

    const handleClick = () => {
        resetAudio()

        audioRef.current?.play()
        .finally(() => setActiveColor(getRandomColor()))
        
        handleDrumButtonClick(shortcutKey)
    }

    if (!isPlaying) resetAudio()

    return (
        <DrumButtonDiv>
            <StyledDrumButton 
                className="drum-pad" 
                id={name} 
                ref={drumButtonRef} 
                disabled={!isPoweredOn} 
                $isActive={isActive} 
                $activeColor={activeColor} 
                onClick={handleClick}
            >
                {shortcutKey}
                <audio className="clip" src={soundSrc} id={shortcutKey} ref={audioRef} />
            </StyledDrumButton>
            <DrumButtonText>{name}</DrumButtonText>
            
        </DrumButtonDiv>
    )
}
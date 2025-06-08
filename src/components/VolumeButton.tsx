import { useState, useEffect, useRef, type ReactNode } from 'react'
import { PanelButton } from "./PanelButton";

type VolumeButtonProps = {
    volumeFn: () => void,
    shortcutKey: string,
    isDisabled: boolean,
    addRepeatableKeyMapping: (key: string, keydownFn: () => void, keyupFn: () => void) => void,
    removeRepeatableKeyMapping: (key: string) => void,
    children: ReactNode
}

export default function VolumeButton({volumeFn, shortcutKey, isDisabled, addRepeatableKeyMapping, removeRepeatableKeyMapping, children}: VolumeButtonProps) {
    const [isActive, setIsActive] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const clickIntervalRef = useRef(0)
    const clickTimeoutRef = useRef(0)
    const keyboardIntervalRef = useRef(0)
    const keyboardTimeoutRef = useRef(0)
    const documentRef = useRef(document)

    const handleButtonDown = (intervalRef: React.RefObject<number>, timeoutRef: React.RefObject<number>, initialClick = false) => {
        setIsActive(true)
        if (initialClick) buttonRef.current?.click()

        timeoutRef.current = setTimeout(() => intervalRef.current = setInterval(() => buttonRef.current?.click(), 100), 500)
        documentRef.current.addEventListener('mouseup', handleButtonUpClick)
    }

    const handleButtonUp = (intervalRef: React.RefObject<number>, timeoutRef: React.RefObject<number>) => {
        setIsActive(false)
        clearTimeout(timeoutRef.current)
        clearInterval(intervalRef.current)
        documentRef.current.removeEventListener('mouseup', handleButtonUpClick)
    }

    const handleButtonUpClick = () => handleButtonUp(clickIntervalRef, clickTimeoutRef)    

    useEffect(() => {
        addRepeatableKeyMapping(shortcutKey, 
            () => handleButtonDown(keyboardIntervalRef, keyboardTimeoutRef, true), 
            () => handleButtonUp(keyboardIntervalRef, keyboardTimeoutRef))        

        return () => removeRepeatableKeyMapping(shortcutKey)
    }, [])

    return (
        <PanelButton 
            $isActive={isActive} 
            onClick={volumeFn}
            disabled={isDisabled}
            ref={buttonRef}
            onMouseDown={() => handleButtonDown(clickIntervalRef, clickTimeoutRef)}
        >
            {children}
        </PanelButton>
    )
}
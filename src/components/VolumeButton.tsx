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
    const [clickIsActive, setClickIsActive] = useState(false)
    const clickIntervalRef = useRef(0)
    const clickTimeoutRef = useRef(0)

    const [keyboardIsActive, setKeyboardIsActive] = useState(false)
    const keyboardIntervalRef = useRef(0)
    const keyboardTimeoutRef = useRef(0)
    
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const documentRef = useRef(document)

    const getHandleFns = (
            setActiveFn: React.Dispatch<React.SetStateAction<boolean>>, 
            intervalRef: React.RefObject<number>, 
            timeoutRef: React.RefObject<number>, 
            initialClick = false
    ) => {
        const handleButtonDown = () => {
            setActiveFn(true)
            if (initialClick) buttonRef.current?.click()
            
            timeoutRef.current = setTimeout(() => intervalRef.current = setInterval(() => buttonRef.current?.click(), 100), 500)
        }

        const handleButtonUp = () => {
            setActiveFn(false)
            clearTimeout(timeoutRef.current)
            clearInterval(intervalRef.current)
        }

        return {handleButtonDown, handleButtonUp}

    }

    const clickHandlers = getHandleFns(setClickIsActive, clickIntervalRef, clickTimeoutRef)
    const keyboardHandlers = getHandleFns(setKeyboardIsActive, keyboardIntervalRef, keyboardTimeoutRef, true)

    useEffect(() => {
        addRepeatableKeyMapping(shortcutKey, 
            keyboardHandlers.handleButtonDown, 
            keyboardHandlers.handleButtonUp
        )

        documentRef.current.addEventListener('mouseup', clickHandlers.handleButtonUp)

        return () => {
            removeRepeatableKeyMapping(shortcutKey)
            documentRef.current.removeEventListener('mouseup', clickHandlers.handleButtonUp)
        }
    }, [])

    return (
        <PanelButton 
            $isActive={keyboardIsActive || clickIsActive} 
            onClick={volumeFn}
            disabled={isDisabled}
            ref={buttonRef}
            onMouseDown={clickHandlers.handleButtonDown}
        >
            {children}
        </PanelButton>
    )
}
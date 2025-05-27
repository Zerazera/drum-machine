import { PanelButton } from "./PanelButton";
import { useRef, useEffect, type ReactNode } from "react";

type PowerButtonProps = {
    isPoweredOn: boolean,
    toggleIsPoweredOn: () => void, 
    addKeyMapping: (key: string, fn: () => void) => void,
    removeKeyMapping: (key: string) => void,
    children: ReactNode
}

export default function PowerButton({isPoweredOn, toggleIsPoweredOn, addKeyMapping, removeKeyMapping, children}: PowerButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
     
    useEffect(() => {
        addKeyMapping('ENTER', () => buttonRef.current?.click())
        addKeyMapping(' ', () => buttonRef.current?.click())
        
        return () => {
            removeKeyMapping('ENTER')
            removeKeyMapping(' ')
        }
    }, [])

    return (
        <PanelButton $isActive={isPoweredOn} onClick={toggleIsPoweredOn} ref={buttonRef}>
            {children}
        </PanelButton>
    )
}
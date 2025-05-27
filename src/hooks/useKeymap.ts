import { useEffect, useRef } from "react";

/**
 *  Creates a keymap to handle keypress events and returns two functions. This keymap converts all given keys and keypresses to uppercase.
 *  addKeyMapping: Takes in a key and its mapped function and adds it to the keymap.
 *  removeKeyMapping: Removes a key from the keymap.
 */
export function useKeymap() {
    const documentRef = useRef(document)
    const keyMap = useRef<{[key: string]: () => void} | Record<PropertyKey, never>>({})
    
    const addKeyMapping = (key: string, fn: () => void) => {keyMap.current[key.toUpperCase()] = fn}
    const removeKeyMapping = (key: string) => {delete keyMap.current[key.toUpperCase()]}

    useEffect(() => {
        const handleKeypress = (event: KeyboardEvent) => {(event.key.toUpperCase() in keyMap.current) && keyMap.current[event.key.toUpperCase()]()}
        
        documentRef.current.addEventListener('keypress', handleKeypress)

        return () => documentRef.current.removeEventListener('keypress', handleKeypress)
    }, [])

    return {
        addKeyMapping,
        removeKeyMapping
    }
}
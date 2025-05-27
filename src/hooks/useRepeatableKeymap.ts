import { useEffect, useRef } from "react";

export function useRepeatableKeymap() {
    const documentRef = useRef(document)

    type RepeatableKeyMap = {
        'keydown': () => void,
        'keyup': () => void
    }
    const keyMapRepeatableKeys = useRef<{[key: string] : RepeatableKeyMap} | Record<PropertyKey, never>>({})

    const addRepeatableKeyMapping = (key: string, keydownFn: () => void, keyupFn: () => void) => {
        keyMapRepeatableKeys.current[key] = {
            'keydown': keydownFn,
            'keyup': keyupFn
        }
    }
    const removeRepeatableKeyMapping = (key: string) => {delete keyMapRepeatableKeys.current[key]}

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => (event.key.toUpperCase() in keyMapRepeatableKeys.current) && 
            keyMapRepeatableKeys.current[event.key.toUpperCase()].keydown()
        const handleKeyup = (event: KeyboardEvent) => (event.key.toUpperCase() in keyMapRepeatableKeys.current) && 
            keyMapRepeatableKeys.current[event.key.toUpperCase()].keyup()
        
        documentRef.current.addEventListener('keydown', handleKeydown)
        documentRef.current.addEventListener('keyup', handleKeyup)

        return () => {
            documentRef.current.removeEventListener('keydown', handleKeydown)
            documentRef.current.removeEventListener('keyup', handleKeyup)
        }

    }, [])

    return {
        addRepeatableKeyMapping,
        removeRepeatableKeyMapping
    }

}
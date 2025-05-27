import Heater1 from "./assets/sounds/Heater-1.mp3"
import Heater2 from "./assets/sounds/Heater-2.mp3"
import Heater3 from "./assets/sounds/Heater-3.mp3"
import Heater4 from "./assets/sounds/Heater-4_1.mp3"
import Clap from "./assets/sounds/Heater-6.mp3"
import OpenHighHat from "./assets/sounds/Dsc_Oh.mp3"
import KickNHat from "./assets/sounds/Kick_n_Hat.mp3"
import Kick from "./assets/sounds/RP4_KICK_1.mp3"
import ClosedHighHat from "./assets/sounds/Cev_H2.mp3"

export type DrumButtonInfoType = {
    shortcutKey: string, 
    name:string,
    soundSrc: string,
    isPlaying: boolean
}

export const drumButtonInfo: DrumButtonInfoType[] = [
    {
        shortcutKey: 'Q',
        name: 'Heater 1',
        soundSrc: Heater1,
        isPlaying: false
    },
    {
        shortcutKey: 'W',
        name: 'Heater 2',
        soundSrc: Heater2,
        isPlaying: false
    },
    {
        shortcutKey: 'E',
        name: 'Heater 3',
        soundSrc: Heater3,
        isPlaying: false
    },
    {
        shortcutKey: 'A',
        name: 'Heater 4',
        soundSrc: Heater4,
        isPlaying: false
    },
    {
        shortcutKey: 'S',
        name: 'Clap',
        soundSrc: Clap,
        isPlaying: false
    },
    {
        shortcutKey: 'D',
        name: 'Open High Hat',
        soundSrc: OpenHighHat,
        isPlaying: false
    },
    {
        shortcutKey: 'Z',
        name: 'Kick \'n Hat',
        soundSrc: KickNHat,
        isPlaying: false
    },
    {
        shortcutKey: 'X',
        name: 'Kick',
        soundSrc: Kick,
        isPlaying: false
    },
    {
        shortcutKey: 'C',
        name: 'Closed High Hat',
        soundSrc: ClosedHighHat,
        isPlaying: false
    }
]
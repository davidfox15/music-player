import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

export interface ITrack {
    title: string
    src: string
    img?: string
}

export const usePlayer = (tracks: ITrack[]) => {
    const [trackIndex, setTrackIndex] = useState(0)
    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [isPlay, setIsPlay] = useState<boolean>()
    const [duration, setDuration] = useState(0)
    const [time, setTimeState] = useState(0)

    const prevTrackIndex = useRef<number>()

    const nextTrack = useCallback(() => {
        setTrackIndex((cur) => (cur === tracks.length - 1 ? 0 : ++cur))
    }, [setTrackIndex, tracks.length])

    const prevTrack = useCallback(() => {
        setTrackIndex((cur) => (cur === 0 ? tracks.length - 1 : --cur))
    }, [setTrackIndex, tracks.length])

    const pause = () => {
        if (audio) audio.pause()
    }

    const play = () => {
        if (audio) audio.play()
    }

    const setVolume = (volume: number) => {
        if (audio) audio.volume = volume
    }

    const setTime = (time: number) => {
        if (audio) audio.currentTime = time
    }

    useLayoutEffect(() => {
        setAudio(tracks.length ? new Audio(tracks[0].src) : undefined)
    }, [tracks])

    useLayoutEffect(() => {
        if (audio) {
            const pause = () => {
                setIsPlay(false)
            }
            const play = () => {
                setIsPlay(true)
            }
            const loadeddata = () => {
                if (audio) setDuration(audio.duration)
            }
            const timeupdate = () => {
                if (audio) setTimeState(audio.currentTime)
            }

            audio.addEventListener('pause', pause)
            audio.addEventListener('play', play)
            audio.addEventListener('loadeddata', loadeddata)
            audio.addEventListener('timeupdate', timeupdate)
            audio.addEventListener('ended', nextTrack)

            return () => {
                audio.removeEventListener('pause', pause)
                audio.removeEventListener('play', play)
                audio.removeEventListener('loadeddata', loadeddata)
                audio.removeEventListener('timeupdate', timeupdate)
                audio.removeEventListener('ended', nextTrack)
                audio.removeEventListener('ended', nextTrack)
            }
        }
    }, [audio, setIsPlay, setDuration, setTimeState, nextTrack])

    useEffect(() => {
        if (
            audio &&
            // Мы не запускаем трек если пользователь не взаимодействовал со страницей
            isPlay !== undefined &&
            prevTrackIndex.current !== trackIndex
        ) {
            audio.pause()
            audio.src = tracks[trackIndex].src
            audio.play()
        }
    }, [audio, tracks, trackIndex, isPlay])

    useEffect(() => {
        prevTrackIndex.current = trackIndex
    }, [trackIndex])

    return {
        isPlay,
        pause,
        play,
        setVolume,
        duration,
        time,
        setTime,
        nextTrack,
        prevTrack,
        title: tracks[trackIndex].title,
        img: tracks[trackIndex].img,
    }
}

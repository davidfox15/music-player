'use client'

import { MusicPlayer } from '@/widgets/MusicPlayer'
import { useEffect, useState } from 'react'
import { getPlaylist } from '../actions'

export default function Player() {
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        getPlaylist().then((res) => {
            setTracks(res.map((track) => ({ ...track, src: track.audio })))
        })
    }, [])

    return (
        <MusicPlayer
            tracks={[
                {
                    title: 'Азамат Мусагалиев, Therr Maitz – Ничего не говори (LAB с Антоном Беляевым)',
                    src: 'song.mp3',
                    img: '/song.png',
                },
                {
                    title: 'Sweet Home Alabama 2018',
                    src: 'Sweet_Home_Alabama.mp3',
                    img: '/sweet home alabama.png',
                },
                {
                    title: 'Filatov & Karas, GAYAZOV$ BROTHER$ - Пошла жара',
                    src: 'Filatov_Karas_GAYAZOV_BROTHER_-_Poshla_zharamp3.mp3',
                },
                ...tracks,
            ]}
        />
    )
}

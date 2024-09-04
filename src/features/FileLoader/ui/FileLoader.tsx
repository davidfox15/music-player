'use client'

import React, { useRef } from 'react'

import styles from './FileLoader.module.css'
import { uploadAudio } from '@/app/actions'
import { v4 as uuidv4 } from 'uuid'

type LoadStatus = 'loading' | 'saved' | 'error' | null

export function FileLoader() {
    const [loadStatus, setLoadStatus] = React.useState<LoadStatus>(null)
    const formRef = useRef(null)

    const load = (event: any) => {
        event.preventDefault()
        if (!formRef.current) {
            return
        }

        const data = new FormData(formRef.current)

        uploadAudio(data).then((response) => {
            console.log(response)
            setLoadStatus(response.status === 'ok' ? 'saved' : 'error')
        })

        console.log(Object.fromEntries(data.entries()))
    }

    return (
        <div className={styles.container}>
            FileLoader
            <form ref={formRef} onSubmit={load}>
                <input name="audio" type="file" />
                <input name="title" type="text" />
                <input type="submit" value="Загрузить" />
            </form>
            {loadStatus !== null && <div>{loadStatus}</div>}
        </div>
    )
}

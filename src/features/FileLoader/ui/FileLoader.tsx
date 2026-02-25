'use client'

import { uploadAudio } from '@/app/actions'
import { FileDropZone } from '@/features/FileDropZone'
import { Button } from '@/shared/Button'
import classNames from 'classnames'
import React, { FormEvent, useRef } from 'react'

import styles from './FileLoader.module.css'

enum LoadStatusEnum {
    LOADING = 'loading',
    SAVED = 'saved',
    ERROR = 'error',
}

type LoadStatus = LoadStatusEnum | null

export function FileLoader() {
    const [loadStatus, setLoadStatus] = React.useState<LoadStatus>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const load = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formRef.current) {
            return
        }
        setLoadStatus(LoadStatusEnum.LOADING)

        const data = new FormData(formRef.current)

        uploadAudio(data).then((response) => {
            console.log(response)
            setLoadStatus(
                response.status === 'ok'
                    ? LoadStatusEnum.SAVED
                    : LoadStatusEnum.ERROR
            )
        })

        console.log(Object.fromEntries(data.entries()))
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>FileLoader</h1>
            <div className={styles.content}>
                <form ref={formRef} onSubmit={load}>
                    <FileDropZone
                        inputName="audio"
                        className={styles.dropZone}
                    />

                    <input name="title" type="text" className={styles.input} />

                    <Button
                        onClick={() => formRef.current?.submit}
                        className={styles.button}
                    >
                        Загрузить
                    </Button>

                    {loadStatus !== null && (
                        <div
                            className={classNames(styles.status, {
                                [styles.status__error]:
                                    loadStatus === LoadStatusEnum.ERROR,

                                [styles.status__saved]:
                                    loadStatus === LoadStatusEnum.SAVED,

                                [styles.status__loading]:
                                    loadStatus === LoadStatusEnum.LOADING,
                            })}
                        >
                            {loadStatus}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

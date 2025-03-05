import { type FC, useRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface IFileDropZoneProps {
    className?: string
    inputName: string
}

export function FileDropZone({ inputName, className }: IFileDropZoneProps) {
    const inputFileRef = useRef<HTMLInputElement>(null)

    const openFileLoader = (event) => {
        if (!inputFileRef.current) {
            return
        }
        inputFileRef.current.click()
    }

    return (
        <>
            <div
                className={classNames(styles.imgLoader, className)}
                onClick={openFileLoader}
            >
                Нажмите
                <br />
                или
                <br />
                перетащите файл
            </div>
            <input
                name={inputName}
                type="file"
                id="form-audio-img"
                ref={inputFileRef}
            />
        </>
    )
}

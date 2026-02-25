import classNames from 'classnames'
import { useRef } from 'react'

import styles from './styles.module.css'

interface IFileDropZoneProps {
    className?: string
    inputName: string
}

export function FileDropZone({ inputName, className }: IFileDropZoneProps) {
    const inputFileRef = useRef<HTMLInputElement>(null)

    const openFileLoader = () => {
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

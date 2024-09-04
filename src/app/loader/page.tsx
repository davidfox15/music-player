import React from 'react'

import styles from './loader.module.css'
import { FileLoader } from '@/features/FileLoader'

export default function LoaderPage() {
    return (
        <div className={styles.container}>
            <FileLoader />
        </div>
    )
}

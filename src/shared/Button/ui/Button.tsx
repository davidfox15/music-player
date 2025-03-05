import classNames from 'classnames'
import { MouseEventHandler } from 'react'

import styles from './styles.module.css'

interface IButton {
    onClick: MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
    className?: string
}

export default function Button({ onClick, className = '', children }: IButton) {
    return (
        <button
            className={classNames(styles.button, className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

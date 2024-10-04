import classNames from 'classnames'
import styles from './styles.module.css'
import { MouseEventHandler } from 'react'

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

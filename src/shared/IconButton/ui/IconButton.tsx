import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import styles from './IconButton.module.css'

interface IIconButton {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
    className?: string
}

export function IconButton({ onClick, className = '', children }: IIconButton) {
    return (
        <button
            className={classNames(styles['icon-button'], className)}
            onClick={onClick}
        >
            <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                {children}
            </div>
        </button>
    )
}

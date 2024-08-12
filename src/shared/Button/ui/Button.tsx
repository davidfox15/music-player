import classNames from 'classnames'
import styles from './styles.module.css'

interface IButton {
    onClick: () => void
    children: React.ReactNode
}

export default function Button({ onClick, children }: IButton) {
    return (
        <button className={classNames(styles.button)} onClick={onClick}>
            <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                {children}
            </div>
        </button>
    )
}

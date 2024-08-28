import styles from './app.module.css'
import bg from '../../public/background.png'
import Link from 'next/link'

export default function Home() {
    return (
        <main
            className={styles.main}
            style={{ backgroundImage: `url(${bg.src})` }}
        >
            <Link href="/player">Go to Player</Link>
        </main>
    )
}

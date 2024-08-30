import styles from './app.module.css'
import bg from '../../public/background.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
    return (
        <main
            className={styles.main}
            style={{ backgroundImage: `url(${bg.src})` }}
        >
            <Link href="/player">
                <Image src="play.svg" alt="play" width={150} height={150} />
            </Link>
        </main>
    )
}

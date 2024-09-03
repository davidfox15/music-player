import Link from 'next/link'
import Image from 'next/image'

import styles from './app.module.css'

export default function Home() {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/player" className={styles.blur}>
                <Image src="play.svg" alt="play" width={150} height={150} />
            </Link>
            <Link href="/loader" className={styles.blur}>
                <Image
                    src="add-circle.svg"
                    alt="loader"
                    width={150}
                    height={150}
                />
            </Link>
        </div>
    )
}

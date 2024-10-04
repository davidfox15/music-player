import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import bg from '../../public/background.png'

import styles from './app.module.css'
import HomeButton from '@/features/HomeButton/HomeButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Music Player',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <main
                    className={styles.main}
                    style={{ backgroundImage: `url(${bg.src})` }}
                >
                    <div className={styles['home-link-position']}>
                        <HomeButton />
                    </div>
                    {children}
                </main>
            </body>
        </html>
    )
}

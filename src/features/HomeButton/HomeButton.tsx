import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconButton } from '@/shared/IconButton'

export default function HomeButton() {
    return (
        <Link href="/">
            <IconButton>
                <Image src="home.svg" alt="arrow-back" fill={true} />
            </IconButton>
        </Link>
    )
}

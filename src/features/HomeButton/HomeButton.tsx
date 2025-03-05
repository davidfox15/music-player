import { IconButton } from '@/shared/IconButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeButton() {
    return (
        <Link href="/">
            <IconButton>
                <Image src="home.svg" alt="arrow-back" fill={true} />
            </IconButton>
        </Link>
    )
}

import React from 'react'

interface ITime {
    seconds: number
}

export default function Time({ seconds }: ITime) {
    return (
        <div>
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:
            {String(Math.floor(seconds % 60)).padStart(2, '0')}
        </div>
    )
}

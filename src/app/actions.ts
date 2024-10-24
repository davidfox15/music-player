'use server'
import { writeFile, readFile, existsSync, mkdirSync } from 'node:fs'
import { v4 as uuidv4 } from 'uuid'
import { printLog, printError } from './utils'

enum Status {
    ok = 'ok',
    error = 'error',
}

const readFilePromise: () => Promise<string> = () =>
    new Promise((resolve, reject) => {
        readFile('playlist.json', 'utf8', (error, data) => {
            if (error) {
                resolve('[]')
            }
            resolve(data)
        })
    })

export async function uploadAudio(formData: FormData) {
    'use server'
    const audioFile = formData.get('audio') as File

    try {
        if (audioFile.type !== 'audio/mpeg') {
            throw new Error('Audio file is not mp3 (audio/mpeg)')
        }
        const title = formData.get('title') as string
        // const image = formData.get('image') as File
        const buffer = await audioFile.arrayBuffer()
        const audioBuffer = Buffer.from(buffer)
        // Check is upload dir exist
        var uploadAudioDir = './public/uploadAudio'
        if (!existsSync(uploadAudioDir)) {
            mkdirSync(uploadAudioDir, { recursive: true })
        }
        // Save audio with uniq id
        const uniqId = uuidv4()
        writeFile(`${uploadAudioDir}/${uniqId}.mp3`, audioBuffer, (err) => {
            if (err) {
                printError('write audio error, ' + err)
                throw err
            }
            printLog(`Audio file has been saved! (${uniqId})`)
        })
        // Get already exist playlist
        const playlist = JSON.parse(await readFilePromise())
        // Update playlist with new upload audio
        playlist.push({
            audio: uniqId + '.mp3',
            title: title,
        })
        // Write updated playlist
        writeFile('playlist.json', JSON.stringify(playlist), 'utf8', (err) => {
            if (err) {
                printError('writeFile playlist.json, ' + err)
                throw err
            }
            printLog('Playlist has been updated!')
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            printError(error.message)
            return {
                status: Status.error,
                message: error?.message,
            }
        } else {
            printError('Unknown error: ' + error)
            return {
                status: Status.error,
                message: 'Unknown error',
            }
        }
    }

    return {
        status: Status.ok,
        message: 'File saved',
    }
}

export type Playlist = { audio: string; title: string }[]

export async function getPlaylist() {
    'use server'
    const playlist: Playlist = JSON.parse(await readFilePromise()) || []
    return playlist
}

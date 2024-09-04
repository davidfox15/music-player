'use server'
import { writeFile, readFile } from 'node:fs'
import { v4 as uuidv4 } from 'uuid'

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

        // TODO: create JSON file with list of songs
        const title = formData.get('title') as string
        // const image = formData.get('image') as File
        const uniqId = uuidv4()

        const buffer = await audioFile.arrayBuffer()
        const audioBuffer = Buffer.from(buffer)

        writeFile(`./public/${uniqId}.mp3`, audioBuffer, (err) => {
            if (err) throw err
            console.log(`Audio file ${uniqId} has been saved!`)
        })

        const playlist = JSON.parse(await readFilePromise())
        console.log('playlist', playlist)
        playlist.push({
            audio: uniqId + '.mp3',
            title: title,
        })
        writeFile('playlist.json', JSON.stringify(playlist), 'utf8', (err) => {
            if (err) throw err
            console.log('JSON file has been saved!')
        })
    } catch (error) {
        console.error(error)
        return {
            status: Status.error,
            message: error,
        }
    }

    return {
        status: Status.ok,
        message: 'File saved',
    }
}

export async function getPlaylist() {
    'use server'
    const playlist = JSON.parse(await readFilePromise()) || []
    return playlist
}

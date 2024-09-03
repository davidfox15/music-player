import { MusicPlayer } from '@/widgets/MusicPlayer'

export default function Player() {
    return (
        <MusicPlayer
            tracks={[
                {
                    title: 'Азамат Мусагалиев, Therr Maitz – Ничего не говори (LAB с Антоном Беляевым)',
                    src: 'song.mp3',
                    img: '/song.png',
                },
                {
                    title: 'Sweet Home Alabama 2018',
                    src: 'Sweet_Home_Alabama.mp3',
                    img: '/sweet home alabama.png',
                },
                {
                    title: 'Filatov & Karas, GAYAZOV$ BROTHER$ - Пошла жара',
                    src: 'Filatov_Karas_GAYAZOV_BROTHER_-_Poshla_zharamp3.mp3',
                },
            ]}
        />
    )
}

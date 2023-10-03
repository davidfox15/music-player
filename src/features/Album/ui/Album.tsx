import classNames from 'classnames'
import styles from './styles.module.css'
import Image from 'next/image'

interface IAlbum {
	isPlay: boolean
	image: string
	title: string
}

export default function Album({ isPlay, image, title }: IAlbum) {
	return (
		<div className={classNames(styles.album, { [styles.rotating]: isPlay })}>
			<Image src={image} alt={title} fill={true} />
		</div>
	)
}

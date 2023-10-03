import { ChangeEvent, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface IRange {
	className?: string
	value: number
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	min: number
	max: number
	step?: number
}

export default function Range({ className = '', value, min, max, step = 1, onChange }: IRange) {
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (ref.current !== null)
			ref.current.style.background = `linear-gradient(to right, #05ac6a 0%, #05ac6a ${
				(value / max) * 100
			}%, #bcbcbc ${(value / max) * 100}%, #bcbcbc 100%)`
	}, [value, ref, max])

	return (
		<input
			ref={ref}
			type="range"
			className={classNames(styles.range, className)}
			value={value}
			min={min}
			max={max}
			onChange={onChange}
			step={step}
		></input>
	)
}

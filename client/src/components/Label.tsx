import { ReactNode } from 'react'

type LabelProps = {
	labelFor: string
	children: ReactNode
}

export function Label({ labelFor, children }: LabelProps) {
	return (
		<label htmlFor={labelFor} className="text-sm font-bold text-slate-700">
			{children}
		</label>
	)
}

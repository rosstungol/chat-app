import { ReactNode } from 'react'

type FullScreenCardProps = {
	children: ReactNode
}

export function FullScreenCard({ children }: FullScreenCardProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50">
			<div className="w-full max-w-md">{children}</div>
		</div>
	)
}

FullScreenCard.Body = function ({ children }: FullScreenCardProps) {
	return <div className="m-4 rounded-lg bg-white p-8 shadow-md">{children}</div>
}

FullScreenCard.BelowCard = function ({ children }: FullScreenCardProps) {
	return <div className="mt-4 flex justify-center gap-2">{children}</div>
}

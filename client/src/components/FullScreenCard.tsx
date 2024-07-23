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
	return <div className="rounded-lg bg-white p-6 shadow">{children}</div>
}

FullScreenCard.BelowCard = function ({ children }: FullScreenCardProps) {
	return <div className="mt-3 flex justify-center gap-3">{children}</div>
}

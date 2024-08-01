import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant: 'primary' | 'secondary'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, ...rest }, ref) => {
		const buttonColors =
			variant === 'primary'
				? 'bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500'
				: variant === 'secondary'
					? 'border border-slate-300 hover:bg-slate-100 focus:bg-slate-200'
					: 'bg-white'

		return (
			<button
				className={`w-full rounded p-3 font-bold transition-colors disabled:bg-gray-400 ${buttonColors} ${className}`}
				{...rest}
				ref={ref}
			>
				{children}
			</button>
		)
	}
)

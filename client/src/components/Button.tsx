import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

export const Button = forwardRef<
	HTMLButtonElement,
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
	return (
		<button
			className={`w-full rounded bg-blue-600 p-2 font-bold text-white transition-colors hover:bg-blue-500 focus:bg-blue-500 disabled:bg-gray-400 ${className}`}
			{...rest}
			ref={ref}
		>
			{children}
		</button>
	)
})

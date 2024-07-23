import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

export const Input = forwardRef<
	HTMLInputElement,
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...rest }, ref) => {
	return (
		<input
			className={`w-full rounded border border-slate-400 px-2 py-1 outline-none transition-colors focus:border-blue-500 ${className}`}
			{...rest}
			ref={ref}
		/>
	)
})

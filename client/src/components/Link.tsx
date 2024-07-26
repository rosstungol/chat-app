import { LinkProps, Link as RouterLink } from 'react-router-dom'

export function Link({ children, className, ...rest }: LinkProps) {
	return (
		<RouterLink {...rest} className={`text-blue-500 ${className}`}>
			{children}
		</RouterLink>
	)
}

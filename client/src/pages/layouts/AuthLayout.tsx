import { Outlet, useLocation } from 'react-router-dom'
import { FullScreenCard } from '../../components/FullScreenCard'
import { Link } from '../../components/Link'

export function AuthLayout() {
	const location = useLocation()
	const isLoginPage = location.pathname === '/login'

	return (
		<FullScreenCard>
			<FullScreenCard.Body>
				<Outlet />
			</FullScreenCard.Body>
			<FullScreenCard.BelowCard>
				<span>
					{isLoginPage ? "Don't have an account?" : 'Already have an account?'}
				</span>
				<Link to={isLoginPage ? '/signup' : 'login'}>
					{isLoginPage ? 'Create account' : 'Log in'}
				</Link>
			</FullScreenCard.BelowCard>
		</FullScreenCard>
	)
}

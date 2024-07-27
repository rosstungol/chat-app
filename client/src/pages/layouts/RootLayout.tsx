import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/hooks'

export function RootLayout() {
	const { user } = useAuth()
	if (user == null) return <Navigate to="/login" />

	return <Outlet />
}

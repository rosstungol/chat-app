import { useContext } from 'react'
import { Context, AuthContext } from './AuthContext'

export function useAuth() {
	return useContext(Context) as AuthContext
}

export function useLoggedInAuth() {
	return useContext(Context) as AuthContext &
		Required<Pick<AuthContext, 'user'>>
}

import { useContext } from 'react'
import { Context, AuthContext } from '../context/AuthContext'

export function useLoggedInAuth() {
	return useContext(Context) as AuthContext &
		Required<Pick<AuthContext, 'user'>>
}

import { useContext } from 'react'
import { Context, AuthContext } from './AuthContext'

export function useAuth() {
	return useContext(Context) as AuthContext
}

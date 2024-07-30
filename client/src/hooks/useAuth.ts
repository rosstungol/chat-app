import { useContext } from 'react'
import { Context, AuthContext } from '../context/AuthContext'

export function useAuth() {
	return useContext(Context) as AuthContext
}

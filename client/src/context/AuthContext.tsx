import { useMutation, UseMutationResult } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { createContext, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export type AuthContext = {
	signup: UseMutationResult<AxiosResponse, unknown, User>
}

export const Context = createContext<AuthContext | null>(null)

type AuthProviderProps = {
	children: ReactNode
}

type User = {
	id: string
	name: string
	image?: string
}

export function AuthProvider({ children }: AuthProviderProps) {
	const signup = useMutation({
		mutationFn: (user: User) => {
			return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user)
		},
	})

	return <Context.Provider value={{ signup }}>{children}</Context.Provider>
}

export function ContextWrapper() {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	)
}

import { useMutation, UseMutationResult } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { StreamChat } from 'stream-chat'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type AuthContext = {
	user?: User
	streamChat?: StreamChat
	signup: UseMutationResult<AxiosResponse, unknown, User>
	login: UseMutationResult<{ token: string; user: User }, unknown, string>
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
	const navigate = useNavigate()
	const [user, setUser] = useLocalStorage<User>('user')
	const [token, setToken] = useLocalStorage<string>('token')
	const [streamChat, setStreamChat] = useState<StreamChat>()

	const signup = useMutation({
		mutationFn: (user: User) => {
			return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user)
		},
		onSuccess() {
			navigate('/login')
		},
	})

	const login = useMutation({
		mutationFn: async (id: string) => {
			const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
				id,
			})
			return res.data as { token: string; user: User }
		},
		onSuccess(data) {
			setUser(data.user)
			setToken(data.token)
		},
	})

	useEffect(() => {
		if (user == null || token == null) return
		const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY!)

		if (chat.tokenManager.token === token && chat.userID === user.id) return

		let isInterrupted = false
		const connectPromise = chat.connectUser(user, token).then(() => {
			if (isInterrupted) return
			setStreamChat(chat)
		})

		return () => {
			isInterrupted = true
			setStreamChat(undefined)

			connectPromise.then(() => chat.disconnectUser())
		}
	}, [user, token])

	return (
		<Context.Provider value={{ signup, login, user, streamChat }}>
			{children}
		</Context.Provider>
	)
}

export function ContextWrapper() {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	)
}

import { FormEvent, useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../context/hooks'
import { Navigate } from 'react-router-dom'

export function Login() {
	const { login, user } = useAuth()
	const usernameRef = useRef<HTMLInputElement>(null)

	if (user != null) return <Navigate to="/" />

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (login.isPending) return

		const username = usernameRef.current?.value
		if (username == null || username === '') {
			return
		}

		login.mutate(username)
	}

	return (
		<>
			<h1 className="mb-8 text-center text-3xl font-bold">Login</h1>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-[auto,1fr] items-center justify-items-end gap-x-3 gap-y-5"
			>
				<label htmlFor="username">Username</label>
				<Input id="username" required ref={usernameRef} />

				<Button
					disabled={login.isPending}
					type="submit"
					className="col-span-full"
				>
					{login.isPending ? 'Loading...' : 'Log In'}
				</Button>
			</form>
		</>
	)
}

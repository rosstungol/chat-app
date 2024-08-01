import { FormEvent, useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Label } from '../components/Label'

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
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<Label labelFor="username">Username</Label>
					<Input id="username" required ref={usernameRef} />
				</div>
				<Button disabled={login.isPending} type="submit">
					{login.isPending ? 'Loading...' : 'Log In'}
				</Button>
			</form>
		</>
	)
}

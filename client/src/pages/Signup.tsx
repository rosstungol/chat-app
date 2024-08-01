import { FormEvent, useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { Label } from '../components/Label'

export function Signup() {
	const { signup } = useAuth()
	const usernameRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const imageUrlRef = useRef<HTMLInputElement>(null)

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (signup.isPending) return

		const username = usernameRef.current?.value
		const name = nameRef.current?.value
		const imageUrl = imageUrlRef.current?.value
		if (username == null || username === '' || name == null || name === '') {
			return
		}

		signup.mutate({ id: username, name, image: imageUrl })
	}

	return (
		<>
			<h1 className="mb-8 text-center text-3xl font-bold">Sign Up</h1>
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<Label labelFor="username">Username</Label>
					<Input id="username" pattern="\S*" required ref={usernameRef} />
				</div>
				<div>
					<Label labelFor="name">Name</Label>
					<Input id="name" required ref={nameRef} />
				</div>
				<div>
					<Label labelFor="imageUrl">Image URL</Label>
					<Input id="username" type="url" ref={imageUrlRef} />
				</div>
				<Button disabled={signup.isPending} type="submit">
					{signup.isPending ? 'Loading...' : 'Sign up'}
				</Button>
			</form>
		</>
	)
}

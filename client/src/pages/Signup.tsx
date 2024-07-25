import { FormEvent, useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../context/hooks'

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
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-[auto,1fr] items-center justify-items-end gap-x-3 gap-y-5"
			>
				<label htmlFor="username">Username</label>
				<Input id="username" pattern="\S*" required ref={usernameRef} />
				<label htmlFor="name">Name</label>
				<Input id="name" required ref={nameRef} />
				<label htmlFor="imageUrl">Image URL</label>
				<Input id="username" type="url" ref={imageUrlRef} />
				<Button
					disabled={signup.isPending}
					type="submit"
					className="col-span-full"
				>
					{signup.isPending ? 'Loading...' : 'Sign up'}
				</Button>
			</form>
		</>
	)
}

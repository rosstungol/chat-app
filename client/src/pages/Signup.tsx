import { useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Signup() {
	const usernameRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const imageUrlRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<h1 className="mb-8 text-center text-3xl font-bold">Sign Up</h1>
			<form className="grid grid-cols-[auto,1fr] items-center justify-items-end gap-x-3 gap-y-5">
				<label htmlFor="username">Username</label>
				<Input id="username" pattern="\S*" required ref={usernameRef} />
				<label htmlFor="name">Name</label>
				<Input id="name" required ref={nameRef} />
				<label htmlFor="imageUrl">Image URL</label>
				<Input id="username" type="url" ref={imageUrlRef} />
				<Button type="submit" className="col-span-full">
					Sign up
				</Button>
			</form>
		</>
	)
}

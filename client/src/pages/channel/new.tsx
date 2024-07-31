import { FormEvent, useRef } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '../../components/Button'
import { FullScreenCard } from '../../components/FullScreenCard'
import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import Select, { SelectInstance } from 'react-select'
import { useLoggedInAuth } from '../../hooks/useLoggedInAuth'
import { useNavigate } from 'react-router-dom'

export function NewChannel() {
	const { streamChat, user } = useLoggedInAuth()
	const navigate = useNavigate()
	const createChannel = useMutation({
		mutationFn: ({
			name,
			memberIds,
			imageUrl,
		}: {
			name: string
			memberIds: string[]
			imageUrl?: string
		}) => {
			if (streamChat == null) throw Error('Not connected')

			return streamChat
				.channel('messaging', crypto.randomUUID(), {
					name,
					image: imageUrl,
					members: [user.id, ...memberIds],
				})
				.create()
		},
		onSuccess() {
			navigate('/')
		},
	})

	const nameRef = useRef<HTMLInputElement>(null)
	const imageUrlRef = useRef<HTMLInputElement>(null)
	const memberIdsRef =
		useRef<SelectInstance<{ label: string; value: string }>>(null)

	const users = useQuery({
		queryKey: ['stream', 'users'],
		queryFn: () =>
			streamChat!.queryUsers({ id: { $ne: user.id } }, { name: 1 }),
		enabled: streamChat != null,
	})

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		const name = nameRef.current?.value
		const imageUrl = imageUrlRef.current?.value
		const selectOptions = memberIdsRef.current?.getValue()

		if (
			name == null ||
			name === '' ||
			selectOptions == null ||
			selectOptions.length === 0
		) {
			return
		}

		createChannel.mutate({
			name,
			imageUrl,
			memberIds: selectOptions.map((option) => option.value),
		})
	}

	return (
		<FullScreenCard>
			<FullScreenCard.Body>
				<h1 className="mb-8 text-center text-3xl font-bold">
					New Conversation
				</h1>
				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-[auto,1fr] items-center justify-items-end gap-x-3 gap-y-5"
				>
					<label htmlFor="name">Name</label>
					<Input id="name" ref={nameRef} required />
					<label htmlFor="imageUrl">Image URL</label>
					<Input id="imageUrl" ref={imageUrlRef} />
					<label htmlFor="members">Members</label>
					<Select
						id="members"
						ref={memberIdsRef}
						required
						isMulti
						classNames={{ container: () => 'w-full' }}
						isLoading={users.isPending}
						options={users.data?.users.map((user) => {
							return { value: user.id, label: user.name || user.id }
						})}
					/>
					<Button
						disabled={createChannel.isPending}
						type="submit"
						className="col-span-full"
					>
						{createChannel.isPending ? 'Loading...' : 'Create'}
					</Button>
				</form>
			</FullScreenCard.Body>
			<FullScreenCard.BelowCard>
				<Link to="/">Back</Link>
			</FullScreenCard.BelowCard>
		</FullScreenCard>
	)
}

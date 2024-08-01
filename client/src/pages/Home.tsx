import {
	Channel,
	ChannelHeader,
	ChannelList,
	ChannelListMessengerProps,
	Chat,
	LoadingIndicator,
	MessageInput,
	MessageList,
	Thread,
	useChatContext,
	Window,
} from 'stream-chat-react'
import { useLoggedInAuth } from '../hooks/useLoggedInAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export function Home() {
	const { user, streamChat } = useLoggedInAuth()

	if (streamChat == null) return <LoadingIndicator />

	return (
		<Chat client={streamChat}>
			<main className="flex h-screen">
				<ChannelList
					List={Channels}
					sendChannelsToList
					filters={{ members: { $in: [user.id] } }}
				/>
				<section className="flex-auto p-3">
					<Channel>
						<Window>
							<ChannelHeader />
							<MessageList />
							<MessageInput />
						</Window>
						<Thread />
					</Channel>
				</section>
			</main>
		</Chat>
	)
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
	const navigate = useNavigate()
	const { logout } = useLoggedInAuth()
	const { setActiveChannel, channel: activeChannel } = useChatContext()

	return (
		<div className="flex h-full w-72 flex-col bg-white">
			<div className="border-b border-gray-200 p-4">
				<Button onClick={() => navigate('/channel/new')} variant="primary">
					New Conversation
				</Button>
			</div>
			<div className="h-full space-y-2 border-b border-gray-200 px-4 py-4">
				{loadedChannels != null && loadedChannels.length > 0
					? loadedChannels.map((channel) => {
							const isActive = channel === activeChannel
							const extraClasses = isActive
								? 'bg-blue-50'
								: 'hover:bg-slate-50 bg-white'
							return (
								<button
									onClick={() => setActiveChannel(channel)}
									disabled={isActive}
									className={`flex w-full items-center gap-3 rounded p-4 hover:cursor-pointer ${extraClasses}`}
									key={channel.id}
								>
									{channel.data?.image && (
										<img
											src={channel.data.image}
											className="h-10 w-10 rounded-full object-cover object-center"
										/>
									)}
									<div className="overflow-hidden text-ellipsis whitespace-nowrap">
										{channel.data?.name || channel.id}
									</div>
								</button>
							)
						})
					: 'No Conversations'}
			</div>
			<div className="p-4">
				<Button
					variant="secondary"
					onClick={() => logout.mutate()}
					disabled={logout.isPending}
				>
					Log out
				</Button>
			</div>
		</div>
	)
}

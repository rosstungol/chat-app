import {
	Channel,
	ChannelHeader,
	ChannelList,
	ChannelListMessengerProps,
	Chat,
	LoadingIndicator,
	MessageInput,
	MessageList,
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
			<ChannelList
				List={Channels}
				sendChannelsToList
				filters={{ members: { $in: [user.id] } }}
			/>
			<Channel>
				<Window>
					<ChannelHeader />
					<MessageList />
					<MessageInput />
				</Window>
			</Channel>
		</Chat>
	)
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
	const navigate = useNavigate()
	const { logout } = useLoggedInAuth()
	const { setActiveChannel, channel: activeChannel } = useChatContext()

	return (
		<div className="m-3 flex h-full w-60 flex-col gap-4">
			<Button onClick={() => navigate('/channel/new')}>New Conversation</Button>
			<hr className="border-slate-400" />
			{loadedChannels != null && loadedChannels.length > 0
				? loadedChannels.map((channel) => {
						const isActive = channel === activeChannel
						const extraClasses = isActive
							? 'bg-blue-500 text-white'
							: 'hover:bg-blue-100 bg-slate-100'
						return (
							<button
								onClick={() => setActiveChannel(channel)}
								disabled={isActive}
								className={`flex items-center gap-3 rounded-lg p-4 ${extraClasses}`}
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
			<hr className="mt-auto border-slate-400" />
			<Button onClick={() => logout.mutate()} disabled={logout.isPending}>
				Log out
			</Button>
		</div>
	)
}

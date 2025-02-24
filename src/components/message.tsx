import { Skeleton } from '@/components/skeleton'
import type { TMessage } from '@/services/search.service'
import Image from 'next/image'

function ChatProfile(props: { role: 'assistant' | 'user' }) {
  const { role } = props

  if (role === 'user')
    return (
      <div className='w-9 h-9 rounded-full border flex items-center justify-center bg-neutral-200/70 shrink-0'>
        <p className='text-sm font-bold text-neutral-500'>You</p>
      </div>
    )

  if (role === 'assistant') {
    return (
      <Image
        src='/logo.png'
        alt='Mercari Logo'
        width={36}
        height={36}
        className='rounded-full'
      />
    )
  }
}

function UserMessage(props: { message: { role: 'user'; content: string } }) {
  const { message } = props

  return (
    <div className='flex gap-4 justify-end'>
      <p className='mt-1'>{message.content}</p>
      <ChatProfile role={message.role} />
    </div>
  )
}

function AssistantMessage(props: {
  message: { role: 'assistant'; content: string }
}) {
  const { message } = props

  return (
    <div className='flex gap-4'>
      <ChatProfile role={message.role} />
      <p className='mt-1'>{message.content}</p>
    </div>
  )
}

function AssistantLoadingMessage() {
  return (
    <div className='flex gap-4'>
      <ChatProfile role='assistant' />
      <div className='space-y-2 w-full mt-1'>
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-2/3 h-3' />
      </div>
    </div>
  )
}

export function Message(props: { message: TMessage }) {
  const { message } = props

  if (message.role === 'user') {
    return <UserMessage message={message} />
  }

  // if the content is empty, we assumed that we are waiting for the response from the API.
  if (message.role === 'assistant' && message.content === '') {
    return <AssistantLoadingMessage />
  }

  return <AssistantMessage message={message} />
}

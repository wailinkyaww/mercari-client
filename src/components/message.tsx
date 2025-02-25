import Image from 'next/image'
import { Block } from '@/components/block'
import { Skeleton } from '@/components/skeleton'

import type {
  TAssistantMessage,
  TMessage,
  TUserMessage,
} from '@/services/search.service'

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
        className='rounded-full shrink-0 w-9 h-9'
      />
    )
  }
}

function Divider() {
  return (
    <div className='flex flex-col gap-0.5 justify-center my-2 ml-2'>
      <div className='h-3 bg-neutral-400 w-0.5 ml-[2px]' />
      <div className='w-1.5 h-1.5 rounded-full bg-neutral-400' />
      <div className='h-3 bg-neutral-400 w-0.5 ml-[2px]' />
    </div>
  )
}

function UserMessage(props: { message: TUserMessage }) {
  const { message } = props

  return (
    <div className='flex gap-4 justify-end'>
      <p className='mt-1'>{message.content}</p>
      <ChatProfile role={message.role} />
    </div>
  )
}

function AssistantMessage(props: { message: TAssistantMessage }) {
  const { message } = props

  return (
    <div className='flex gap-4'>
      <ChatProfile role={message.role} />

      <div className='flex flex-col'>
        {message.blocks.map((block, index) => (
          <div key={index} className='flex flex-col'>
            <Block block={block} />
            {index !== message.blocks.length - 1 && <Divider />}
          </div>
        ))}
      </div>
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

  // if the blocks is empty array, we assumed that we are waiting for the response from the API.
  if (message.role === 'assistant' && message.blocks.length === 0) {
    return <AssistantLoadingMessage />
  }

  return <AssistantMessage message={message} />
}

import Image from 'next/image'
import { useState } from 'react'
import { Block } from '@/components/block'
import { Skeleton } from '@/components/skeleton'
import { Markdown } from '@/components/markdown'

import type {
  TAssistantMessage, TBlock,
  TMessage,
  TUserMessage
} from '@/services/search.service'
import { TypingIndicator } from '@/components/typing-indicator'
import { twMerge } from 'tailwind-merge'

function ChatProfile(props: { role: 'assistant' | 'user' }) {
  const { role } = props

  if (role === 'user')
    return (
      <div className="w-9 h-9 rounded-full border flex items-center justify-center bg-neutral-200/70 shrink-0">
        <p className="text-sm font-bold text-neutral-500">You</p>
      </div>
    )

  if (role === 'assistant') {
    return (
      <Image
        src="/logo.png"
        alt="Mercari Logo"
        width={36}
        height={36}
        className="rounded-full shrink-0 w-9 h-9"
      />
    )
  }
}

function Divider() {
  return (
    <div className="flex flex-col gap-0.5 justify-center my-2 ml-2">
      <div className="h-3 bg-neutral-400 w-0.5 ml-[2px]" />
      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
      <div className="h-3 bg-neutral-400 w-0.5 ml-[2px]" />
    </div>
  )
}

function UserMessage(props: { message: TUserMessage }) {
  const { message } = props

  return (
    <div className="flex gap-4 justify-end">
      <div className="bg-[#6778f5]/10 mt-1 max-w-[75%] py-2 px-4 rounded">
        <p>{message.content}</p>
      </div>
      <ChatProfile role={message.role} />
    </div>
  )
}

function AgentSteps(props: { isThinking: boolean; statusBlocks: TBlock[] }) {
  const { isThinking, statusBlocks } = props
  const [visible, setVisible] = useState(true)

  return <div className="flex flex-col gap-2">

    <div className="flex gap-2 items-center" onClick={() => setVisible(prev => !prev)}>
      {isThinking && <p className="font-medium text-lg text-neutral-500">Thinking</p>}
      {!isThinking && <p className="font-medium text-lg text-neutral-500">Agent Steps</p>}
      <span
        className={twMerge('inline-block text-xl font-bold text-neutral-500', !visible && 'rotate-[270deg]')}>↓</span>
    </div>

    <div className={twMerge('border px-5 py-3 rounded bg-neutral-50/50', !visible && 'hidden')}>
      {statusBlocks.map((block, index) => (
        <div key={index} className="flex flex-col items-start">
          <Block block={block} />
          {index !== statusBlocks.length - 1 && <Divider />}
        </div>
      ))}

      {isThinking && <TypingIndicator className="w-fit rounded mt-5" />}
    </div>
  </div>
}

function AssistantMessage(props: { message: TAssistantMessage }) {
  const { message } = props

  const statusBlocks = message.blocks.filter(
    (b) => b.blockType === 'status_update'
  )

  const llmResponse = message.blocks
    .filter((b) => b.blockType === 'completion_response')
    .reduce((acc, b) => acc + b.content, '')

  const isThinking = llmResponse.length === 0

  return (
    <div className="flex gap-4">
      <ChatProfile role={message.role} />

      <div className="flex flex-col gap-4">
        {statusBlocks.length > 0 && <AgentSteps isThinking={isThinking} statusBlocks={statusBlocks} />}
        {llmResponse.length > 0 && <Markdown markdownContent={llmResponse} />}
      </div>
    </div>
  )
}

function AssistantLoadingMessage() {
  return (
    <div className="flex gap-4">
      <ChatProfile role="assistant" />
      <div className="space-y-2 w-full mt-1">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
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

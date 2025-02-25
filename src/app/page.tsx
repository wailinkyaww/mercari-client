'use client'

import { twMerge } from 'tailwind-merge'
import { useCallback, useState } from 'react'
import { Message } from '@/components/message'
import { ChatInput } from '@/components/chat-input'

import { generateSearchCompletion, TBlock } from '@/services/search.service'
import { type TMessage } from '@/services/search.service'

export default function Home() {
  const [messages, setMessages] = useState<TMessage[]>([])

  const updateLastMessage = useCallback(
    (blocks: TBlock[]) => {
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        if (lastMessage.role !== 'assistant') return messages

        lastMessage = structuredClone(lastMessage)
        lastMessage.blocks.push(...blocks)

        return [...messages.slice(0, -1), lastMessage]
      })
    },
    [setMessages],
  )

  async function onUserMessageSubmit(content: string) {
    setMessages([
      ...messages,
      { role: 'user', content },
      { role: 'assistant', blocks: [] },
    ])

    await generateSearchCompletion({
      messages: [...messages, { role: 'user', content }],
      onChunkReceived: (chunk) => {
        const blocks = chunk
          .split('\n')
          .filter(Boolean)
          .map((block) => JSON.parse(block.trim()))
        console.log(blocks)

        updateLastMessage(blocks)
      },
    })
  }

  return (
    // height calculation - full screen height minus margin on top and bottom
    <div
      className={twMerge(
        'flex flex-col max-w-2xl md:mx-auto m-4 h-[calc(100vh-2rem)] justify-between',
        messages.length === 0 && 'justify-center',
      )}
    >
      <div className='flex flex-col gap-4'>
        {messages.map((message, index) => {
          return <Message key={index} message={message} />
        })}
      </div>

      {messages.length === 0 && (
        <div className='mb-10'>
          <h2 className='text-3xl font-bold text-center text-[#6778f5]'>
            Mercari Shopper
          </h2>
        </div>
      )}

      <ChatInput onSubmit={onUserMessageSubmit} />
    </div>
  )
}

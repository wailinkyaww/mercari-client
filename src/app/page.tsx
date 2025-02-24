'use client'

import { useCallback, useState } from 'react'
import { Message } from '@/components/message'
import { ChatInput } from '@/components/chat-input'

import { generateSearchCompletion } from '@/services/search.service'
import { type TMessage } from '@/services/search.service'

export default function Home() {
  const [messages, setMessages] = useState<TMessage[]>([
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi! How can I help you today?' },
    { role: 'user', content: 'Hello' },
  ])

  const updateLastMessage = useCallback(
    (chunk: string) => {
      setMessages((messages) => {
        const lastMessage = messages[messages.length - 1]
        const updatedMessages = messages.slice(0, -1)

        return [
          ...updatedMessages,
          { role: 'assistant', content: lastMessage.content + chunk },
        ]
      })
    },
    [setMessages],
  )

  async function onUserMessageSubmit(content: string) {
    setMessages([
      ...messages,
      { role: 'user', content },
      { role: 'assistant', content: '' },
    ])

    await generateSearchCompletion({
      messages: [...messages, { role: 'user', content }],
      onChunkReceived: updateLastMessage,
    })
  }

  return (
    // height calculation - full screen height minus margin on top and bottom
    <div className='flex flex-col max-w-2xl md:mx-auto m-4 h-[calc(100vh-2rem)] justify-between'>
      <div className='flex flex-col gap-4 '>
        {messages.map((message, index) => {
          return <Message key={index} message={message} />
        })}
      </div>

      <ChatInput onSubmit={onUserMessageSubmit} />
    </div>
  )
}

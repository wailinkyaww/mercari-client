'use client'

import { useState } from 'react'
import { Message } from '@/components/message'
import { ChatInput } from '@/components/chat-input'
import { type TMessage } from '@/services/search.service'

export default function Home() {
  const [messages, setMessages] = useState<TMessage[]>([
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi! How can I help you today?' },
  ])

  function onUserMessageSubmit(content: string) {
    setMessages([...messages, { role: 'user', content }])
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

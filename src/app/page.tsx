'use client'

import { useState } from 'react'
import { Message } from '@/components/message'
import { type TMessage } from '@/services/search.service'

export default function Home() {
  const [messages] = useState<TMessage[]>([
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi! How can I help you today?' },
  ])

  return (
    <div className='flex flex-col gap-4 max-w-2xl mx-auto p-4'>
      {messages.map((message, index) => {
        return <Message key={index} message={message} />
      })}
    </div>
  )
}

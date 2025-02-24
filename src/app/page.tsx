'use client'

import { type ComponentRef, useRef, useState } from 'react'
import { Message } from '@/components/message'
import { type TMessage } from '@/services/search.service'

export default function Home() {
  const [messages, setMessages] = useState<TMessage[]>([
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi! How can I help you today?' },
  ])

  const textInputRef = useRef<ComponentRef<'input'>>(null)

  return (
    // height calculation - full screen height minus margin on top and bottom
    <div className='flex flex-col max-w-2xl md:mx-auto m-4 h-[calc(100vh-2rem)] justify-between'>
      <div className='flex flex-col gap-4 '>
        {messages.map((message, index) => {
          return <Message key={index} message={message} />
        })}
      </div>

      <input
        ref={textInputRef}
        type='text'
        className='border border-neutral-300 rounded-lg p-2 w-full'
        placeholder='What do you want to buy on Mercari today...'
        onKeyUp={(event) => {
          // on enter key press
          if (event.key === 'Enter') {
            setMessages([
              ...messages,
              { role: 'user', content: event.currentTarget.value },
            ])

            // clear the input text box
            if (textInputRef.current) {
              textInputRef.current.value = ''
            }
          }
        }}
      />
    </div>
  )
}

import { TMessage } from '@/services/search.service'

function ChatProfile(props: { role: 'assistant' | 'user' }) {
  const { role } = props

  return (
    <div className='w-9 h-9 rounded-full border flex items-center justify-center bg-neutral-200/70 shrink-0'>
      {role === 'user' && (
        <p className='text-sm font-semibold text-neutral-500'>You</p>
      )}
      {role === 'assistant' && (
        <p className='text-sm font-semibold text-neutral-500'>AI</p>
      )}
    </div>
  )
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

export function Message(props: { message: TMessage }) {
  const { message } = props

  if (message.role === 'user') {
    return <UserMessage message={message} />
  }

  if (message.role === 'assistant') {
    return <AssistantMessage message={message} />
  }
}

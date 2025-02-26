import { type ComponentRef, useRef } from 'react'

export function ChatInput(props: { onSubmit: (message: string) => void }) {
  const { onSubmit } = props
  const textInputRef = useRef<ComponentRef<'input'>>(null)

  return (
    <input
      ref={textInputRef}
      type='text'
      className='border border-neutral-300 rounded py-2 px-4 w-full text-lg shrink-0'
      placeholder='What do you want to buy today?'
      onKeyUp={(event) => {
        // on enter key press
        if (event.key === 'Enter') {
          onSubmit(event.currentTarget.value)

          // clear the input text box
          if (textInputRef.current) {
            textInputRef.current.value = ''
          }
        }
      }}
    />
  )
}

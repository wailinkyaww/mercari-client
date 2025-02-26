import { twMerge } from 'tailwind-merge'

export const TypingIndicator = (props: { className?: string }) => {
  const { className } = props

  return (
    <div
      className={twMerge(
        'flex items-center justify-center space-x-2 typing-indicator',
        className
      )}
    >
      <div className="h-[10px] w-[10px] rounded-full bg-gray-500/90 dot" />
      <div className="h-[10px] w-[10px] rounded-full bg-gray-500/90 dot" />
      <div className="h-[10px] w-[10px] rounded-full bg-gray-500/90 dot" />
    </div>
  )
}
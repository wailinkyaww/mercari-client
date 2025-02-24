import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'react'

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('animate-pulse rounded bg-neutral-300', className)}
      {...props}
    />
  )
}

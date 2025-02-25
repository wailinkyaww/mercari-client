import type { TBlock } from '@/services/search.service'
import { twMerge } from 'tailwind-merge'

export default function FiltersDisplay(props: {
  filters: Record<string, string | number | null>
}) {
  const { filters } = props

  const filterRows = [
    { label: 'Search Keywords', value: filters.search_keyword },
    { label: 'Item Origin', value: filters.item_origin },
    filters.condition && { label: 'Condition', value: filters.condition },
    filters.price_min && { label: 'Minimum Price', value: filters.price_min },
    filters.price_max && { label: 'Maximum Price', value: filters.price_max },
    filters.free_shipping && { label: 'Only Free Shipping', value: 'Yes' },
  ].filter(Boolean) as { label: string; value: string | number }[]

  return (
    <div className='flex flex-col'>
      {filterRows.map((row, index) => (
        <div
          key={index}
          className={twMerge(
            'flex bg-[#6778f5]/20 py-2',
            index % 2 === 0 && 'bg-neutral-100',
            index === 0 && 'rounded-t',
            index === filterRows.length - 1 && 'rounded-b',
          )}
        >
          <p className='w-[200px] px-4'>{row.label}</p>
          <p className='w-[200px] border-l border-neutral-400 px-4'>
            {row.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export function Block(props: { block: TBlock }) {
  const { block } = props

  if (block.blockType === 'completion_response') {
    return <p>{block.content}</p>
  }

  // Below to the end will be the status update blocks, as we now only have two types of blocks
  if (block.status === 'query_analysis') {
    return (
      <div className='py-1'>
        <p>{block.message}</p>
      </div>
    )
  }

  if (block.status === 'extracting_filters') {
    return (
      <div className='py-1'>
        <p>{block.message}</p>
      </div>
    )
  }

  if (block.status === 'filters_extraction_done') {
    const filters = block.filters as Record<string, string | number | null>

    return (
      <div className='py-2 space-y-2'>
        <p>{block.message}</p>
        <FiltersDisplay filters={filters} />
      </div>
    )
  }
}

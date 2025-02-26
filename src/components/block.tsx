import { twMerge } from 'tailwind-merge'
import type { TBlock, TProduct } from '@/services/search.service'
import Image from 'next/image'

function FiltersDisplay(props: {
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

function ProductCard(props: { product: TProduct }) {
  const { product } = props

  return (
    <div className='flex flex-col gap-2'>
      <div
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
        }}
        className='rounded overflow-hidden'
      >
        <Image
          alt={product.product_name}
          src={product.product_image_url}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div>
        <p className='line-clamp-1'>{product.product_name}</p>
      </div>
    </div>
  )
}

export function Block(props: { block: TBlock }) {
  const { block } = props

  if (block.blockType === 'completion_response') {
    return <p>{block.content}</p>
  }

  // Below to the end will be the status update blocks, as we now only have two types of blocks
  if (block.status === 'generic') {
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

  if (block.status === 'scraping_products') {
    return (
      <div className='py-1 flex gap-2'>
        <p>{block.message} - </p>
        <a
          href={block.url}
          target='_blank'
          rel='noreferrer'
          className='text-blue-700 underline'
        >
          See on Mercari
        </a>
      </div>
    )
  }

  if (block.status === 'products_scraped') {
    return (
      <div className='py-1 space-y-2'>
        <p>{block.message}</p>

        <div className='flex gap-4 overflow-y-auto max-w-xl'>
          {block.products.map((product, index) => {
            return <ProductCard product={product} key={index} />
          })}
        </div>
      </div>
    )
  }
}

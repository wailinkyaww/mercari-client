import type { TBlock } from '@/services/search.service'

export function Block(props: { block: TBlock }) {
  const { block } = props

  if (block.blockType === 'completion_response') {
    return <p>{block.content}</p>
  }

  // Below to the end will be the status update blocks, as we now only have two types of blocks
  if (block.status === 'query_analysis') {
    return (
      <div>
        <p>{block.message}</p>
      </div>
    )
  }

  if (block.status === 'extracting_filters') {
    return (
      <div>
        <p>{block.message}</p>
      </div>
    )
  }

  if (block.status === 'filters_extraction_done') {
    return (
      <div>
        <p>{block.message}</p>
        <pre>{JSON.stringify(block.filters, null, 2)}</pre>
      </div>
    )
  }
}

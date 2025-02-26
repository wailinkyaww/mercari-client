import { constructFullUrl } from '@/utils/url'

export type TProduct = {
  product_name: string
  product_price: string
  product_is_on_sale: boolean
  product_image_url: string
  product_url: string
}

export type TBlock =
  | {
  blockType: 'status_update'
  status: 'generic'
  message: string
}
  | {
  blockType: 'status_update'
  status: 'extracting_filters'
  message: string
}
  | {
  blockType: 'status_update'
  status: 'filters_extraction_done'
  message: string
  filters: object
}
  | {
  blockType: 'status_update'
  status: 'scraping_products'
  message: string
  url: string
}
  | {
  blockType: 'status_update'
  status: 'products_scraped'
  message: string
  products: TProduct[]
}
  | {
  blockType: 'completion_response'
  content: string
}

export type TUserMessage = { role: 'user'; content: string }
export type TAssistantMessage = { role: 'assistant'; blocks: TBlock[] }
export type TMessage = TUserMessage | TAssistantMessage

/**
 * @param payload.messages - Array of messages to generate the search completion.
 *  Both user and assistant messages are allowed.
 * @param payload.signal - AbortSignal to cancel the request.
 *  In case, the user leaves the page, we can cancel the request.
 *  We can cancel upstream LLM calls to API. This will help in saving resources.
 * @param payload.onChunkReceived - Callback function to receive the generated search completion chunk.
 *  This is used to support the streaming feature in the UI (text generation).
 */
export async function generateSearchCompletion(payload: {
  messages: TMessage[]
  signal?: AbortSignal
  onChunkReceived: (chunk: string) => void
}) {
  const { messages, signal, onChunkReceived } = payload

  const baseUrl = process.env.NEXT_PUBLIC_API_URL!
  const endpoint = '/generate-search-completion'
  const fullUrl = constructFullUrl(baseUrl, endpoint)

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      // We don't need status updates for the new completion.
      // We are only interested in the message content.
      messages: messages.map((message) => {
        if (message.role === 'assistant') {
          return {
            role: message.role,
            content: message.blocks
              .filter((b) => b.blockType === 'completion_response')
              .map((b) => b.content)
              .join('')
          }
        }

        return {
          role: message.role,
          content: message.content
        }
      })
    }),
    signal
  })

  if (!response.ok) {
    throw new Error('Something went wrong, please try again.')
  }

  if (response.body === null) {
    return ''
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    // value is the token / chunk that the backend sends
    onChunkReceived(value)
  }
}

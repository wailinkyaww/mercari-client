import { constructFullUrl } from '@/utils/url'

export type TMessage =
  | {
      role: 'user'
      content: string
    }
  | {
      role: 'assistant'
      content: string
    }

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
    body: JSON.stringify({ messages }),
    signal,
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

import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export function Markdown(props: { markdownContent: string }) {
  const { markdownContent } = props

  return (
    <div className='px-1 py-2'>
      <ReactMarkdown
        components={{
          img: ({ ...props }) => {
            return (
              <div
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
                className='rounded overflow-hidden'
              >
                <Image
                  alt={props.alt as string}
                  src={props.src as string}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            )
          },

          h4: ({ ...props }) => {
            return (
              <h4
                {...props}
                className='text-lg font-bold text-neutral-900 mt-5 mb-2'
              />
            )
          },
          h3: ({ ...props }) => {
            return (
              <h3
                {...props}
                className='text-xl font-bold text-neutral-900 mt-5 mb-2'
              />
            )
          },
          ul: ({ ...props }) => {
            return <ul {...props} className='px-5' />
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}

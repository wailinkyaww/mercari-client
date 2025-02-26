import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export function Markdown(props: { markdownContent: string }) {
  const { markdownContent } = props

  return (
    <div className="px-1 py-2 ">
      <ReactMarkdown
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          img: ({ node, ...props }) => {
            return (
              <div
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
                className="rounded overflow-hidden"
              >
                <Image
                  alt={props.alt as string}
                  src={props.src as string}
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          h4: ({ node, children, ...props }) => {
            return (
              <h4
                {...props}
                className="text-lg font-bold text-neutral-900 mt-5 mb-2"
              >
                {children}
              </h4>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          h3: ({ node, children, ...props }) => {
            return (
              <h3
                {...props}
                className="text-xl font-bold text-neutral-900 mt-5 mb-2"
              >
                {children}
              </h3>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ul: ({ node, children, ...props }) => {
            return <ul {...props} className="px-5 py-3">{children}</ul>
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          p: ({ node, children, ...props }) => {
            return <p {...props} className="text-neutral-800">{children}</p>
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a: ({ node, children, ...props }) => {
            return (
              <a
                {...props}
                className="text-blue-700 hover:underline flex gap-2"
                target="_blank"
                rel="noreferrer"
              >
                {children} <span>↗</span>
              </a>
            )
          }
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}

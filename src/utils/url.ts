/**
 We want to join baseUrl and endpoint specific path to form the full URL.
 But URL constructor is sensitive to `/`
 - at the end of the base url
 - at the start of the endpoint specific path

 This is to ensure we have proper /, when joining baseUrl and endpoint specific path

 So that no matter what the baseUrl looks like,
 e.g.
 'http://localhost:8000' or 'http://localhost:8000/'
 '/v1/path' or 'v1/path'
 */
export function constructFullUrl(baseUrl: string, path: string): string {
  const newBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const newEndpoint = path.startsWith('/') ? path.slice(1) : path

  return new URL(newEndpoint, newBaseUrl).toString()
}
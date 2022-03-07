declare module 'intersection-observer' {
  interface Window {
    IntersectionObserver: unknown
    IntersectionObserverEntry: unknown
    intersectionRatio: unknown
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any
  export default content
}

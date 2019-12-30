declare module 'intersection-observer' {
  interface Window {
    IntersectionObserver: unknown
    IntersectionObserverEntry: unknown
    intersectionRatio: unknown
  }
  const content: any
  export default content
}

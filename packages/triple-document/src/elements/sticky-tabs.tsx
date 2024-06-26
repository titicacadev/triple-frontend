import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { ImageMeta } from '@titicaca/type-definitions'
import { Container } from '@titicaca/tds-ui'

const TabButton = styled.button`
  width: 100%;
  flex-grow: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function StickyTabs({
  value: { tabs },
}: {
  value: {
    tabs: {
      defaultImage: ImageMeta | undefined
      activeImage: ImageMeta | undefined
      anchor: string
    }[]
  }
}) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [tabHeight, setTabHeight] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const tabRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!tabs.length) {
      return
    }

    const scrollElement = document.scrollingElement || document.documentElement
    const firstEl = document.getElementById(tabs[0].anchor)

    const isNotStart =
      firstEl &&
      window.scrollY + firstEl.getBoundingClientRect().top >
        scrollElement.scrollTop
    const isEnd =
      scrollElement.scrollTop + window.innerHeight >= scrollElement.scrollHeight

    if (isNotStart) {
      setCurrentIndex(0)
    } else if (isEnd) {
      setCurrentIndex(tabs.length - 1)
    } else {
      tabs.forEach((el, index) => {
        const target = document.getElementById(el.anchor)
        if (target) {
          const visibleVertical =
            target.offsetTop >= 0 &&
            scrollElement.scrollTop + tabHeight + headerHeight >=
              window.scrollY + target.getBoundingClientRect().top &&
            scrollElement.scrollTop + tabHeight + headerHeight >
              window.scrollY +
                target.getBoundingClientRect().top +
                target.offsetHeight

          if (visibleVertical) {
            setCurrentIndex(index)
          }
        }
      })
    }
  }, [headerHeight, tabHeight, tabs])

  const handleTabClick = useCallback(
    (index: number) => {
      const offsetTop = Math.ceil(
        window.scrollY +
          (document.getElementById(tabs[index].anchor)?.getBoundingClientRect()
            .top || 0) +
          5,
      )

      window.scrollTo({
        top: offsetTop - tabHeight - headerHeight,
        behavior: 'smooth',
      })
    },
    [headerHeight, tabHeight, tabs],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0]

    const heightHandler = () => {
      setHeaderHeight(header?.clientHeight || 0)

      if (tabRef && tabRef.current) {
        setTabHeight(tabRef.current.clientHeight || 0)
      }
    }

    const timeout = setTimeout(() => {
      heightHandler()
    }, 100)

    window.addEventListener('resize', heightHandler)

    return () => {
      window.removeEventListener('resize', heightHandler)

      clearTimeout(timeout)
    }
  }, [])

  return (
    <Container
      ref={tabRef}
      css={{
        position: 'sticky',
        top: headerHeight || 0,
        left: 0,
        zIndex: 3,
        background: '#fff',
      }}
    >
      <Container
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {tabs.map(({ defaultImage, activeImage, anchor }, index) => {
          return (
            <TabButton
              onClick={() => handleTabClick(index)}
              key={`${anchor}_${index}`}
            >
              {defaultImage || activeImage ? (
                <img
                  src={
                    currentIndex === index
                      ? activeImage?.sizes.full.url
                      : defaultImage?.sizes.full.url
                  }
                  alt=""
                />
              ) : null}
            </TabButton>
          )
        })}
      </Container>
    </Container>
  )
}

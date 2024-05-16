import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

const TabButton = styled.button`
  width: 100%;
  flex-grow: 1;

  img {
    width: 100%;
  }
`

export default function StickyTabs({
  value,
}: {
  value: {
    defaultImage: ImageMeta | undefined
    activeImage: ImageMeta | undefined
    anchor: string
  }[]
}) {
  const [tabHeight, setTabHeight] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const tabRef = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    const scrollElement = document.scrollingElement || document.documentElement
    const firstEl = document.getElementById(value[0].anchor)

    const isNotStart =
      firstEl &&
      window.scrollY + firstEl.getBoundingClientRect().top >
        scrollElement.scrollTop
    const isEnd =
      scrollElement.scrollTop + window.innerHeight >= scrollElement.scrollHeight

    if (isNotStart) {
      setCurrentIndex(0)
    } else if (isEnd) {
      setCurrentIndex(value.length - 1)
    } else {
      value.forEach((el, index) => {
        const target = document.getElementById(el.anchor)
        if (target) {
          const visibleVertical =
            target.offsetTop >= 0 &&
            scrollElement.scrollTop + tabHeight >=
              window.scrollY + target.getBoundingClientRect().top &&
            scrollElement.scrollTop + tabHeight >
              window.scrollY +
                target.getBoundingClientRect().top +
                target.offsetHeight

          if (visibleVertical) {
            setCurrentIndex(index)
          }
        }
      })
    }
  }, [tabHeight, value])

  const handleTabClick = useCallback(
    (index: number) => {
      const offsetTop =
        window.scrollY +
        (document.getElementById(value[index].anchor)?.getBoundingClientRect()
          .top || 0)

      window.scrollTo({ top: offsetTop - tabHeight, behavior: 'smooth' })
    },
    [tabHeight, value],
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  useEffect(() => {
    const tabHeightHandler = () => {
      if (tabRef && tabRef.current) {
        setTabHeight(tabRef.current.clientHeight || 0)
      }
    }

    tabHeightHandler()

    window.addEventListener('resize', tabHeightHandler)

    return () => {
      window.removeEventListener('resize', tabHeightHandler)
    }
  }, [])

  return (
    <Container
      ref={tabRef}
      css={{
        position: 'sticky',
        top: 0,
        left: 0,
        background: '#fff',
      }}
    >
      <Container
        css={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {value.map(({ defaultImage, activeImage, anchor }, index) => {
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

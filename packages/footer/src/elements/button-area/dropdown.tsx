import { useEffect, useRef, useState } from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

import { FooterDropdownButton } from '../../utils/type'

import { buttonCss, buttonFlexItemCss } from './button'

const DropdownContainer = styled.div`
  position: relative;
  ${buttonFlexItemCss}

  > button {
    width: 100%;
  }
`

const DropdownOptions = styled.ul`
  position: absolute;
  bottom: calc(100% + 18px);
  right: 0;
  list-style: none;
  padding: 12px 0;
  min-width: 135px;
  z-index: 999;
  border-radius: 8px;
  border: 1px solid #dadbdf;
  color: #1b1c1f;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  background: var(--color-white);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);

  a {
    display: block;
    padding: 8px 20px;
  }
`

export function Dropdown({
  label,
  options,
  faEventAction,
}: FooterDropdownButton) {
  const [dropdownOptionsVisible, setDropdownOptionsVisible] =
    useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOptionsClicked =
        optionsRef.current && optionsRef.current.contains(event.target as Node)
      const isButtonClicked =
        buttonRef.current && buttonRef.current.contains(event.target as Node)

      if (!isOptionsClicked && !isButtonClicked) {
        setDropdownOptionsVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const { trackEvent } = useEventTrackingContext()
  return (
    <DropdownContainer>
      <button
        ref={buttonRef}
        css={buttonCss}
        onClick={(e) => {
          e.stopPropagation()
          setDropdownOptionsVisible((prev) => !prev)
          faEventAction && trackEvent({ fa: { action: faEventAction } })
        }}
      >
        <span>{label}</span>
        <DropdownArrow />
      </button>

      {dropdownOptionsVisible ? (
        <DropdownOptions ref={optionsRef}>
          {options.map(({ label, url, faEventAction }) => (
            <li key={label} value={label}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  faEventAction
                    ? trackEvent({ fa: { action: faEventAction } })
                    : undefined
                }
              >
                {label}
              </a>
            </li>
          ))}
        </DropdownOptions>
      ) : null}
    </DropdownContainer>
  )
}

function DropdownArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.0625 12.5L10.75 7.8125L6.0625 3.125"
        stroke="#1B1C1F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

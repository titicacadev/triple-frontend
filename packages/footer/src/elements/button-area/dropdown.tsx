import { useEffect, useRef, useState } from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import styled from 'styled-components'

import { FooterDropdownButton } from '../../utils/type'

import { buttonCss, buttonFlexItemCss } from './button'

const DROPDOWN_INITIAL_HEIGHT = 174

const DropdownContainer = styled.div`
  position: relative;
  ${buttonFlexItemCss}

  > button {
    width: 100%;
  }
`

const DropdownOptions = styled.ul`
  position: absolute;
  top: 32px;
  right: 0;
  list-style: none;
  padding: 12px 0;
  min-width: 135px;
  z-index: 999;
  border-radius: 8px;
  border: 1px solid var(--color-gray200);
  color: var(--color-gray);
  font-size: 12px;
  font-weight: 700;
  background: var(--color-white);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

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
  const [dropdownOptionsHeight, setDropdownOptionsHeight] = useState<number>(
    DROPDOWN_INITIAL_HEIGHT,
  )
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionsRef = useRef<HTMLUListElement>(null)
  const optionsHeightSettingFlag = useRef<boolean>(false)

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

  useEffect(() => {
    if (optionsRef.current && !optionsHeightSettingFlag.current) {
      setDropdownOptionsHeight(optionsRef.current.clientHeight)
      optionsHeightSettingFlag.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOptionsVisible])

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
        <img
          src="https://assets.triple.guide/images/ico_arrow_more@3x.png"
          alt="dropdown arrow"
          css={{ transform: 'rotate(270deg)' }}
        />
      </button>

      {dropdownOptionsVisible ? (
        <DropdownOptions
          ref={optionsRef}
          css={{ top: (dropdownOptionsHeight + 6) * -1 }}
        >
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

import styled from 'styled-components'
import { gray100, gray, white } from '@titicaca/color-palette'

/**
 * TODO: move to TF/core-elements
 * - direction: LEFT | RIGHT
 * - color: ?
 * - inverted: boolean
 * - radius
 */
export const TagLabel = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${white};
  padding: 5px 1px 6px 3px;
  color: ${gray};
  text-transform: none;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid ${gray100};
  border-width: 1px 0 1px 1px;
  z-index: 2;
  font-size: 11px;
  min-width: 41px;
  letter-spacing: -0.3px;

  > img {
    margin-right: 1px;
  }

  :before {
    border: 1px solid ${gray100};
    border-radius: 5px;
    border-width: 1px 1px 0 0;
    background-color: ${white};
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    top: 50%;
    right: -15px;

    position: absolute;
    content: '';
    z-index: -1;
    width: 18px;
    height: 18px;
  }
`

import styled from 'styled-components'

export default styled.div`
  border-radius: 6px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 4px 18px 4px 22px;

  > div:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 35px;
      background: rgba(239, 239, 239, 0.5);
      height: 1px;
    }
  }
`

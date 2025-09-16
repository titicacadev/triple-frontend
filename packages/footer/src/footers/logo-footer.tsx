import styled from 'styled-components'

const FooterContainer = styled.footer`
  height: 120px;
  background-color: #f5f5f5;
`

const TripleLogo = styled.div`
  position: relative;
  top: 30px;
  width: 100%;
  height: 20px;
  background-image: url('https://assets.triple.guide/images/img-listend-logo@3x.png');
  background-size: 46px 20px;
  background-position: center;
  background-repeat: no-repeat;
`

function LogoFooter() {
  return (
    <FooterContainer>
      <TripleLogo />
    </FooterContainer>
  )
}

export default LogoFooter

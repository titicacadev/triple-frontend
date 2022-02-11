import React from 'react'
import styled from 'styled-components'

import { FluidTable, HandlebarsAnchor } from '../common'

const FooterContainer = styled.div`
  width: 100%;
  background-color: rgba(47, 59, 58, 1);
`

const PaddingTd = styled.td`
  padding: 60px 40px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  margin-bottom: 6px; /* TODO: 여백은 td로 조정하는 방법 고민해보기 */
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`

const SubTitle = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
`

const TransitionLink = styled.a`
  box-sizing: content-box;
  display: block;
  width: 100%;
  height: 24px;
  background-color: rgba(38, 48, 47, 1);
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 6px;
  text-align: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`
const TransitionLinkLabel = styled.span`
  vertical-align: top;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 2px;
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`

const AppMarketLinkContainer = styled(FluidTable)`
  margin-top: 22px;
  margin-bottom: 22px;

  td {
    width: 50%;
    text-align: center;
  }

  td + td {
    border-left: solid 1px rgba(59, 71, 70, 1);
  }
`

const AppMarketLink = styled.a`
  font-weight: bold;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
`

const Divider = styled.td`
  width: 100%;
  height: 0;
  border-bottom: solid 1px rgba(59, 71, 70, 1);
`

const NoticeContainer = styled(FluidTable)`
  margin-top: 30px;
`

const Notice = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;

  a {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: underline;
  }
`

const CompanyInfoContainer = styled(FluidTable)`
  margin-top: 16px;
`

const CompanyInfo = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.3);

  tr + tr td {
    padding-top: 4px;
  }

  a {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
  }
`

export default function EmailFooter({
  transitionLink,
}: {
  transitionLink: string
}) {
  return (
    <FooterContainer>
      <FluidTable>
        <tr>
          <PaddingTd>
            <FluidTable>
              <tbody>
                <tr>
                  <td>
                    <FluidTable>
                      <tbody>
                        <tr>
                          <td>
                            <Title>국내 여행도 트리플로 한 번에</Title>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <SubTitle>
                              예약부터 일정까지 트리플 하나로 간편하게
                              준비하세요.
                            </SubTitle>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <TransitionLink
                              href={transitionLink}
                              ses:tags="link:transitionLink"
                            >
                              <img
                                width="24"
                                height="24"
                                src="https://assets.triple.guide/images/icon_mail_triple@3x.png"
                                alt="triple_icon"
                              />
                              <TransitionLinkLabel>
                                트리플 시작하기
                              </TransitionLinkLabel>
                            </TransitionLink>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <AppMarketLinkContainer>
                              <tbody>
                                <tr>
                                  <td>
                                    <AppMarketLink
                                      href="http://play.google.com/store/apps/details?id=com.titicacacorp.triple"
                                      ses:tags="link:playStoreLink"
                                    >
                                      Google Play
                                    </AppMarketLink>
                                  </td>
                                  <td>
                                    <AppMarketLink
                                      href="https://itunes.apple.com/app/id1225499481"
                                      ses:tags="link:appStoreLink"
                                    >
                                      App Store
                                    </AppMarketLink>
                                  </td>
                                </tr>
                              </tbody>
                            </AppMarketLinkContainer>
                          </td>
                        </tr>

                        <tr>
                          <Divider className="divider" />
                        </tr>
                      </tbody>
                    </FluidTable>
                  </td>
                </tr>

                <tr>
                  <td>
                    <NoticeContainer>
                      <tbody>
                        <tr>
                          <td>
                            <Notice>
                              트리플의 여행 소식을 더 이상 받고 싶지
                              않다면&nbsp;
                              <HandlebarsAnchor linkId="unsubscribeLink">
                                여기
                              </HandlebarsAnchor>
                              를 클릭해 주세요.
                            </Notice>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Notice>
                              If you’d like to unsubscribe from Triple’s
                              newsletters,&nbsp;
                              <HandlebarsAnchor linkId="unsubscribeLink">
                                click here
                              </HandlebarsAnchor>
                              .
                            </Notice>
                          </td>
                        </tr>
                      </tbody>
                    </NoticeContainer>
                  </td>
                </tr>

                <tr>
                  <td>
                    <CompanyInfoContainer>
                      <tbody>
                        <tr>
                          <td>
                            <CompanyInfo>
                              주식회사 트리플 ｜ 대표 김연정, 최휘영
                            </CompanyInfo>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <CompanyInfo>
                              주소 경기도 성남시 분당구 판교역로14번길 16, 3층
                            </CompanyInfo>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <CompanyInfo>
                              문의&nbsp;
                              <a href="mailto:help@triple-corp.com">
                                help@triple-corp.com
                              </a>
                              &nbsp;/&nbsp;
                              <a href="tel:1588-2539">1588-2539</a>
                            </CompanyInfo>
                          </td>
                        </tr>
                      </tbody>
                    </CompanyInfoContainer>
                  </td>
                </tr>
              </tbody>
            </FluidTable>
          </PaddingTd>
        </tr>
      </FluidTable>
    </FooterContainer>
  )
}

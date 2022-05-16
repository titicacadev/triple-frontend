import styled from 'styled-components'
import {
  marginMixin,
  paddingMixin,
  MarginPadding,
} from '@titicaca/core-elements'

import { FluidTable } from '../common'

const PaddingTd = styled.td`
  padding: 60px 40px;
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
  margin-bottom: 20px;
  color: rgba(58, 58, 58, 1);
`

const SubTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  line-height: 17px;
  margin-bottom: 10px;
  color: rgba(58, 58, 58, 1);
`

const FeedBackCell = styled.td`
  width: 50%;
`

const LandingButton = styled.a<{
  margin?: MarginPadding
  padding?: MarginPadding
}>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  color: rgba(58, 58, 58, 1);
  border: 1px solid rgba(58, 58, 58, 0.2);
  border-radius: 4px;
  text-align: center;

  ${marginMixin}
  ${paddingMixin}
`

const NewsletterArchivingLink = styled.a`
  display: inline-block;
  font-size: 14px;
  line-height: 17px;
  color: rgba(54, 143, 255, 1);
  text-decoration: underline;
`

export default function EmailFeedback({ username }: { username: string }) {
  return (
    <FluidTable>
      <tbody>
        <tr>
          <PaddingTd>
            <FluidTable>
              <tbody>
                <tr>
                  <td>
                    <FluidTable margin={{ bottom: 40 }}>
                      <tbody>
                        <tr>
                          <td>
                            <Title>이번 주 여행 이야기는 어땠나요?</Title>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <FluidTable>
                              <tbody>
                                <tr>
                                  <FeedBackCell>
                                    {/* TODO: 구글 폼 페이지로 랜딩 */}
                                    <LandingButton
                                      padding={{
                                        top: 15,
                                        bottom: 15,
                                        left: 11,
                                        right: 11,
                                      }}
                                      href="test"
                                      ses:tags="link:like"
                                    >
                                      좋아요
                                    </LandingButton>
                                  </FeedBackCell>

                                  <FeedBackCell>
                                    {/* TODO: 구글 폼 페이지로 랜딩 */}
                                    <LandingButton
                                      padding={{
                                        top: 15,
                                        bottom: 15,
                                        left: 11,
                                        right: 11,
                                      }}
                                      href="test"
                                      ses:tags="link:soso"
                                    >
                                      아쉬워요
                                    </LandingButton>
                                  </FeedBackCell>
                                </tr>
                              </tbody>
                            </FluidTable>
                          </td>
                        </tr>
                      </tbody>
                    </FluidTable>
                  </td>
                </tr>

                <tr>
                  <td>
                    <FluidTable margin={{ bottom: 40 }}>
                      <tbody>
                        <tr>
                          <td>
                            <Title>
                              {username}님의 여행이야기를 보내주세요.
                            </Title>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            {/* TODO: 절대경로 이미지 추가 */}
                            <img src="" alt="send" />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            {/* TODO: 구글 폼 페이지로 랜딩 */}
                            <LandingButton
                              href="test"
                              padding={{
                                top: 16,
                                bottom: 16,
                                left: 15,
                                right: 15,
                              }}
                            >
                              내 여행 이야기 보내기
                            </LandingButton>
                          </td>
                        </tr>
                      </tbody>
                    </FluidTable>
                  </td>
                </tr>

                <tr>
                  <td>
                    <FluidTable>
                      <tbody>
                        <tr>
                          <Title>매주 트리플 레터를 받아보세요.</Title>
                        </tr>

                        <tr>
                          <td>
                            {/* TODO: 뉴스레터 구독 신청 페이지로 랜딩 */}
                            <LandingButton
                              href="test"
                              margin={{ bottom: 6 }}
                              padding={{
                                top: 16,
                                bottom: 16,
                                left: 15,
                                right: 15,
                              }}
                            >
                              트리플 레터 구독하기
                            </LandingButton>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            {/* TODO: 뉴스레터 아카이빙 페이지로 랜딩 */}
                            <LandingButton
                              href="test"
                              padding={{
                                top: 16,
                                bottom: 16,
                                left: 15,
                                right: 15,
                              }}
                              margin={{
                                bottom: 20,
                              }}
                            >
                              트리플 레터 모아보기
                            </LandingButton>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <SubTitle>트리플 레터를 공유해주세요.</SubTitle>
                          </td>
                        </tr>

                        <tr>
                          {/* TODO: 뉴스레터 아카이빙 페이지로 랜딩 */}
                          <NewsletterArchivingLink href="test">
                            https://triple.guide
                          </NewsletterArchivingLink>
                        </tr>
                      </tbody>
                    </FluidTable>
                  </td>
                </tr>
              </tbody>
            </FluidTable>
          </PaddingTd>
        </tr>
      </tbody>
    </FluidTable>
  )
}

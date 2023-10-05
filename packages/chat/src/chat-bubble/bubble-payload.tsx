import { Autolinker } from 'autolinker'
import { useEnv } from '@titicaca/react-contexts'
import { useHrefToProps } from '@titicaca/router'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { ImageBubble, RichBubble, TextBubble } from '../bubbles'
import { useChat } from '../chat'
import { ImagePayload, MessageType, RichPayload, TextPayload } from '../types'

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload
  my: boolean
}

const BubblePayload = ({ payload, my }: BubblePayloadProps) => {
  const {
    textBubbleFontSize,
    textBubbleMaxWidthOffset,
    mediaUrlBase,
    cloudinaryName,
    onRichBubbleButtonBeforeRouting,
    onImageBubbleClick,
    onTextBubbleClick,
  } = useChat()
  const { webUrlBase } = useEnv()
  const convertHrefToProps = useHrefToProps()
  const app = useTripleClientMetadata()

  switch (payload.type) {
    case MessageType.IMAGES:
      return (
        <ImageBubble
          imageInfos={payload.images}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
          onClick={onImageBubbleClick}
        />
      )
    case MessageType.TEXT:
      return (
        <TextBubble
          my={my}
          size={textBubbleFontSize}
          maxWidthOffset={textBubbleMaxWidthOffset}
          margin={my ? { left: 8 } : undefined}
        >
          <div
            onClick={onTextBubbleClick}
            aria-hidden
            dangerouslySetInnerHTML={{
              __html: Autolinker.link(payload.message, {
                newWindow: true,
                stripPrefix: false,
                replaceFn: (match) => {
                  const tag = match.buildTag()
                  if (match.getAnchorHref().includes(webUrlBase) && app) {
                    const linkProps = convertHrefToProps(match.getAnchorHref())

                    tag.setAttr('href', linkProps.href)
                  }
                  return tag
                },
              }),
            }}
          />
        </TextBubble>
      )
    case MessageType.RICH:
      return (
        <RichBubble
          my={my}
          items={payload.items}
          textBubbleFontSize={textBubbleFontSize}
          textBubbleMaxWidthOffset={textBubbleMaxWidthOffset}
          onButtonBeforeRouting={onRichBubbleButtonBeforeRouting}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
          onImageBubbleClick={onImageBubbleClick}
        />
      )
    default:
      return null
  }
}

export default BubblePayload

import { useHistoryFunctions, ImagesProvider } from '@titicaca/react-contexts'
import { Button } from '@titicaca/core-elements'

import {
  DetailViewerPopup,
  DetailViewerPopupProp,
  HASH_IMAGE_VIEWER_POPUP,
} from '../image-viewer'

export default {
  title: 'Image Viewer / Detail Viewer',
  component: DetailViewerPopup,
  decorators: [
    (Story) => (
      <ImagesProvider
        source={{
          id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
          type: 'attraction',
        }}
        images={[
          {
            id: 'test image',
            sourceUrl:
              '출처가 있는 이미지입니다. 아주 긴 출처를 가지고 있습니다.',
            sizes: {
              large: {
                url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              full: {
                url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
          },
          {
            id: 'test image2',
            sizes: {
              full: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
              },
              large: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
              },
              smallSquare: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
              },
            },
          },
          {
            id: 'image3',
            sizes: {
              large: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/7095aed4-65f7-4157-9b11-55bc871aac6d.jpeg',
              },
              full: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/7095aed4-65f7-4157-9b11-55bc871aac6d.jpeg',
              },
              small_square: {
                url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/7095aed4-65f7-4157-9b11-55bc871aac6d.jpeg',
              },
            },
          },
        ]}
        total={3}
      >
        <Story />
      </ImagesProvider>
    ),
  ],
  args: {
    imageIndex: 0,
  },
}

function UriHashHistoryManipulator() {
  const { push } = useHistoryFunctions()

  return (
    <Button onClick={() => push(HASH_IMAGE_VIEWER_POPUP)}>
      Show Image Viewer Popup
    </Button>
  )
}

export const DetailViewer = ({ ...args }: DetailViewerPopupProp) => {
  return (
    <>
      <UriHashHistoryManipulator />
      <DetailViewerPopup {...args} />
    </>
  )
}

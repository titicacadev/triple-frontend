import { ChatUserInterface, MetaDataInterface } from '../types'

export function getProfileImageUrl<U>(user: ChatUserInterface<U>) {
  if (user?.profile.thumbnail) {
    return user.profile.thumbnail
  }

  const imageNumber = parseInt(user?.id?.substring(0, 4) || '0', 16) % 5
  return `https://assets.triple.guide/images/ico-random-profile-${imageNumber}@3x.png`
}

export const MAX_CHAT_IMAGE_WIDTH = 224

export function generatePreviewImage({
  imageInfo,
  customWidth = MAX_CHAT_IMAGE_WIDTH,
  mediaUrlBase,
  cloudinaryName,
}: {
  imageInfo: MetaDataInterface
  customWidth?: number
  mediaUrlBase: string
  cloudinaryName: string
}) {
  const { cloudinaryId, width, cloudinaryBucket } = imageInfo

  return `${mediaUrlBase}/${
    cloudinaryBucket || cloudinaryName
  }/image/upload/c_fill,w_${Math.min(
    width,
    customWidth,
  )},q_auto,f_auto/${cloudinaryId}.jpeg`
}

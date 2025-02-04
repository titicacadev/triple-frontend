import { UserInterface, MetaDataInterface } from '../types'

export function getProfileImageUrl(user: UserInterface) {
  if (user.profile.photo) {
    return user.profile.photo
  } else {
    let imageNumber = 0
    try {
      imageNumber = parseInt(user.id.substr(0, 4), 16) % 5
    } catch {
      imageNumber = 0
    }

    return `https://assets.triple.guide/images/ico-random-profile-${imageNumber}@3x.png`
  }
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

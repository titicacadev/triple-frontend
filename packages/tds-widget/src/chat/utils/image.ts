import {
  MetaDataInterface,
  UserType,
  ChatMessageInterface,
  ChatRoomUser,
  isChatRoomMember,
} from '../types'

export function getProfileImageUrl<T = UserType>(
  user: ChatMessageInterface<T>['sender'] | ChatRoomUser<T>,
) {
  if (user.profile.thumbnail) {
    return user.profile.thumbnail
  } else {
    let imageNumber = 0
    try {
      imageNumber =
        parseInt(
          (isChatRoomMember(user) ? user.roomMemberId : user.id).substr(0, 4),
          16,
        ) % 5
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return `https://assets.triple.guide/images/ico-random-profile-${imageNumber}@3x.png`
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

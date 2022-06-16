export const BaseReview =
  'id resourceId resourceType regionId comment media rating visitDate recentTrip likesCount geotags blinded createdAt updatedAt user { email unregister uid photo mileage { level point } name } replyBoard { id resourceId resourceType rootMessagesCount childMessagesCount } liked'

export const BaseReviewSpecification =
  'rating { required description } comment { required maxLength placeholder }  media { required maxCount }'

export const BaseReviewReaction = `id type user { email unregister uid photo mileage { level point } name } review { ${BaseReview} } updatedAt createdA }`

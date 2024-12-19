import { SCHEMA_SCRIPT_TYPE_MAP } from '../utils'

import {
  AddressSchema,
  AggregateOfferSchema,
  AggregateRatingSchema,
  Answer,
  Author,
  CommentType,
  GeoSchema,
  InteractionStatistic,
  ListItem,
  OpeningHoursSpecificationSchema,
  ReviewSchema,
} from './schema'

export interface ArticleScriptProps {
  headline: string
  image?: string[]
  datePublished?: string
  dateModified?: string
  author?: Author[]
  publisher?: Author[]
}

export interface BreadcrumbListScriptProps {
  itemListElement: Required<ListItem>[]
}

export interface LocalBusinessScriptProps {
  type: keyof Omit<typeof SCHEMA_SCRIPT_TYPE_MAP, 'tna'>
  name: string
  description?: string
  image?: string
  url?: string
  telephone?: string
  address: AddressSchema
  aggregateRating?: AggregateRatingSchema
  geo?: GeoSchema
  menu?: string[]
  servesCuisine?: string[]
  review?: Omit<ReviewSchema, 'itemReviewed'>[]
  priceRange?: string
  openingHoursSpecification?: OpeningHoursSpecificationSchema[]
}

export interface ProductScriptProps {
  name: string
  description?: string
  image?: string
  aggregateRating?: AggregateRatingSchema
  offers: AggregateOfferSchema
  review?: Omit<ReviewSchema, 'itemReviewed'>[]
}

export interface ReviewScriptProps {
  reviews: ReviewSchema[]
}

export interface DiscussionForumPostingScriptProps {
  headline: string
  text: string
  url: string
  author: Author
  image?: string[]
  datePublished: string
  interactionStatistic: InteractionStatistic[]
  comment: CommentType[]
}

export interface QaPageScriptProps {
  mainEntity: {
    type: 'Question'
    name: string
    text: string
    answerCount: number
    upvoteCount: number
    datePublished: string
    author: Author
    suggestedAnswer: Answer[]
    acceptedAnswer?: Answer
  }
}

import {
  TranslatedProperty,
  ImageMeta,
  PointGeoJSON,
} from '@titicaca/type-definitions'
import { Translations, ArticleBodyElement } from '@titicaca/content-utilities'
import {
  BusinessHour,
  ExternalLink,
  ExtraProperty,
  ForeignEntity,
  PoiType,
  Recommendation as RecommendationBase,
} from '@titicaca/pois-utilities'
import { TripleDocumentElementData } from '@titicaca/triple-document'
import { ArticleMetadata, ArticleType } from '@titicaca/articles-utilities'

interface Recommendation extends RecommendationBase {
  editable: boolean
  uploader: {
    photo?: string
    name: string
    userBoard?: {
      reviews: number
    }
    mileage: {
      badges: {
        icon: {
          imageUrl: string
        }
      }[]
      level: number
      point: number
    }
    uid: string
    unregister?: boolean | null
  }
}

export interface Article {
  id: string
  type: ArticleType
  source: {
    body: ArticleBodyElement[]
    metadata: {
      template: NonNullable<ArticleMetadata['template']>
      title: string | null
      description: string | null
      image: ImageMeta | null
      ogTitle: string | null
      ogImage: ImageMeta | null
      author: NonNullable<ArticleMetadata['author']> | null
      geotags: JSON[] | null
      tags: NonNullable<ArticleMetadata['tags']> | null
      destinationTags:
        | {
            type: 'triple-region' | 'triple-zone'
            id: string
          }[]
        | null
      notable: boolean | null
      relatedLinks: NonNullable<ArticleMetadata['relatedLinks']> | null
      readableTimestamp: string | null
      recommendable: boolean | null
      exposedAt: string | null
    }
  }
  recommendedPosts: Article[]
  scrapsCount: number | null
  reviewsCount: number | null
  reviewsRating: number | null
  reviewImagesCount: number | null
  reviewed: boolean
  deletedAt: string | null
  updatedAt: string
  createdAt: string
  scraped: boolean
}

export interface Poi {
  id: string
  type: PoiType
  source: {
    names: TranslatedProperty & Translations
    regionId: string | null
    timeZone: string | null
    geotags:
      | {
          id: string
          type: string
        }[]
      | null
    geolocation: PointGeoJSON | null
    geofence: JSON | null
    vicinity: string | null
    comment: string | null
    keywords: string[]
    synonyms: string[]
    addresses: TranslatedProperty
    phoneNumber: string | null
    officialSiteUrl: string | null
    directions: string | null
    remarks: string[] | null
    permanentlyClosedAt: string | null
    featuredContent: TripleDocumentElementData[]
    starRating: number | null
    grade: number | null
    image: ImageMeta | null
    images: ImageMeta[] | null
    extraProperties:
      | (Omit<ExtraProperty, 'createdAt' | 'updatedAt'> & {
          value: string
        })[]
      | null
    resourceRelationships: JSON | null
    externalLinks: ExternalLink[]
    categories: JSON[] | null
    foreignEntities: ForeignEntity[]
    extraContent: JSON[]
    areas: {
      id: string
      name: string
    }[]
    businessHours: BusinessHour[] | null
    readableBusinessHours: BusinessHour<string>[] | null
    businessHourComment: string | null
    businessHoursState: 'normal' | 'hidden' | null
    estimatedDuration: string | null
    fee: boolean | null
    feeComment: string | null
    tips: string[] | null
    dishTypes: (string | null)[] | null
    maxPrice: number | null
    minPrice: number | null
    recommendations: Recommendation[] | null
    hasProduct: boolean | null
  }
  categories: {
    id: string
    name: string
  }[]
  // eslint-disable-next-line @typescript-eslint/naming-convention
  relationshipCounts: { equipped_with: number; associated: number }
  associatedArticles: Article[]
  equippingPois: Poi[]
  recommendations: JSON[]
  region: {
    id: string
    state: string
    source: {
      names: TranslatedProperty
      featuredNames: string[]
      geofence: JSON | null
      geotags: JSON[] | null
      defaultRange: number | null
      ranges: number[] | null
      languages: string[]
      timeZone: string | null
      currencies: string[]
      flightHours: number | null
      countryCode: string | null
      popularKeywords: string[]
      menu: JSON
      media: JSON
      attractionCategories: JSON[]
      restaurantCategoreis: JSON[]
      attractionFilters: JSON[]
      restaurantFilters: JSON[]
      hotelTags: JSON[]
      guideTags: JSON[]
      terminals: JSON[]
      weatherSports: JSON[]
      attractionAreas: JSON[]
      restaurantAreas: JSON[]
      hotelAreas: JSON[]
      restaurantClustering: boolean | null
    }
    updatedAt: string | null
    createdAt: string | null
  } | null
  scrapsCount: number | null
  reviewsCount: number | null
  reviewsRating: number | null
  reviewImagesCount: number | null
  reviewed: boolean
  hasTnaProducts: boolean | null
  deletedAt: string | null
  updatedAt: string
  createdAt: string
  scraped: boolean
  restaurantRecommendations: Recommendation[] | null
}

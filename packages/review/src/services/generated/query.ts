import { GraphQLClient } from 'graphql-request'
import { RequestInit } from 'graphql-request/dist/types.dom'
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]?: Maybe<T[SubKey]>
  }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {
    [SubKey in K]: Maybe<T[SubKey]>
  }

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers)
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  JSON: any
}

export type Article = {
  __typename?: 'Article'
  createdAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  metadata: Metadata
  recommendedPosts: Array<Article>
  reviewImage?: Maybe<Scalars['JSON']>
  reviewed?: Maybe<Scalars['Boolean']>
  scraped?: Maybe<Scalars['Boolean']>
  source: ArticleSource
  type: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type ArticleMetadata = {
  __typename?: 'ArticleMetadata'
  author?: Maybe<Scalars['JSON']>
  description?: Maybe<Scalars['String']>
  destinationTags?: Maybe<Array<Scalars['JSON']>>
  exposedAt?: Maybe<Scalars['DateTime']>
  geotags?: Maybe<Array<Scalars['JSON']>>
  image?: Maybe<Scalars['JSON']>
  newsletter?: Maybe<Scalars['JSON']>
  notable?: Maybe<Scalars['Boolean']>
  ogImage?: Maybe<Scalars['JSON']>
  ogTitle?: Maybe<Scalars['String']>
  readableTimestamp?: Maybe<Scalars['String']>
  recommendable?: Maybe<Scalars['Boolean']>
  relatedLinks?: Maybe<Array<Scalars['JSON']>>
  requireLogin?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Scalars['JSON']>>
  template: Scalars['JSON']
  title?: Maybe<Scalars['String']>
}

export type ArticleSource = {
  __typename?: 'ArticleSource'
  body: Array<Scalars['JSON']>
  metadata: ArticleMetadata
}

export type City = {
  __typename?: 'City'
  country: Country
  id: Scalars['ID']
  names: Names
  region?: Maybe<Region>
  representative?: Maybe<Scalars['Boolean']>
  zone?: Maybe<Zone>
}

export type Content = {
  __typename?: 'Content'
  deleted: Scalars['Boolean']
  id: Scalars['ID']
  image?: Maybe<Scalars['JSON']>
  regionId: Scalars['ID']
  reviewsCount: Scalars['Int']
  scrapsCount: Scalars['Int']
  title: Scalars['String']
  type: Scalars['String']
}

export type Country = {
  __typename?: 'Country'
  alpha3?: Maybe<Scalars['String']>
  geolocations?: Maybe<Array<Scalars['JSON']>>
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  names: Names
  population?: Maybe<Scalars['Int']>
  restrictionState?: Maybe<Scalars['String']>
  vaccinatedRate?: Maybe<Scalars['Float']>
  vaccinatedRateIncrement?: Maybe<Scalars['Float']>
  weeklyCases?: Maybe<Scalars['Int']>
  weeklyCasesIncrement?: Maybe<Scalars['Int']>
}

export type Destination = Region | Zone

export type FeaturedDestinationsList = {
  __typename?: 'FeaturedDestinationsList'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  source: FeaturedDestinationsListSource
  updatedAt: Scalars['DateTime']
}

export type FeaturedDestinationsListSource = {
  __typename?: 'FeaturedDestinationsListSource'
  destinations: Array<Destination>
}

export type Homeward = {
  __typename?: 'Homeward'
  restrictionArticle?: Maybe<Article>
}

export type Metadata = {
  __typename?: 'Metadata'
  hasTnaProducts?: Maybe<Scalars['Boolean']>
  reviewImagesCount?: Maybe<Scalars['Int']>
  reviewsCount?: Maybe<Scalars['Int']>
  reviewsRating?: Maybe<Scalars['Float']>
  scrapsCount?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  deleteRecommendationImage: Poi
  deleteReview: Scalars['Boolean']
  likeReview: ReviewReaction
  unlikeReview: Scalars['Boolean']
  uploadRecommendationImage: Poi
}

export type MutationDeleteRecommendationImageArgs = {
  poiId: Scalars['ID']
  recommendationId: Scalars['ID']
}

export type MutationDeleteReviewArgs = {
  id: Scalars['ID']
}

export type MutationLikeReviewArgs = {
  reviewId: Scalars['String']
}

export type MutationUnlikeReviewArgs = {
  reviewId: Scalars['String']
}

export type MutationUploadRecommendationImageArgs = {
  image: Scalars['JSON']
  poiId: Scalars['ID']
  recommendationId: Scalars['ID']
}

export type Names = {
  __typename?: 'Names'
  en?: Maybe<Scalars['String']>
  ko?: Maybe<Scalars['String']>
  local?: Maybe<Scalars['String']>
}

export type Poi = {
  __typename?: 'Poi'
  associatedArticles: Array<Article>
  categories?: Maybe<Array<Scalars['JSON']>>
  createdAt: Scalars['DateTime']
  deletedAt?: Maybe<Scalars['DateTime']>
  equippingPois: Array<Poi>
  id: Scalars['ID']
  metadata: Metadata
  readableSpecialHours?: Maybe<Array<Scalars['JSON']>>
  region?: Maybe<Region>
  relationshipCounts: Scalars['JSON']
  restaurantRecommendations?: Maybe<Array<Scalars['JSON']>>
  reviewImage?: Maybe<Scalars['JSON']>
  reviewed?: Maybe<Scalars['Boolean']>
  scraped?: Maybe<Scalars['Boolean']>
  source: PoiSource
  starRating?: Maybe<Scalars['Float']>
  type: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type PoiSource = {
  __typename?: 'PoiSource'
  addresses: Scalars['JSON']
  areas: Array<Scalars['JSON']>
  businessHourComment?: Maybe<Scalars['String']>
  businessHours?: Maybe<Array<Scalars['JSON']>>
  businessHoursState?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Scalars['JSON']>>
  comment?: Maybe<Scalars['String']>
  directions?: Maybe<Scalars['String']>
  dishTypes?: Maybe<Array<Maybe<Scalars['String']>>>
  estimatedDuration?: Maybe<Scalars['String']>
  externalLinks: Array<Scalars['JSON']>
  extraContent: Array<Scalars['JSON']>
  extraProperties?: Maybe<Array<Scalars['JSON']>>
  featuredContent: Array<Scalars['JSON']>
  featuredContentMetadata?: Maybe<Scalars['JSON']>
  fee?: Maybe<Scalars['Boolean']>
  feeComment?: Maybe<Scalars['String']>
  foreignEntities: Array<Scalars['JSON']>
  geofence?: Maybe<Scalars['JSON']>
  geolocation?: Maybe<Scalars['JSON']>
  geotags?: Maybe<Array<Scalars['JSON']>>
  grade?: Maybe<Scalars['Int']>
  image?: Maybe<Scalars['JSON']>
  images?: Maybe<Array<Scalars['JSON']>>
  keywords: Array<Scalars['String']>
  maxPrice?: Maybe<Scalars['Int']>
  minPrice?: Maybe<Scalars['Int']>
  names: Scalars['JSON']
  officialSiteUrl?: Maybe<Scalars['String']>
  permanentlyClosedAt?: Maybe<Scalars['DateTime']>
  phoneNumber?: Maybe<Scalars['String']>
  readableBusinessHours?: Maybe<Array<Scalars['JSON']>>
  readableSpecialHours?: Maybe<Array<Scalars['JSON']>>
  recommendations?: Maybe<Array<Scalars['JSON']>>
  regionId?: Maybe<Scalars['String']>
  remarks?: Maybe<Array<Scalars['String']>>
  resourceRelationships?: Maybe<Scalars['JSON']>
  starRating?: Maybe<Scalars['Int']>
  synonyms: Array<Scalars['String']>
  timeZone?: Maybe<Scalars['String']>
  tips?: Maybe<Array<Scalars['String']>>
  vicinity?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getAnnouncements?: Maybe<Array<Article>>
  getArticle?: Maybe<Article>
  getCountryRestrictions: Array<Country>
  getFeaturedDestinationsList?: Maybe<FeaturedDestinationsList>
  getHomewardRestriction: Homeward
  getLatestReviews: Array<Review>
  getMyReview?: Maybe<Review>
  getNewsletters?: Maybe<Array<Article>>
  getNextNewsletter?: Maybe<Article>
  getPoi?: Maybe<Poi>
  getPois?: Maybe<Array<Poi>>
  getPopularReviews: Array<Review>
  getPosts?: Maybe<Array<Article>>
  getPrevNewsletter?: Maybe<Article>
  getRegion?: Maybe<Region>
  getRegionCategories: Array<RegionCategory>
  getRegionCategory?: Maybe<RegionCategory>
  getRegionRestrictions: Array<Region>
  getReviewSpecification?: Maybe<ReviewSpecification>
  getReviewsCount: Scalars['Int']
  getScraps: Array<Scrap>
  getZone?: Maybe<Zone>
  mgetArticles: Array<Article>
  mgetPois: Array<Poi>
  mgetRegionCategories: Array<RegionCategory>
  mgetRegions: Array<Region>
  mgetReplyBoards: Array<ReplyBoard>
  mgetReviewedArticles: Array<Article>
  mgetReviewedPois: Array<Poi>
  mgetScrapedArticles: Array<Article>
  mgetScrapedPois: Array<Poi>
  mgetUsersWithIds: Array<Maybe<User>>
  mgetZones: Array<Zone>
  searchCities: Array<City>
}

export type QueryGetAnnouncementsArgs = {
  from?: InputMaybe<Scalars['Int']>
  sinceId?: InputMaybe<Scalars['String']>
  size?: InputMaybe<Scalars['Int']>
}

export type QueryGetArticleArgs = {
  id: Scalars['ID']
}

export type QueryGetFeaturedDestinationsListArgs = {
  id: Scalars['ID']
}

export type QueryGetLatestReviewsArgs = {
  from?: InputMaybe<Scalars['Int']>
  recentTrip?: InputMaybe<Scalars['Boolean']>
  resourceId: Scalars['String']
  resourceType: Scalars['String']
  size?: InputMaybe<Scalars['Int']>
}

export type QueryGetMyReviewArgs = {
  resourceId: Scalars['String']
  resourceType: Scalars['String']
}

export type QueryGetNewslettersArgs = {
  from?: InputMaybe<Scalars['Int']>
  size?: InputMaybe<Scalars['Int']>
}

export type QueryGetNextNewsletterArgs = {
  id: Scalars['ID']
}

export type QueryGetPoiArgs = {
  id: Scalars['ID']
}

export type QueryGetPoisArgs = {
  categoryId?: InputMaybe<Scalars['String']>
  from?: InputMaybe<Scalars['Int']>
  geotags?: InputMaybe<Array<Scalars['JSON']>>
  keyword?: InputMaybe<Scalars['String']>
  regionIds?: InputMaybe<Array<Scalars['String']>>
  size?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  types?: InputMaybe<Array<Scalars['String']>>
}

export type QueryGetPopularReviewsArgs = {
  from?: InputMaybe<Scalars['Int']>
  recentTrip?: InputMaybe<Scalars['Boolean']>
  resourceId: Scalars['String']
  resourceType: Scalars['String']
  size?: InputMaybe<Scalars['Int']>
}

export type QueryGetPostsArgs = {
  from?: InputMaybe<Scalars['Int']>
  sinceId?: InputMaybe<Scalars['String']>
  size?: InputMaybe<Scalars['Int']>
  tagId?: InputMaybe<Scalars['String']>
}

export type QueryGetPrevNewsletterArgs = {
  id: Scalars['ID']
}

export type QueryGetRegionArgs = {
  id: Scalars['ID']
}

export type QueryGetRegionCategoryArgs = {
  id: Scalars['ID']
}

export type QueryGetReviewSpecificationArgs = {
  resourceId: Scalars['String']
  resourceType: Scalars['String']
}

export type QueryGetReviewsCountArgs = {
  resourceId: Scalars['String']
  resourceType: Scalars['String']
}

export type QueryGetScrapsArgs = {
  pageIdx?: InputMaybe<Scalars['Float']>
  pageSize?: InputMaybe<Scalars['Float']>
  region?: InputMaybe<Scalars['ID']>
  regionIds?: InputMaybe<Array<Scalars['ID']>>
  type?: InputMaybe<ScrapType>
  zone?: InputMaybe<Scalars['ID']>
}

export type QueryGetZoneArgs = {
  id: Scalars['ID']
}

export type QueryMgetArticlesArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetPoisArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetRegionCategoriesArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetRegionsArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetReplyBoardsArgs = {
  ids: Array<Scalars['String']>
}

export type QueryMgetReviewedArticlesArgs = {
  ids: Array<Scalars['String']>
}

export type QueryMgetReviewedPoisArgs = {
  ids: Array<Scalars['String']>
}

export type QueryMgetScrapedArticlesArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetScrapedPoisArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetUsersWithIdsArgs = {
  ids: Array<Scalars['ID']>
}

export type QueryMgetZonesArgs = {
  ids: Array<Scalars['ID']>
}

export type QuerySearchCitiesArgs = {
  keyword?: InputMaybe<Scalars['String']>
  page: Scalars['Int']
  size: Scalars['Int']
}

export type Region = {
  __typename?: 'Region'
  city?: Maybe<City>
  country?: Maybe<Country>
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  promo?: Maybe<Scalars['String']>
  regionCategory?: Maybe<RegionCategory>
  regionCategoryId?: Maybe<Scalars['String']>
  restrictionArticle?: Maybe<Article>
  restrictionState?: Maybe<Scalars['String']>
  source: RegionSource
  state: Scalars['String']
  updatedAt: Scalars['DateTime']
  zoneIds: Array<Scalars['String']>
  zones: Array<Zone>
}

export type RegionCategory = {
  __typename?: 'RegionCategory'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  priority?: Maybe<Scalars['Int']>
  regions: Array<Region>
  updatedAt: Scalars['DateTime']
}

export type RegionCategoryRegionsArgs = {
  from?: InputMaybe<Scalars['Int']>
  size?: InputMaybe<Scalars['Int']>
}

export type RegionSource = {
  __typename?: 'RegionSource'
  attractionAreas: Array<Scalars['JSON']>
  attractionCategories: Array<Scalars['JSON']>
  attractionFilters: Array<Scalars['JSON']>
  attractionGeotags?: Maybe<Array<Scalars['JSON']>>
  countryCode?: Maybe<Scalars['String']>
  currencies: Array<Scalars['String']>
  defaultRange?: Maybe<Scalars['Int']>
  featuredNames: Array<Scalars['String']>
  flightHours?: Maybe<Scalars['Int']>
  geofence?: Maybe<Scalars['JSON']>
  geotags?: Maybe<Array<Scalars['JSON']>>
  guideTags: Array<Scalars['JSON']>
  hotelAreas: Array<Scalars['JSON']>
  hotelTags: Array<Scalars['JSON']>
  languages: Array<Scalars['String']>
  media: Scalars['JSON']
  menu: Scalars['JSON']
  names: Scalars['JSON']
  popularKeywords: Array<Scalars['String']>
  ranges?: Maybe<Array<Scalars['Int']>>
  restaurantAreas: Array<Scalars['JSON']>
  restaurantCategories: Array<Scalars['JSON']>
  restaurantClustering?: Maybe<Scalars['Boolean']>
  restaurantFilters: Array<Scalars['JSON']>
  restaurantGeotags?: Maybe<Array<Scalars['JSON']>>
  stale?: Maybe<Scalars['JSON']>
  terminals: Array<Scalars['JSON']>
  timeZone?: Maybe<Scalars['String']>
  weatherSpots: Array<Scalars['JSON']>
}

export type ReplyBoard = {
  __typename?: 'ReplyBoard'
  childMessagesCount: Scalars['Int']
  id: Scalars['ID']
  pinnedMessages: Array<ReplyMessage>
  resourceId: Scalars['String']
  resourceType: Scalars['String']
  rootMessagesCount: Scalars['Int']
}

export type ReplyMessage = {
  __typename?: 'ReplyMessage'
  children?: Maybe<Array<ReplyMessage>>
  content: ReplyMessageContent
  id: Scalars['ID']
  parentId?: Maybe<Scalars['String']>
}

export type ReplyMessageContent = {
  __typename?: 'ReplyMessageContent'
  markdownText?: Maybe<Scalars['String']>
  mentionedUser?: Maybe<ReplyUser>
  text?: Maybe<Scalars['String']>
}

export type ReplyUser = {
  __typename?: 'ReplyUser'
  href?: Maybe<Scalars['String']>
  name: Scalars['String']
  profileImage?: Maybe<Scalars['String']>
}

export type Review = {
  __typename?: 'Review'
  blinded?: Maybe<Scalars['Boolean']>
  comment?: Maybe<Scalars['String']>
  geotags: Array<Scalars['JSON']>
  id: Scalars['ID']
  liked: Scalars['Boolean']
  likesCount: Scalars['Int']
  media?: Maybe<Array<Scalars['JSON']>>
  rating?: Maybe<Scalars['Int']>
  recentTrip: Scalars['Boolean']
  regionId?: Maybe<Scalars['String']>
  replyBoard?: Maybe<ReplyBoard>
  resourceId: Scalars['String']
  resourceType: Scalars['String']
  reviewedAt: Scalars['String']
  user?: Maybe<User>
  visitDate?: Maybe<Scalars['String']>
}

export type ReviewCommentSpecification = {
  __typename?: 'ReviewCommentSpecification'
  maxLength: Scalars['Int']
  placeholder: Scalars['String']
  required?: Maybe<Scalars['Boolean']>
}

export type ReviewMediaSpecification = {
  __typename?: 'ReviewMediaSpecification'
  maxCount: Scalars['Int']
  required?: Maybe<Scalars['Boolean']>
}

export type ReviewRatingSpecification = {
  __typename?: 'ReviewRatingSpecification'
  description?: Maybe<Array<Scalars['String']>>
  required?: Maybe<Scalars['Boolean']>
}

export type ReviewReaction = {
  __typename?: 'ReviewReaction'
  createdAt: Scalars['String']
  id: Scalars['ID']
  review: Review
  type: Scalars['String']
  updatedAt: Scalars['String']
  user: User
}

export type ReviewSpecification = {
  __typename?: 'ReviewSpecification'
  comment: ReviewCommentSpecification
  media: ReviewMediaSpecification
  rating?: Maybe<ReviewRatingSpecification>
}

export type Scrap = {
  __typename?: 'Scrap'
  comment?: Maybe<Scalars['String']>
  content: Content
  createdAt: Scalars['Float']
  id: Scalars['ID']
  updatedAt: Scalars['Float']
}

export enum ScrapType {
  All = 'ALL',
  Article = 'ARTICLE',
  Articles = 'ARTICLES',
  Attraction = 'ATTRACTION',
  Attractions = 'ATTRACTIONS',
  Hotel = 'HOTEL',
  Hotels = 'HOTELS',
  Poi = 'POI',
  Pois = 'POIS',
  Restaurant = 'RESTAURANT',
  Restaurants = 'RESTAURANTS',
}

export type User = {
  __typename?: 'User'
  email?: Maybe<Scalars['String']>
  mileage?: Maybe<UserMileage>
  name?: Maybe<Scalars['String']>
  photo?: Maybe<Scalars['String']>
  uid?: Maybe<Scalars['String']>
  unregister?: Maybe<Scalars['Boolean']>
  userBoard?: Maybe<UserBoard>
}

export type UserBoard = {
  __typename?: 'UserBoard'
  itineraries?: Maybe<Scalars['Int']>
  reports?: Maybe<Scalars['Int']>
  reviews?: Maybe<Scalars['Int']>
  reviewsV2?: Maybe<Scalars['Int']>
  thanks?: Maybe<Scalars['Int']>
  trips?: Maybe<Scalars['Int']>
}

export type UserMileage = {
  __typename?: 'UserMileage'
  badges?: Maybe<Array<Maybe<UserMileageBadge>>>
  level?: Maybe<Scalars['Int']>
  point?: Maybe<Scalars['Int']>
}

export type UserMileageBadge = {
  __typename?: 'UserMileageBadge'
  icon?: Maybe<UserMileageIcon>
  label?: Maybe<Scalars['String']>
}

export type UserMileageIcon = {
  __typename?: 'UserMileageIcon'
  image_url?: Maybe<Scalars['String']>
}

export type Zone = {
  __typename?: 'Zone'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  regions: Array<Region>
  source: ZoneSource
  state: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type ZoneSource = {
  __typename?: 'ZoneSource'
  attractionCategories: Array<Scalars['JSON']>
  attractionFilters: Array<Scalars['JSON']>
  attractionGeotags?: Maybe<Array<Scalars['JSON']>>
  countryCode?: Maybe<Scalars['String']>
  currencies: Array<Scalars['String']>
  defaultRange?: Maybe<Scalars['Int']>
  featuredNames: Array<Scalars['String']>
  flightHours?: Maybe<Scalars['Int']>
  geofence?: Maybe<Scalars['JSON']>
  geotags?: Maybe<Array<Scalars['JSON']>>
  guideTags: Array<Scalars['JSON']>
  languages: Array<Scalars['String']>
  media: Scalars['JSON']
  menu: Scalars['JSON']
  names: Scalars['JSON']
  popularKeywords: Array<Scalars['String']>
  ranges?: Maybe<Array<Scalars['Int']>>
  regionIds: Array<Scalars['String']>
  restaurantCategories: Array<Scalars['JSON']>
  restaurantClustering?: Maybe<Scalars['Boolean']>
  restaurantFilters: Array<Scalars['JSON']>
  restaurantGeotags?: Maybe<Array<Scalars['JSON']>>
  terminals: Array<Scalars['JSON']>
  timeZone?: Maybe<Scalars['String']>
}

export type LikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type LikeReviewMutation = {
  __typename?: 'Mutation'
  likeReview: { __typename?: 'ReviewReaction'; id: string }
}

export type UnlikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type UnlikeReviewMutation = {
  __typename?: 'Mutation'
  unlikeReview: boolean
}

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteReviewMutation = {
  __typename?: 'Mutation'
  deleteReview: boolean
}

export type BaseReviewFragment = {
  __typename?: 'Review'
  id: string
  resourceId: string
  resourceType: string
  comment?: string | null
  media?: Array<any> | null
  rating?: number | null
  visitDate?: string | null
  recentTrip: boolean
  likesCount: number
  blinded?: boolean | null
  reviewedAt: string
  liked: boolean
  user?: {
    __typename?: 'User'
    unregister?: boolean | null
    uid?: string | null
    photo?: string | null
    name?: string | null
    mileage?: {
      __typename?: 'UserMileage'
      level?: number | null
      point?: number | null
      badges?: Array<{
        __typename?: 'UserMileageBadge'
        label?: string | null
        icon?: {
          __typename?: 'UserMileageIcon'
          image_url?: string | null
        } | null
      } | null> | null
    } | null
    userBoard?: {
      __typename?: 'UserBoard'
      trips?: number | null
      reviews?: number | null
      thanks?: number | null
      reports?: number | null
      reviewsV2?: number | null
      itineraries?: number | null
    } | null
  } | null
  replyBoard?: {
    __typename?: 'ReplyBoard'
    id: string
    rootMessagesCount: number
    childMessagesCount: number
  } | null
}

export type BaseReviewSpecificationFragment = {
  __typename?: 'ReviewSpecification'
  rating?: {
    __typename?: 'ReviewRatingSpecification'
    required?: boolean | null
    description?: Array<string> | null
  } | null
}

export type GetPopularReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
  recentTrip?: InputMaybe<Scalars['Boolean']>
  from?: InputMaybe<Scalars['Int']>
  size?: InputMaybe<Scalars['Int']>
}>

export type GetPopularReviewsQuery = {
  __typename?: 'Query'
  popularReviews: Array<{
    __typename?: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment?: string | null
    media?: Array<any> | null
    rating?: number | null
    visitDate?: string | null
    recentTrip: boolean
    likesCount: number
    blinded?: boolean | null
    reviewedAt: string
    liked: boolean
    user?: {
      __typename?: 'User'
      unregister?: boolean | null
      uid?: string | null
      photo?: string | null
      name?: string | null
      mileage?: {
        __typename?: 'UserMileage'
        level?: number | null
        point?: number | null
        badges?: Array<{
          __typename?: 'UserMileageBadge'
          label?: string | null
          icon?: {
            __typename?: 'UserMileageIcon'
            image_url?: string | null
          } | null
        } | null> | null
      } | null
      userBoard?: {
        __typename?: 'UserBoard'
        trips?: number | null
        reviews?: number | null
        thanks?: number | null
        reports?: number | null
        reviewsV2?: number | null
        itineraries?: number | null
      } | null
    } | null
    replyBoard?: {
      __typename?: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  }>
}

export type GetLatestReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
  recentTrip?: InputMaybe<Scalars['Boolean']>
  from?: InputMaybe<Scalars['Int']>
  size?: InputMaybe<Scalars['Int']>
}>

export type GetLatestReviewsQuery = {
  __typename?: 'Query'
  latestReviews: Array<{
    __typename?: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment?: string | null
    media?: Array<any> | null
    rating?: number | null
    visitDate?: string | null
    recentTrip: boolean
    likesCount: number
    blinded?: boolean | null
    reviewedAt: string
    liked: boolean
    user?: {
      __typename?: 'User'
      unregister?: boolean | null
      uid?: string | null
      photo?: string | null
      name?: string | null
      mileage?: {
        __typename?: 'UserMileage'
        level?: number | null
        point?: number | null
        badges?: Array<{
          __typename?: 'UserMileageBadge'
          label?: string | null
          icon?: {
            __typename?: 'UserMileageIcon'
            image_url?: string | null
          } | null
        } | null> | null
      } | null
      userBoard?: {
        __typename?: 'UserBoard'
        trips?: number | null
        reviews?: number | null
        thanks?: number | null
        reports?: number | null
        reviewsV2?: number | null
        itineraries?: number | null
      } | null
    } | null
    replyBoard?: {
      __typename?: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  }>
}

export type GetMyReviewQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetMyReviewQuery = {
  __typename?: 'Query'
  myReview?: {
    __typename?: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment?: string | null
    media?: Array<any> | null
    rating?: number | null
    visitDate?: string | null
    recentTrip: boolean
    likesCount: number
    blinded?: boolean | null
    reviewedAt: string
    liked: boolean
    user?: {
      __typename?: 'User'
      unregister?: boolean | null
      uid?: string | null
      photo?: string | null
      name?: string | null
      mileage?: {
        __typename?: 'UserMileage'
        level?: number | null
        point?: number | null
        badges?: Array<{
          __typename?: 'UserMileageBadge'
          label?: string | null
          icon?: {
            __typename?: 'UserMileageIcon'
            image_url?: string | null
          } | null
        } | null> | null
      } | null
      userBoard?: {
        __typename?: 'UserBoard'
        trips?: number | null
        reviews?: number | null
        thanks?: number | null
        reports?: number | null
        reviewsV2?: number | null
        itineraries?: number | null
      } | null
    } | null
    replyBoard?: {
      __typename?: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  } | null
}

export type GetReviewSpecificationQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetReviewSpecificationQuery = {
  __typename?: 'Query'
  reviewsSpecification?: {
    __typename?: 'ReviewSpecification'
    rating?: {
      __typename?: 'ReviewRatingSpecification'
      required?: boolean | null
      description?: Array<string> | null
    } | null
  } | null
}

export type GetReviewsCountQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetReviewsCountQuery = {
  __typename?: 'Query'
  reviewsCount: number
}

export const BaseReviewFragmentDoc = `
    fragment BaseReview on Review {
  id
  resourceId
  resourceType
  comment
  media
  rating
  visitDate
  recentTrip
  likesCount
  blinded
  reviewedAt
  user {
    unregister
    uid
    photo
    mileage {
      level
      point
      badges {
        label
        icon {
          image_url
        }
      }
    }
    name
    userBoard {
      trips
      reviews
      thanks
      reports
      reviewsV2
      itineraries
    }
  }
  replyBoard {
    id
    rootMessagesCount
    childMessagesCount
  }
  liked
}
    `
export const BaseReviewSpecificationFragmentDoc = `
    fragment BaseReviewSpecification on ReviewSpecification {
  rating {
    required
    description
  }
}
    `
export const LikeReviewDocument = `
    mutation LikeReview($reviewId: String!) {
  likeReview(reviewId: $reviewId) {
    id
  }
}
    `
export const useLikeReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LikeReviewMutation,
    TError,
    LikeReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    LikeReviewMutation,
    TError,
    LikeReviewMutationVariables,
    TContext
  >(
    ['LikeReview'],
    (variables?: LikeReviewMutationVariables) =>
      fetcher<LikeReviewMutation, LikeReviewMutationVariables>(
        client,
        LikeReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const UnlikeReviewDocument = `
    mutation UnlikeReview($reviewId: String!) {
  unlikeReview(reviewId: $reviewId)
}
    `
export const useUnlikeReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UnlikeReviewMutation,
    TError,
    UnlikeReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    UnlikeReviewMutation,
    TError,
    UnlikeReviewMutationVariables,
    TContext
  >(
    ['UnlikeReview'],
    (variables?: UnlikeReviewMutationVariables) =>
      fetcher<UnlikeReviewMutation, UnlikeReviewMutationVariables>(
        client,
        UnlikeReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const DeleteReviewDocument = `
    mutation DeleteReview($id: ID!) {
  deleteReview(id: $id)
}
    `
export const useDeleteReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteReviewMutation,
    TError,
    DeleteReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    DeleteReviewMutation,
    TError,
    DeleteReviewMutationVariables,
    TContext
  >(
    ['DeleteReview'],
    (variables?: DeleteReviewMutationVariables) =>
      fetcher<DeleteReviewMutation, DeleteReviewMutationVariables>(
        client,
        DeleteReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const GetPopularReviewsDocument = `
    query GetPopularReviews($resourceType: String!, $resourceId: String!, $recentTrip: Boolean, $from: Int, $size: Int) {
  popularReviews: getPopularReviews(
    resourceType: $resourceType
    resourceId: $resourceId
    recentTrip: $recentTrip
    from: $from
    size: $size
  ) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetPopularReviewsQuery = <
  TData = GetPopularReviewsQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetPopularReviewsQueryVariables,
  options?: UseQueryOptions<GetPopularReviewsQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetPopularReviewsQuery, TError, TData>(
    ['GetPopularReviews', variables],
    fetcher<GetPopularReviewsQuery, GetPopularReviewsQueryVariables>(
      client,
      GetPopularReviewsDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetLatestReviewsDocument = `
    query GetLatestReviews($resourceType: String!, $resourceId: String!, $recentTrip: Boolean, $from: Int, $size: Int) {
  latestReviews: getLatestReviews(
    resourceType: $resourceType
    resourceId: $resourceId
    recentTrip: $recentTrip
    from: $from
    size: $size
  ) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetLatestReviewsQuery = <
  TData = GetLatestReviewsQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetLatestReviewsQueryVariables,
  options?: UseQueryOptions<GetLatestReviewsQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetLatestReviewsQuery, TError, TData>(
    ['GetLatestReviews', variables],
    fetcher<GetLatestReviewsQuery, GetLatestReviewsQueryVariables>(
      client,
      GetLatestReviewsDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetMyReviewDocument = `
    query GetMyReview($resourceType: String!, $resourceId: String!) {
  myReview: getMyReview(resourceType: $resourceType, resourceId: $resourceId) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetMyReviewQuery = <TData = GetMyReviewQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetMyReviewQueryVariables,
  options?: UseQueryOptions<GetMyReviewQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetMyReviewQuery, TError, TData>(
    ['GetMyReview', variables],
    fetcher<GetMyReviewQuery, GetMyReviewQueryVariables>(
      client,
      GetMyReviewDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetReviewSpecificationDocument = `
    query GetReviewSpecification($resourceType: String!, $resourceId: String!) {
  reviewsSpecification: getReviewSpecification(
    resourceType: $resourceType
    resourceId: $resourceId
  ) {
    ...BaseReviewSpecification
  }
}
    ${BaseReviewSpecificationFragmentDoc}`
export const useGetReviewSpecificationQuery = <
  TData = GetReviewSpecificationQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetReviewSpecificationQueryVariables,
  options?: UseQueryOptions<GetReviewSpecificationQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetReviewSpecificationQuery, TError, TData>(
    ['GetReviewSpecification', variables],
    fetcher<GetReviewSpecificationQuery, GetReviewSpecificationQueryVariables>(
      client,
      GetReviewSpecificationDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetReviewsCountDocument = `
    query GetReviewsCount($resourceType: String!, $resourceId: String!) {
  reviewsCount: getReviewsCount(
    resourceType: $resourceType
    resourceId: $resourceId
  )
}
    `
export const useGetReviewsCountQuery = <
  TData = GetReviewsCountQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetReviewsCountQueryVariables,
  options?: UseQueryOptions<GetReviewsCountQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetReviewsCountQuery, TError, TData>(
    ['GetReviewsCount', variables],
    fetcher<GetReviewsCountQuery, GetReviewsCountQueryVariables>(
      client,
      GetReviewsCountDocument,
      variables,
      headers,
    ),
    options,
  )

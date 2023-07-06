import { DocumentNode } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata: Metadata;
  recommendedPosts: Array<Article>;
  reviewImage?: Maybe<Scalars['JSON']['output']>;
  reviewed?: Maybe<Scalars['Boolean']['output']>;
  scraped?: Maybe<Scalars['Boolean']['output']>;
  source: ArticleSource;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ArticleMetadata = {
  __typename?: 'ArticleMetadata';
  author?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  destinationTags?: Maybe<Array<Scalars['JSON']['output']>>;
  exposedAt?: Maybe<Scalars['DateTime']['output']>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  image?: Maybe<Scalars['JSON']['output']>;
  newsletter?: Maybe<Scalars['JSON']['output']>;
  notable?: Maybe<Scalars['Boolean']['output']>;
  ogImage?: Maybe<Scalars['JSON']['output']>;
  ogTitle?: Maybe<Scalars['String']['output']>;
  readableTimestamp?: Maybe<Scalars['String']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  recommendable?: Maybe<Scalars['Boolean']['output']>;
  relatedLinks?: Maybe<Array<Scalars['JSON']['output']>>;
  requireLogin?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['JSON']['output']>>;
  template: Scalars['JSON']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ArticleSource = {
  __typename?: 'ArticleSource';
  body: Array<Scalars['JSON']['output']>;
  header?: Maybe<Scalars['JSON']['output']>;
  metadata: ArticleMetadata;
};

export type City = {
  __typename?: 'City';
  country: Country;
  id: Scalars['ID']['output'];
  names: Names;
  region?: Maybe<Region>;
  representative?: Maybe<Scalars['Boolean']['output']>;
  zone?: Maybe<Zone>;
};

export type Content = {
  __typename?: 'Content';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['JSON']['output']>;
  regionId: Scalars['ID']['output'];
  reviewsCount: Scalars['Int']['output'];
  scrapsCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ScrapContentType;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID']['output'];
  names: Names;
};

export type CustomPoi = {
  __typename?: 'CustomPoi';
  customPoiHasCategory: Scalars['Boolean']['output'];
  region?: Maybe<Region>;
  source: CustomPoiSource;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CustomPoiAddress = {
  __typename?: 'CustomPoiAddress';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
};

export type CustomPoiGeoLocation = {
  __typename?: 'CustomPoiGeoLocation';
  coordinates?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CustomPoiNames = {
  __typename?: 'CustomPoiNames';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
};

export type CustomPoiSource = {
  __typename?: 'CustomPoiSource';
  addresses: CustomPoiAddress;
  geolocation: CustomPoiGeoLocation;
  names: CustomPoiNames;
  regionId?: Maybe<Scalars['ID']['output']>;
};

export type Destination = Region | Zone;

export type FeaturedDestinationsList = {
  __typename?: 'FeaturedDestinationsList';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  source: FeaturedDestinationsListSource;
  updatedAt: Scalars['DateTime']['output'];
};

export type FeaturedDestinationsListSource = {
  __typename?: 'FeaturedDestinationsListSource';
  destinations: Array<Destination>;
};

export type GeoMetadata = {
  __typename?: 'GeoMetadata';
  areas?: Maybe<Array<Scalars['JSON']['output']>>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  timeZone?: Maybe<Scalars['String']['output']>;
  vicinity?: Maybe<Scalars['String']['output']>;
};

export type Homeward = {
  __typename?: 'Homeward';
  restrictionArticle?: Maybe<Article>;
};

export type Message = {
  __typename?: 'Message';
  blindedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  parentMessage?: Maybe<Message>;
  payload: MessagePayload;
  room: Room;
  user: User;
};

export type MessageInput = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  payload: MessagePayloadInput;
  roomId: Scalars['ID']['input'];
};

export enum MessageOrderType {
  Asc = 'asc',
  Desc = 'desc'
}

export type MessagePayload = {
  __typename?: 'MessagePayload';
  images?: Maybe<Array<Scalars['JSON']['output']>>;
  message?: Maybe<Scalars['String']['output']>;
  type: MessagePayloadType;
};

export type MessagePayloadInput = {
  images?: InputMaybe<Array<Scalars['JSON']['input']>>;
  message?: InputMaybe<Scalars['String']['input']>;
  type: MessagePayloadType;
};

export enum MessagePayloadType {
  Image = 'image',
  Text = 'text'
}

export type Metadata = {
  __typename?: 'Metadata';
  hasTnaProducts?: Maybe<Scalars['Boolean']['output']>;
  reviewImagesCount?: Maybe<Scalars['Int']['output']>;
  reviewsCount?: Maybe<Scalars['Int']['output']>;
  reviewsRating?: Maybe<Scalars['Float']['output']>;
  scrapsCount?: Maybe<Scalars['Int']['output']>;
  structuredAddress?: Maybe<StructuredAddress>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteMessage: Message;
  deleteRecommendationImage: Poi;
  deleteReview: Scalars['Boolean']['output'];
  likeReview: ReviewReaction;
  sendMessage: Message;
  unlikeReview: Scalars['Boolean']['output'];
  uploadRecommendationImage: Poi;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRecommendationImageArgs = {
  poiId: Scalars['ID']['input'];
  recommendationId: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  message: MessageInput;
};


export type MutationUnlikeReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationUploadRecommendationImageArgs = {
  image: Scalars['JSON']['input'];
  poiId: Scalars['ID']['input'];
  recommendationId: Scalars['ID']['input'];
};

export type Names = {
  __typename?: 'Names';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['String']['output']>;
};

export type Poi = {
  __typename?: 'Poi';
  associatedArticles: Array<Article>;
  categories?: Maybe<Array<Scalars['JSON']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  equippingPois: Array<Poi>;
  geoMetadata: GeoMetadata;
  id: Scalars['ID']['output'];
  metadata: Metadata;
  readableSpecialHours?: Maybe<Array<Scalars['JSON']['output']>>;
  region?: Maybe<Region>;
  regions: Array<Region>;
  relationshipCounts: Scalars['JSON']['output'];
  restaurantRecommendations?: Maybe<Array<Scalars['JSON']['output']>>;
  reviewImage?: Maybe<Scalars['JSON']['output']>;
  reviewed?: Maybe<Scalars['Boolean']['output']>;
  scraped?: Maybe<Scalars['Boolean']['output']>;
  source: PoiSource;
  starRating?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PoiSource = {
  __typename?: 'PoiSource';
  addresses: Scalars['JSON']['output'];
  areas: Array<Scalars['JSON']['output']>;
  businessHourComment?: Maybe<Scalars['String']['output']>;
  businessHours?: Maybe<Array<Scalars['JSON']['output']>>;
  businessHoursState?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Scalars['JSON']['output']>>;
  clusterId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  directions?: Maybe<Scalars['String']['output']>;
  dishTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  estimatedDuration?: Maybe<Scalars['String']['output']>;
  exposedAt?: Maybe<Scalars['DateTime']['output']>;
  externalLinks: Array<Scalars['JSON']['output']>;
  extraContent: Array<Scalars['JSON']['output']>;
  extraProperties?: Maybe<Array<Scalars['JSON']['output']>>;
  featuredContent: Array<Scalars['JSON']['output']>;
  featuredContentMetadata?: Maybe<Scalars['JSON']['output']>;
  fee?: Maybe<Scalars['Boolean']['output']>;
  feeComment?: Maybe<Scalars['String']['output']>;
  foreignEntities: Array<Scalars['JSON']['output']>;
  geofence?: Maybe<Scalars['JSON']['output']>;
  geolocation?: Maybe<Scalars['JSON']['output']>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  grade?: Maybe<Scalars['Int']['output']>;
  hiddenAt?: Maybe<Scalars['DateTime']['output']>;
  image?: Maybe<Scalars['JSON']['output']>;
  images?: Maybe<Array<Scalars['JSON']['output']>>;
  keywords: Array<Scalars['String']['output']>;
  menus?: Maybe<Array<Scalars['JSON']['output']>>;
  names: Scalars['JSON']['output'];
  officialSiteUrl?: Maybe<Scalars['String']['output']>;
  permanentlyClosedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  readableBusinessHours?: Maybe<Array<Scalars['JSON']['output']>>;
  readableSpecialHours?: Maybe<Array<Scalars['JSON']['output']>>;
  recommendations?: Maybe<Array<Scalars['JSON']['output']>>;
  regionId?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Array<Scalars['String']['output']>>;
  resourceRelationships?: Maybe<Scalars['JSON']['output']>;
  starRating?: Maybe<Scalars['Int']['output']>;
  synonyms: Array<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['JSON']['output']>>;
  timeZone?: Maybe<Scalars['String']['output']>;
  tips?: Maybe<Array<Scalars['String']['output']>>;
  vicinity?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAnnouncements: Array<Article>;
  getArticle?: Maybe<Article>;
  getCountry?: Maybe<Country>;
  getFeaturedDestinationsList?: Maybe<FeaturedDestinationsList>;
  getGuides: Array<Article>;
  getHomewardRestriction: Homeward;
  getLatestReviews: Array<Review>;
  getMessage: Message;
  getMessages: Array<Message>;
  getMyReview?: Maybe<Review>;
  getNewsletters: Array<Article>;
  getNextNewsletter?: Maybe<Article>;
  getPoi?: Maybe<Poi>;
  getPois?: Maybe<Array<Poi>>;
  getPopularReviews: Array<Review>;
  getPosts: Array<Article>;
  getPrevNewsletter?: Maybe<Article>;
  getRegion?: Maybe<Region>;
  getRegionCategories: Array<RegionCategory>;
  getRegionCategory?: Maybe<RegionCategory>;
  getRegionRestrictions: Array<Region>;
  getRegionsByIds: Array<Region>;
  getReviewSpecification?: Maybe<ReviewSpecification>;
  getReviewsCount: Scalars['Int']['output'];
  getRoom: Room;
  getScraps: Array<Scrap>;
  getTripPlans: Array<Array<TripPlan>>;
  getZone?: Maybe<Zone>;
  mgetArticles: Array<Article>;
  mgetCountries: Array<Country>;
  mgetMessages: Array<Message>;
  mgetPois: Array<Poi>;
  mgetRegionCategories: Array<RegionCategory>;
  mgetRegions: Array<Region>;
  mgetReplyBoards: Array<ReplyBoard>;
  mgetReviewedArticles: Array<Article>;
  mgetReviewedPois: Array<Poi>;
  mgetReviews: Array<Review>;
  mgetRooms: Array<Room>;
  mgetScrapedArticles?: Maybe<Array<Article>>;
  mgetScrapedPois: Array<Poi>;
  mgetScrapedTna: Array<TnaProduct>;
  mgetUsersByFbIds: Array<User>;
  mgetZones: Array<Zone>;
  searchCities: Array<City>;
};


export type QueryGetAnnouncementsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  sinceId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFeaturedDestinationsListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGuidesArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLatestReviewsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMessagesArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MessageOrderType>;
  roomId: Scalars['String']['input'];
  sinceId?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  untilId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetMyReviewArgs = {
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};


export type QueryGetNewslettersArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNextNewsletterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPoiArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPoisArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  geotags?: InputMaybe<Array<Scalars['JSON']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  regionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetPopularReviewsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPostsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  sinceId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPrevNewsletterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRegionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRegionCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRegionsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryGetReviewSpecificationArgs = {
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};


export type QueryGetReviewsCountArgs = {
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};


export type QueryGetRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetScrapsArgs = {
  pageIdx?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  region?: InputMaybe<Scalars['ID']['input']>;
  regionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  types?: InputMaybe<Array<ScrapContentType>>;
  zone?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetTripPlansArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetZoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMgetArticlesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetCountriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetMessagesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetPoisArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetRegionCategoriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetRegionsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetReplyBoardsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryMgetReviewedArticlesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetReviewedPoisArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetReviewsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetRoomsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapedArticlesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapedPoisArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapedTnaArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetUsersByFbIdsArgs = {
  fbIds: Array<Scalars['String']['input']>;
};


export type QueryMgetZonesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QuerySearchCitiesArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type Region = {
  __typename?: 'Region';
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  promo?: Maybe<Scalars['String']['output']>;
  regionCategory?: Maybe<RegionCategory>;
  regionCategoryId?: Maybe<Scalars['String']['output']>;
  restrictionArticle?: Maybe<Article>;
  restrictionState?: Maybe<Scalars['String']['output']>;
  source: RegionSource;
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zoneIds: Array<Scalars['String']['output']>;
  zones: Array<Zone>;
};

export type RegionCategory = {
  __typename?: 'RegionCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  regions: Array<Region>;
  updatedAt: Scalars['DateTime']['output'];
};


export type RegionCategoryRegionsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type RegionSource = {
  __typename?: 'RegionSource';
  attractionAreas: Array<Scalars['JSON']['output']>;
  attractionCategories: Array<Scalars['JSON']['output']>;
  attractionFilters: Array<Scalars['JSON']['output']>;
  attractionGeotags?: Maybe<Array<Scalars['JSON']['output']>>;
  countryCode?: Maybe<Scalars['String']['output']>;
  currencies: Array<Scalars['String']['output']>;
  defaultRange?: Maybe<Scalars['Int']['output']>;
  featuredNames: Array<Scalars['String']['output']>;
  flightHours?: Maybe<Scalars['Int']['output']>;
  geofence?: Maybe<Scalars['JSON']['output']>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  guideTags: Array<Scalars['JSON']['output']>;
  hotelAreas: Array<Scalars['JSON']['output']>;
  hotelTags: Array<Scalars['JSON']['output']>;
  languages: Array<Scalars['String']['output']>;
  media: Scalars['JSON']['output'];
  menu: Scalars['JSON']['output'];
  names: Scalars['JSON']['output'];
  popularKeywords: Array<Scalars['String']['output']>;
  ranges?: Maybe<Array<Scalars['Int']['output']>>;
  restaurantAreas: Array<Scalars['JSON']['output']>;
  restaurantCategories: Array<Scalars['JSON']['output']>;
  restaurantClustering?: Maybe<Scalars['Boolean']['output']>;
  restaurantFilters: Array<Scalars['JSON']['output']>;
  restaurantGeotags?: Maybe<Array<Scalars['JSON']['output']>>;
  stale?: Maybe<Scalars['JSON']['output']>;
  terminals: Array<Scalars['JSON']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
  weatherSpots: Array<Scalars['JSON']['output']>;
};

export type ReplyBoard = {
  __typename?: 'ReplyBoard';
  childMessagesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  pinnedMessages: Array<ReplyMessage>;
  pinnedMessagesCount: Scalars['Int']['output'];
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  rootMessagesCount: Scalars['Int']['output'];
};

export type ReplyMessage = {
  __typename?: 'ReplyMessage';
  children?: Maybe<Array<ReplyMessage>>;
  content: ReplyMessageContent;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  writer?: Maybe<ReplyUser>;
};

export type ReplyMessageContent = {
  __typename?: 'ReplyMessageContent';
  markdownText?: Maybe<Scalars['String']['output']>;
  mentionedUser?: Maybe<ReplyUser>;
  text?: Maybe<Scalars['String']['output']>;
};

export type ReplyUser = {
  __typename?: 'ReplyUser';
  href?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type Review = {
  __typename?: 'Review';
  blinded?: Maybe<Scalars['Boolean']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  geotags: Array<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  liked: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
  media?: Maybe<Array<Scalars['JSON']['output']>>;
  rating?: Maybe<Scalars['Int']['output']>;
  recentTrip: Scalars['Boolean']['output'];
  regionId?: Maybe<Scalars['String']['output']>;
  replyBoard?: Maybe<ReplyBoard>;
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  reviewedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  visitDate?: Maybe<Scalars['String']['output']>;
};

export type ReviewCommentSpecification = {
  __typename?: 'ReviewCommentSpecification';
  maxLength: Scalars['Int']['output'];
  placeholder: Scalars['String']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewMediaSpecification = {
  __typename?: 'ReviewMediaSpecification';
  maxCount: Scalars['Int']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewRatingSpecification = {
  __typename?: 'ReviewRatingSpecification';
  description?: Maybe<Array<Scalars['String']['output']>>;
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewReaction = {
  __typename?: 'ReviewReaction';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  review: Review;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type ReviewSpecification = {
  __typename?: 'ReviewSpecification';
  comment: ReviewCommentSpecification;
  media: ReviewMediaSpecification;
  rating?: Maybe<ReviewRatingSpecification>;
};

export type Room = {
  __typename?: 'Room';
  geotag: RoomGeotag;
  id: Scalars['ID']['output'];
  lastMessage?: Maybe<Message>;
  title: Scalars['String']['output'];
  travelingUsers?: Maybe<TravelingUsers>;
};

export type RoomGeotag = {
  __typename?: 'RoomGeotag';
  id: Scalars['ID']['output'];
  names: Scalars['JSON']['output'];
  type: Scalars['String']['output'];
};

export type Scrap = {
  __typename?: 'Scrap';
  comment?: Maybe<Scalars['String']['output']>;
  content: Content;
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum ScrapContentType {
  ArticlesArticle = 'ARTICLES_ARTICLE',
  PoisAttraction = 'POIS_ATTRACTION',
  PoisHotel = 'POIS_HOTEL',
  PoisRestaurant = 'POIS_RESTAURANT',
  Tna = 'TNA'
}

export type StructuredAddress = {
  __typename?: 'StructuredAddress';
  addressCountry?: Maybe<Scalars['String']['output']>;
  addressLocality?: Maybe<Scalars['String']['output']>;
  addressRegion?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
};

export type TnaProduct = {
  __typename?: 'TnaProduct';
  id: Scalars['ID']['output'];
  scraped?: Maybe<Scalars['Boolean']['output']>;
};

export type TravelingUsers = {
  __typename?: 'TravelingUsers';
  count: Scalars['Int']['output'];
  recordedAt: Scalars['DateTime']['output'];
};

export type TripFlightInformation = {
  __typename?: 'TripFlightInformation';
  airport?: Maybe<TripFlightScheduleAirport>;
  schedule?: Maybe<Scalars['String']['output']>;
  scheduleDate?: Maybe<Scalars['String']['output']>;
  scheduleTime?: Maybe<Scalars['String']['output']>;
  terminal?: Maybe<Scalars['String']['output']>;
};

export type TripFlightSchedule = {
  __typename?: 'TripFlightSchedule';
  airline: TripFlightScheduleAirline;
  arrival: TripFlightInformation;
  attachments?: Maybe<Array<TripFlightScheduleAttachment>>;
  departure: TripFlightInformation;
  departureDate: Scalars['String']['output'];
  flightDuration: Scalars['String']['output'];
  flightName: Scalars['String']['output'];
  flightNumber: Scalars['String']['output'];
  flightScheduleId: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  operatingAirline?: Maybe<TripFlightScheduleAirline>;
  operatingFlight?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  tripId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type TripFlightScheduleAirline = {
  __typename?: 'TripFlightScheduleAirline';
  iata: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nameEn: Scalars['String']['output'];
  nameKo: Scalars['String']['output'];
};

export type TripFlightScheduleAirport = {
  __typename?: 'TripFlightScheduleAirport';
  airport: Scalars['String']['output'];
  cityNameEn?: Maybe<Scalars['String']['output']>;
  cityNameKo?: Maybe<Scalars['String']['output']>;
  iata: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  nameEn?: Maybe<Scalars['String']['output']>;
  nameKo?: Maybe<Scalars['String']['output']>;
  poiId?: Maybe<Scalars['String']['output']>;
};

export type TripFlightScheduleAttachment = {
  __typename?: 'TripFlightScheduleAttachment';
  format: Scalars['String']['output'];
  fullImage: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  largeThumbnail: Scalars['String']['output'];
  name: Scalars['String']['output'];
  smallThumbnail: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type TripLodgingBookingInfo = {
  __typename?: 'TripLodgingBookingInfo';
  bookingId?: Maybe<Scalars['ID']['output']>;
  checkIn?: Maybe<Scalars['String']['output']>;
  checkOut?: Maybe<Scalars['String']['output']>;
};

export type TripPlan = {
  __typename?: 'TripPlan';
  createdAt: Scalars['String']['output'];
  customPoi?: Maybe<CustomPoi>;
  day: Scalars['Int']['output'];
  flightSchedule?: Maybe<TripFlightSchedule>;
  id: Scalars['ID']['output'];
  lodgingBooking?: Maybe<TripLodgingBookingInfo>;
  memo?: Maybe<Scalars['String']['output']>;
  poi?: Maybe<Poi>;
  time?: Maybe<Scalars['String']['output']>;
  tnaProduct?: Maybe<TripTnaProduct>;
  type: Scalars['String']['output'];
};

export type TripTnaArea = {
  __typename?: 'TripTnaArea';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
};

export type TripTnaCategory = {
  __typename?: 'TripTnaCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TripTnaGeotag = {
  __typename?: 'TripTnaGeotag';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type TripTnaLocation = {
  __typename?: 'TripTnaLocation';
  address: Scalars['String']['output'];
  geotags?: Maybe<Array<TripTnaGeotag>>;
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  representative: Scalars['Boolean']['output'];
};

export type TripTnaProduct = {
  __typename?: 'TripTnaProduct';
  areas?: Maybe<Array<TripTnaArea>>;
  basePrice?: Maybe<Scalars['Float']['output']>;
  bookingId?: Maybe<Scalars['ID']['output']>;
  categories?: Maybe<Array<TripTnaCategory>>;
  displayName?: Maybe<Scalars['String']['output']>;
  heroImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locations?: Maybe<Array<TripTnaLocation>>;
  priority?: Maybe<Scalars['Float']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  promotions?: Maybe<Array<TripTnaPromotion>>;
  regions?: Maybe<Array<Scalars['String']['output']>>;
  reviewsCount?: Maybe<Scalars['Float']['output']>;
  reviewsRating?: Maybe<Scalars['Int']['output']>;
  scrapsCount?: Maybe<Scalars['Float']['output']>;
  shortTitle: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TripTnaPromotion = {
  __typename?: 'TripTnaPromotion';
  id: Scalars['ID']['output'];
  numOfProducts?: Maybe<Scalars['Int']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  mileage?: Maybe<UserMileage>;
  name?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  unfriended: Scalars['Boolean']['output'];
  unregister?: Maybe<Scalars['Boolean']['output']>;
  unregistered?: Maybe<Scalars['Boolean']['output']>;
  userBoard?: Maybe<UserBoard>;
};

export type UserBoard = {
  __typename?: 'UserBoard';
  itineraries?: Maybe<Scalars['Int']['output']>;
  reports?: Maybe<Scalars['Int']['output']>;
  reviews?: Maybe<Scalars['Int']['output']>;
  reviewsV2?: Maybe<Scalars['Int']['output']>;
  thanks?: Maybe<Scalars['Int']['output']>;
  trips?: Maybe<Scalars['Int']['output']>;
};

export type UserMileage = {
  __typename?: 'UserMileage';
  badges?: Maybe<Array<Maybe<UserMileageBadge>>>;
  level?: Maybe<Scalars['Int']['output']>;
  point?: Maybe<Scalars['Int']['output']>;
};

export type UserMileageBadge = {
  __typename?: 'UserMileageBadge';
  icon?: Maybe<UserMileageIcon>;
  label?: Maybe<Scalars['String']['output']>;
};

export type UserMileageIcon = {
  __typename?: 'UserMileageIcon';
  image_url?: Maybe<Scalars['String']['output']>;
};

export type Zone = {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  regions: Array<Region>;
  source: ZoneSource;
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ZoneSource = {
  __typename?: 'ZoneSource';
  attractionCategories: Array<Scalars['JSON']['output']>;
  attractionFilters: Array<Scalars['JSON']['output']>;
  attractionGeotags?: Maybe<Array<Scalars['JSON']['output']>>;
  countryCode?: Maybe<Scalars['String']['output']>;
  currencies: Array<Scalars['String']['output']>;
  defaultRange?: Maybe<Scalars['Int']['output']>;
  featuredNames: Array<Scalars['String']['output']>;
  flightHours?: Maybe<Scalars['Int']['output']>;
  geofence?: Maybe<Scalars['JSON']['output']>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  guideTags: Array<Scalars['JSON']['output']>;
  languages: Array<Scalars['String']['output']>;
  media: Scalars['JSON']['output'];
  menu: Scalars['JSON']['output'];
  names: Scalars['JSON']['output'];
  popularKeywords: Array<Scalars['String']['output']>;
  ranges?: Maybe<Array<Scalars['Int']['output']>>;
  regionIds: Array<Scalars['String']['output']>;
  restaurantCategories: Array<Scalars['JSON']['output']>;
  restaurantClustering?: Maybe<Scalars['Boolean']['output']>;
  restaurantFilters: Array<Scalars['JSON']['output']>;
  restaurantGeotags?: Maybe<Array<Scalars['JSON']['output']>>;
  terminals: Array<Scalars['JSON']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
};

export type LikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input'];
}>;


export type LikeReviewMutation = { __typename?: 'Mutation', likeReview: { __typename?: 'ReviewReaction', id: string } };

export type UnlikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input'];
}>;


export type UnlikeReviewMutation = { __typename?: 'Mutation', unlikeReview: boolean };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type BaseReviewFragment = { __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null };

export type BaseUserFragment = { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null };

export type BasePinnedMessageFragment = { __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null };

export type BaseReviewSpecificationFragment = { __typename?: 'ReviewSpecification', rating?: { __typename?: 'ReviewRatingSpecification', required?: boolean | null, description?: Array<string> | null } | null };

export type GetPopularReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPopularReviewsQuery = { __typename?: 'Query', popularReviews: Array<{ __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null }> };

export type GetLatestReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLatestReviewsQuery = { __typename?: 'Query', latestReviews: Array<{ __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null }> };

export type GetMyReviewQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
}>;


export type GetMyReviewQuery = { __typename?: 'Query', myReview?: { __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null } | null };

export type GetReviewSpecificationQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
}>;


export type GetReviewSpecificationQuery = { __typename?: 'Query', reviewsSpecification?: { __typename?: 'ReviewSpecification', rating?: { __typename?: 'ReviewRatingSpecification', required?: boolean | null, description?: Array<string> | null } | null } | null };

export type GetReviewsCountQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetReviewsCountQuery = { __typename?: 'Query', reviewsCount: number };

export const BaseUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}}]} as unknown as DocumentNode;
export const BasePinnedMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const BaseReviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const BaseReviewSpecificationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReviewSpecification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewSpecification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode;
export const LikeReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export const UnlikeReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}}}]}]}}]} as unknown as DocumentNode;
export const DeleteReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export const GetPopularReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPopularReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"popularReviews"},"name":{"kind":"Name","value":"getPopularReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetLatestReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatestReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"latestReviews"},"name":{"kind":"Name","value":"getLatestReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetMyReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"myReview"},"name":{"kind":"Name","value":"getMyReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetReviewSpecificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewSpecification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reviewsSpecification"},"name":{"kind":"Name","value":"getReviewSpecification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReviewSpecification"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReviewSpecification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewSpecification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode;
export const GetReviewsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reviewsCount"},"name":{"kind":"Name","value":"getReviewsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}}]}]}}]} as unknown as DocumentNode;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    LikeReview(variables: LikeReviewMutationVariables, options?: C): Promise<LikeReviewMutation> {
      return requester<LikeReviewMutation, LikeReviewMutationVariables>(LikeReviewDocument, variables, options) as Promise<LikeReviewMutation>;
    },
    UnlikeReview(variables: UnlikeReviewMutationVariables, options?: C): Promise<UnlikeReviewMutation> {
      return requester<UnlikeReviewMutation, UnlikeReviewMutationVariables>(UnlikeReviewDocument, variables, options) as Promise<UnlikeReviewMutation>;
    },
    DeleteReview(variables: DeleteReviewMutationVariables, options?: C): Promise<DeleteReviewMutation> {
      return requester<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, variables, options) as Promise<DeleteReviewMutation>;
    },
    GetPopularReviews(variables: GetPopularReviewsQueryVariables, options?: C): Promise<GetPopularReviewsQuery> {
      return requester<GetPopularReviewsQuery, GetPopularReviewsQueryVariables>(GetPopularReviewsDocument, variables, options) as Promise<GetPopularReviewsQuery>;
    },
    GetLatestReviews(variables: GetLatestReviewsQueryVariables, options?: C): Promise<GetLatestReviewsQuery> {
      return requester<GetLatestReviewsQuery, GetLatestReviewsQueryVariables>(GetLatestReviewsDocument, variables, options) as Promise<GetLatestReviewsQuery>;
    },
    GetMyReview(variables: GetMyReviewQueryVariables, options?: C): Promise<GetMyReviewQuery> {
      return requester<GetMyReviewQuery, GetMyReviewQueryVariables>(GetMyReviewDocument, variables, options) as Promise<GetMyReviewQuery>;
    },
    GetReviewSpecification(variables: GetReviewSpecificationQueryVariables, options?: C): Promise<GetReviewSpecificationQuery> {
      return requester<GetReviewSpecificationQuery, GetReviewSpecificationQueryVariables>(GetReviewSpecificationDocument, variables, options) as Promise<GetReviewSpecificationQuery>;
    },
    GetReviewsCount(variables: GetReviewsCountQueryVariables, options?: C): Promise<GetReviewsCountQuery> {
      return requester<GetReviewsCountQuery, GetReviewsCountQueryVariables>(GetReviewsCountDocument, variables, options) as Promise<GetReviewsCountQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
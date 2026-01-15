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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Long: { input: any; output: any; }
};

/** 가계부 */
export type AccountBook = {
  __typename?: 'AccountBook';
  /** 일행 User 목록 */
  companionUsers: Array<AccountBookUser>;
  /** 가계부 통화 목록 */
  currencies: Array<AccountBookCurrency>;
  /** 가계부 지출 목록 */
  expenses: Array<AccountBookExpense>;
  /** 통화별 총 지출 정보 */
  totalAmounts: Array<AccountBookTotalAmountSummary>;
  /** 여행 정보 */
  trip: GeneralTrip;
};

/** 가계부 통화 정보 */
export type AccountBookCurrency = {
  __typename?: 'AccountBookCurrency';
  /** 통화 코드 */
  code: Scalars['String']['output'];
  /** 국가 */
  country: Scalars['String']['output'];
  /** 통화 환율 */
  exchangeRate: Scalars['Float']['output'];
  /** 통화 이름 */
  name: Scalars['String']['output'];
  /** 통화 기호 */
  symbol: Scalars['String']['output'];
  /** 통화 단위 */
  unitAmount: Scalars['Int']['output'];
};

/** 가계부 지출 */
export type AccountBookExpense = {
  __typename?: 'AccountBookExpense';
  /** 지출 금액 */
  amount: Scalars['Float']['output'];
  /** 지출 카테고리 */
  category: AccountBookExpenseCategory;
  /** 일행 유저 ID 목록 */
  companionUsers: Array<AccountBookUser>;
  /** 지출 장소 */
  content?: Maybe<AccountBookExpenseContent>;
  /** 생성일 */
  createdAt: Scalars['DateTime']['output'];
  /** 지출 통화 */
  currency: AccountBookCurrency;
  /** 지출일 */
  day: Scalars['Int']['output'];
  /** 삭제일 */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 지출 번호 */
  expenseNumber: Scalars['String']['output'];
  /** 지출 ID */
  id: Scalars['ID']['output'];
  /** 개인 지출 여부 */
  isPersonal: Scalars['Boolean']['output'];
  /** 첨부파일 목록 */
  medias: Array<Media>;
  /** 지출 순서 */
  order: Scalars['Int']['output'];
  /** 결제자 유저 ID 목록 */
  payerUsers: Array<AccountBookUser>;
  /** 지출 방식 */
  paymentMethod: AccountBookExpensePaymentMethod;
  /** 지출명 */
  title: Scalars['String']['output'];
  /** 여행 ID */
  tripId: Scalars['ID']['output'];
  /** 수정일 */
  updatedAt: Scalars['DateTime']['output'];
  /** 유저 ID */
  userId: Scalars['ID']['output'];
};

/** 가계부 카테고리 */
export const AccountBookExpenseCategory = {
  /** 기타 */
  ETC: 'ETC',
  /** 항공 */
  FLIGHT: 'FLIGHT',
  /** 식사 */
  FOOD: 'FOOD',
  /** 숙소 */
  HOTEL: 'HOTEL',
  /** 관광 */
  SHOPPING: 'SHOPPING',
  /** 대중교통 */
  SIGHTSEEING: 'SIGHTSEEING',
  /** 기차 */
  VEHICLE: 'VEHICLE'
} as const;

export type AccountBookExpenseCategory = typeof AccountBookExpenseCategory[keyof typeof AccountBookExpenseCategory];
/** 가계부 지출 카테고리 요약 목록 */
export type AccountBookExpenseCategorySummaries = {
  __typename?: 'AccountBookExpenseCategorySummaries';
  /** 지출 카테고리 요약 목록 */
  categorySummaries: Array<AccountBookExpenseCategorySummary>;
  /** 총 지출 금액 */
  totalAmount: Scalars['Float']['output'];
};

/** 가계부 지출 카테고리 요약 */
export type AccountBookExpenseCategorySummary = {
  __typename?: 'AccountBookExpenseCategorySummary';
  /** 지출 금액 */
  amount: Scalars['Float']['output'];
  /** 카테고리 */
  category: AccountBookExpenseCategory;
  /** 지출 비율 */
  ratio: Scalars['Float']['output'];
};

export type AccountBookExpenseContent = {
  __typename?: 'AccountBookExpenseContent';
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** 가계부 컨텐츠 입력 */
export type AccountBookExpenseContentInput = {
  /** 컨텐츠 ID */
  id: Scalars['ID']['input'];
  /** 컨텐츠 위치 */
  location?: InputMaybe<Scalars['String']['input']>;
  /** 컨텐츠 타입 */
  type: Scalars['String']['input'];
};

/** 가계부 지출 목록 */
export type AccountBookExpenseList = {
  __typename?: 'AccountBookExpenseList';
  /** 가계부 지출 목록 */
  items: Array<AccountBookExpense>;
  /** 총 목록 수 */
  totalCount: Scalars['Int']['output'];
};

/** 가계부 지출 목록 정렬 */
export const AccountBookExpenseOrder = {
  DAY_ORDER_ASC: 'DAY_ORDER_ASC',
  DAY_ORDER_DESC: 'DAY_ORDER_DESC',
  ID_ASC: 'ID_ASC',
  ID_DESC: 'ID_DESC'
} as const;

export type AccountBookExpenseOrder = typeof AccountBookExpenseOrder[keyof typeof AccountBookExpenseOrder];
export const AccountBookExpensePaymentMethod = {
  /** 카드 */
  CARD: 'CARD',
  /** 현금 */
  CASH: 'CASH'
} as const;

export type AccountBookExpensePaymentMethod = typeof AccountBookExpensePaymentMethod[keyof typeof AccountBookExpensePaymentMethod];
/** 가계부 정산 */
export type AccountBookSettlement = {
  __typename?: 'AccountBookSettlement';
  /** 총 지출 금액 */
  expenseAmount: Scalars['Float']['output'];
  /** 총 결제 금액 */
  paymentAmount: Scalars['Float']['output'];
  /** 유저 ID */
  user: AccountBookUser;
};

/** 가계부 정산 요약 */
export type AccountBookSettlementSummary = {
  __typename?: 'AccountBookSettlementSummary';
  /** 유저별 정산 목록 */
  settlements: Array<AccountBookSettlement>;
  /** 정산 송금 목록 */
  transfers: Array<AccountBookSettlementTransfer>;
};

/** 가계부 정산 송금 */
export type AccountBookSettlementTransfer = {
  __typename?: 'AccountBookSettlementTransfer';
  /** 송금 금액 */
  amount: Scalars['Float']['output'];
  /** 송금하는 유저 ID */
  fromUser: AccountBookUser;
  /** 송금받는 유저 ID */
  toUser: AccountBookUser;
};

/** 가계부 총 지출 요약 */
export type AccountBookTotalAmountSummary = {
  __typename?: 'AccountBookTotalAmountSummary';
  /** 지출 금액 */
  amount: Scalars['Float']['output'];
  /** 지출 통화 */
  currency: Currency;
};

/** 가계부 유저 */
export type AccountBookUser = {
  __typename?: 'AccountBookUser';
  /** 유저 타입 */
  type: AccountBookUserType;
  /** 유저 ID */
  userId: Scalars['ID']['output'];
};

/** 가계부 유저 입력 */
export type AccountBookUserInput = {
  /** 유저 타입 */
  type: AccountBookUserType;
  /** 유저 ID */
  userId: Scalars['ID']['input'];
};

/** 가계부 유저 타입 */
export const AccountBookUserType = {
  /** 일반 회원 유저 */
  NORMAL_USER: 'NORMAL_USER',
  /** 가계부 가상 유저 */
  VIRTUAL_USER: 'VIRTUAL_USER'
} as const;

export type AccountBookUserType = typeof AccountBookUserType[keyof typeof AccountBookUserType];
/** 가계부 가상 유저 */
export type AccountBookVirtualUser = {
  __typename?: 'AccountBookVirtualUser';
  /** 가상 유저 ID */
  id: Scalars['ID']['output'];
  /** 사진 URL */
  imageUrl: Scalars['String']['output'];
  /** 삭제 여부 */
  isDeleted: Scalars['Boolean']['output'];
  /** 유저명 */
  name: Scalars['String']['output'];
};

/** 가계부 통화 추가 입력 */
export type AddAccountBookCurrencyInput = {
  /** 통화 코드 */
  currencyCode: Scalars['String']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/** 항공사 */
export type Airline = {
  __typename?: 'Airline';
  /** 항공사 IATA 코드 */
  iata: Scalars['String']['output'];
  /** 항공사 ID */
  id: Scalars['ID']['output'];
  /** 항공사 이름(영어) */
  nameEn: Scalars['String']['output'];
  /** 항공사 이름(한국어) */
  nameKo: Scalars['String']['output'];
};

/** 공항 */
export type Airport = {
  __typename?: 'Airport';
  /** 공항 이름 표기 */
  airportName?: Maybe<Scalars['String']['output']>;
  /** 도시 이름(영어) */
  cityNameEn?: Maybe<Scalars['String']['output']>;
  /** 도시 이름(한국어) */
  cityNameKo?: Maybe<Scalars['String']['output']>;
  /** 공항 IATA 코드 */
  iata: Scalars['String']['output'];
  /** 공항 ID */
  id: Scalars['ID']['output'];
  /** 공항 이름(영어) */
  nameEn?: Maybe<Scalars['String']['output']>;
  /** 공항 이름(한국어) */
  nameKo?: Maybe<Scalars['String']['output']>;
  /** 공항 POI ID */
  poiId?: Maybe<Scalars['String']['output']>;
  /** 공항 시간대 */
  timezone?: Maybe<Scalars['String']['output']>;
};

/** 여행 일정 삭제 및 순서 편집 입력 */
export type ArrangeTripPlanInput = {
  /**
   * 순서가 반영된 여행 일정의 day 목록
   * - orderIds와 매칭되어야 함
   */
  days?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 삭제 할 여행 일정 ID 목록 */
  deleteIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 순서가 반영된 여행 일정 ID 목록 */
  orderIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
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
  seoMetadata?: Maybe<ArticleSeoMetadata>;
  serviceMetadata?: Maybe<ArticleServiceMetadata>;
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

export type ArticleSeoMetadata = {
  __typename?: 'ArticleSeoMetadata';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ArticleServiceMetadata = {
  __typename?: 'ArticleServiceMetadata';
  id: Scalars['ID']['output'];
  review?: Maybe<ReviewMetadata>;
  scrap?: Maybe<ScrapMetadata>;
};

export type ArticleSource = {
  __typename?: 'ArticleSource';
  body: Array<Scalars['JSON']['output']>;
  header?: Maybe<Scalars['JSON']['output']>;
  metadata: ArticleMetadata;
};

/** 이미지 첨부파일 입력 */
export type AttachmentInput = {
  /** 첨부파일 크기 */
  bytes: Scalars['Int']['input'];
  /** 첨부파일 형식 - jpg, png 등 */
  format: Scalars['String']['input'];
  /** 높이 */
  height: Scalars['Int']['input'];
  /** 클라우디너리 ID */
  publicId: Scalars['String']['input'];
  /** 첨부파일 타입 - 이미지 */
  resourceType: Scalars['String']['input'];
  /** URL - HTTPS */
  secureUrl: Scalars['String']['input'];
  /** 클라우디너리 signature */
  signature: Scalars['String']['input'];
  /** URL */
  url: Scalars['String']['input'];
  /** 넓이 */
  width: Scalars['Int']['input'];
};

/** 관광지 검색 결과 */
export type AttractionSearchItem = ContentPoiSearchItem & {
  __typename?: 'AttractionSearchItem';
  /** 지역 목록 */
  areas?: Maybe<Array<Scalars['String']['output']>>;
  /** 카테고리 목록 */
  categories?: Maybe<Array<Scalars['String']['output']>>;
  comment?: Maybe<Scalars['String']['output']>;
  /** 위치 정보 태그 */
  geotags: Array<GeoTag>;
  /** 하이라이트 처리된 장소명 */
  highlight?: Maybe<Scalars['String']['output']>;
  /** POI ID */
  id: Scalars['ID']['output'];
  /** 위치(위도, 경도) */
  location: Array<Scalars['Float']['output']>;
  /** 미디어 정보 */
  media?: Maybe<Media>;
  /** 장소명 */
  name: Scalars['String']['output'];
  /** 컨텐츠 POI 타입 */
  type: ContentPoiSearchType;
  /** 근처 지역 */
  vicinity?: Maybe<Scalars['String']['output']>;
};

export type BannerContent = {
  __typename?: 'BannerContent';
  /** 앱 딥링크 */
  appLink?: Maybe<Scalars['String']['output']>;
  /** 아이콘 이미지 */
  iconImage?: Maybe<NoticeImage>;
  /** 메인 타이틀 */
  mainTitle: Scalars['String']['output'];
  /** 서브 타이틀 */
  subTitle?: Maybe<Scalars['String']['output']>;
  /** 배너 타입 (notice, event) */
  type: BannerType;
  /** 웹 링크 */
  webLink: Scalars['String']['output'];
};

export const BannerType = {
  /** 혜택 */
  EVENT: 'EVENT',
  /** 공지 */
  NOTICE: 'NOTICE'
} as const;

export type BannerType = typeof BannerType[keyof typeof BannerType];
export type CheckReviewAllowedActionInput = {
  id: Scalars['String']['input'];
  visitDate?: InputMaybe<Scalars['String']['input']>;
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

/** 컨텐츠 POI 검색 결과 */
export type ContentPoiSearchItem = {
  /** 지역 목록 */
  areas?: Maybe<Array<Scalars['String']['output']>>;
  /** 카테고리 목록 */
  categories?: Maybe<Array<Scalars['String']['output']>>;
  comment?: Maybe<Scalars['String']['output']>;
  /** 위치 정보 태그 */
  geotags: Array<GeoTag>;
  /** 하이라이트 처리된 장소명 */
  highlight?: Maybe<Scalars['String']['output']>;
  /** POI ID */
  id: Scalars['ID']['output'];
  /** 위치(위도, 경도) */
  location: Array<Scalars['Float']['output']>;
  /** 미디어 정보 */
  media?: Maybe<Media>;
  /** 장소명 */
  name: Scalars['String']['output'];
  /** 컨텐츠 POI 타입 */
  type: ContentPoiSearchType;
  /** 근처 지역 */
  vicinity?: Maybe<Scalars['String']['output']>;
};

/** 컨텐츠 POI 검색 목록 */
export type ContentPoiSearchItemList = {
  __typename?: 'ContentPoiSearchItemList';
  /** 검색 결과 목록 */
  items: Array<ContentPoiSearchItem>;
  /** 검색 결과 총 개수 */
  totalCount: Scalars['Int']['output'];
};

/** 컨텐츠 POI 검색 타입 */
export const ContentPoiSearchType = {
  /** 관광지 */
  ATTRACTION: 'ATTRACTION',
  /** 숙소 */
  HOTEL: 'HOTEL',
  /** 음식점 */
  RESTAURANT: 'RESTAURANT'
} as const;

export type ContentPoiSearchType = typeof ContentPoiSearchType[keyof typeof ContentPoiSearchType];
/** 컨텐츠 타입 */
export const ContentType = {
  ARTICLES_ARTICLE: 'ARTICLES_ARTICLE',
  EXTERNAL_LINK: 'EXTERNAL_LINK',
  MYHOTELS_MYHOTEL: 'MYHOTELS_MYHOTEL',
  POIS_ATTRACTION: 'POIS_ATTRACTION',
  POIS_HOTEL: 'POIS_HOTEL',
  POIS_MYHOTELS: 'POIS_MYHOTELS',
  POIS_RESTAURANT: 'POIS_RESTAURANT',
  TNA_PRODUCT: 'TNA_PRODUCT'
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];
export type CoordinatesArg = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

/** Coordinates */
export type CoordinatesInput = {
  /** 위도 */
  lat: Scalars['Float']['input'];
  /** 경도 */
  lon: Scalars['Float']['input'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID']['output'];
  names: Names;
};

/** 가계부 지출 입력 */
export type CreateAccountBookExpenseInput = {
  /** 결제 금액 */
  amount: Scalars['Float']['input'];
  /** 지출 카테고리 */
  category: AccountBookExpenseCategory;
  /** 지출 일행 유저 ID 목록 */
  companionUsers: Array<AccountBookUserInput>;
  /** 지출 컨텐츠 정보 */
  content?: InputMaybe<AccountBookExpenseContentInput>;
  /** 국가 코드 */
  currencyCode: Scalars['String']['input'];
  /** 결제일 */
  day: Scalars['Int']['input'];
  /** 환율 */
  exchangeRate: Scalars['Float']['input'];
  /** 개인 지출 여부 */
  isPersonal: Scalars['Boolean']['input'];
  /** 첨부 미디어 ID 목록 */
  mediaIds: Array<Scalars['ID']['input']>;
  /** 결제 유저 목록 */
  payerUsers: Array<AccountBookUserInput>;
  /** 결제 수단 */
  paymentMethod: AccountBookExpensePaymentMethod;
  /** 지출 제목 */
  title: Scalars['String']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/** 가계부 가상 유저 생성 입력 */
export type CreateAccountBookVirtualUserInput = {
  /** 유저명 */
  name: Scalars['String']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/**
 * 여행 일정 입력
 * - 여러 일차에 대한 일정 생성
 */
export type CreatePlansForMultipleDaysInput = {
  /** 여행 일차 목록 */
  days: Array<Scalars['Int']['input']>;
  /** 여행 일정 */
  plan: TripPlanInput;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type CreateTripInput = {
  endDate: Scalars['String']['input'];
  geotags: Array<InputMaybe<GeotagInput>>;
  startDate: Scalars['String']['input'];
  timezone?: InputMaybe<Scalars['String']['input']>;
  tripTitle?: InputMaybe<Scalars['String']['input']>;
};

/** 여행 일정 입력 */
export type CreateTripPlansInput = {
  /** 여행 일차 */
  day: Scalars['Int']['input'];
  /** 여행 일정 목록 */
  plans: Array<TripPlanInput>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/** 통화 */
export type Currency = {
  __typename?: 'Currency';
  /** 통화 코드 */
  code: Scalars['String']['output'];
  /** 국가 */
  country: Scalars['String']['output'];
  /** 통화 이름 */
  name: Scalars['String']['output'];
  /** 통화 기호 */
  symbol: Scalars['String']['output'];
  /** 통화 단위 */
  unitAmount: Scalars['Int']['output'];
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

/** 가계부 지출 삭제 입력 */
export type DeleteAccountBookExpenseInput = {
  /** 가계부 지출 ID */
  id: Scalars['ID']['input'];
};

/** 가계부 가상 유저 삭제 입력 */
export type DeleteAccountBookVirtualUserInput = {
  /** 가상 유저 ID */
  id: Scalars['ID']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type DeleteTripInput = {
  id: Scalars['ID']['input'];
};

/** 여행 일정 단건 삭제 입력 */
export type DeleteTripPlanInput = {
  /** 여행 일정 ID */
  id: Scalars['ID']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/** 여행 일정 다건 삭제 입력 */
export type DeleteTripPlansInput = {
  /** 여행 일정 ID 목록 */
  ids: Array<Scalars['ID']['input']>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type Destination = Region | Zone;

/** External Link(PDP) */
export type ExternalLinkInfo = {
  __typename?: 'ExternalLinkInfo';
  /** 카테고리 */
  category?: Maybe<Scalars['String']['output']>;
  /** 국내 상품 여부 */
  isDomestic: Scalars['Boolean']['output'];
  /** PDP 주소 */
  link: Scalars['String']['output'];
  /** 위치 좌표 */
  point?: Maybe<Point>;
  /** 상품 ID */
  propertyId: Scalars['String']['output'];
  /** thumbnail url */
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  /** 제목 */
  title: Scalars['String']['output'];
  /** 타입(HOTEL | TNA) */
  type?: Maybe<Scalars['String']['output']>;
};

/** External Link(PDP) 입력 */
export type ExternalLinkInput = {
  /** 국내 상품 여부 */
  isDomestic: Scalars['Boolean']['input'];
  /** 상품 링크 */
  link: Scalars['String']['input'];
  /** 위치 좌표 */
  point: PointInput;
  /** 상품 ID */
  propertyId: Scalars['String']['input'];
  /** 썸네일 url */
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  /** 제목 */
  title: Scalars['String']['input'];
};

export type ExternalMessageContentView = {
  __typename?: 'ExternalMessageContentView';
  markdownText?: Maybe<Scalars['String']['output']>;
  mentionedUser?: Maybe<ExternalMessageUserView>;
  text?: Maybe<Scalars['String']['output']>;
};

export type ExternalMessageUserView = {
  __typename?: 'ExternalMessageUserView';
  href: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profileImage: Scalars['String']['output'];
  uid?: Maybe<Scalars['String']['output']>;
  unfriended: Scalars['Boolean']['output'];
  unregister: Scalars['Boolean']['output'];
};

export type ExternalMessageView = {
  __typename?: 'ExternalMessageView';
  blinded: Scalars['Boolean']['output'];
  children: Array<ExternalMessageView>;
  childrenCount: Scalars['Int']['output'];
  content: ExternalMessageContentView;
  createdAt: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isMine: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  reactions: MessageReactions;
  updatedAt: Scalars['String']['output'];
  writer?: Maybe<ExternalMessageUserView>;
};

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

export type Festa = {
  __typename?: 'Festa';
  address?: Maybe<FestaAddress>;
  areas: Array<FestaGeotag>;
  category: Scalars['String']['output'];
  contents: Array<FestaContent>;
  createdAt: Scalars['String']['output'];
  customSchedules: Scalars['JSON']['output'];
  duration?: Maybe<FestaDuration>;
  eventArrivalInstructions?: Maybe<Scalars['String']['output']>;
  geolocation?: Maybe<FestaGeoPoint>;
  headImage?: Maybe<FestaImage>;
  id: Scalars['ID']['output'];
  links: Array<FestaLink>;
  pricing?: Maybe<FestaPricing>;
  regions: Array<FestaGeotag>;
  relatedArticles: Array<Article>;
  relatedFestas: Array<Festa>;
  relatedPois: Array<Poi>;
  resourceId: Scalars['ID']['output'];
  schedules: Array<FestaScheduleItem>;
  scraped?: Maybe<Scalars['Boolean']['output']>;
  subtitle: Scalars['String']['output'];
  tags: Array<Maybe<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type FestaAddress = {
  __typename?: 'FestaAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type FestaContent = {
  __typename?: 'FestaContent';
  image?: Maybe<Array<Maybe<FestaImage>>>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FestaDuration = {
  __typename?: 'FestaDuration';
  end: Scalars['String']['output'];
  start: Scalars['String']['output'];
};

export type FestaExistsByLanguage = {
  __typename?: 'FestaExistsByLanguage';
  en?: Maybe<Scalars['Boolean']['output']>;
  ja?: Maybe<Scalars['Boolean']['output']>;
  ko?: Maybe<Scalars['Boolean']['output']>;
  zh?: Maybe<Scalars['Boolean']['output']>;
  zh_cn?: Maybe<Scalars['Boolean']['output']>;
};

export type FestaGeoPoint = {
  __typename?: 'FestaGeoPoint';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type FestaGeotag = {
  __typename?: 'FestaGeotag';
  id: Scalars['ID']['output'];
  names?: Maybe<FestaTranslatedNames>;
  type: Scalars['String']['output'];
};

export type FestaImage = {
  __typename?: 'FestaImage';
  cloudinaryBucket?: Maybe<Scalars['String']['output']>;
  cloudinaryId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  frame?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  quality?: Maybe<Scalars['String']['output']>;
  sizes: FestaSizes;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  video?: Maybe<FestaSizes>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type FestaLink = {
  __typename?: 'FestaLink';
  description?: Maybe<Scalars['String']['output']>;
  href: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<FestaImage>;
  label: Scalars['String']['output'];
  level?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
};

export type FestaList = {
  __typename?: 'FestaList';
  items: Array<Festa>;
  pagination?: Maybe<FestaPagination>;
};

export type FestaPagination = {
  __typename?: 'FestaPagination';
  count: Scalars['Int']['output'];
  nextItemId?: Maybe<Scalars['String']['output']>;
};

export type FestaPricing = {
  __typename?: 'FestaPricing';
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<PricingType>;
};

export type FestaScheduleItem = {
  __typename?: 'FestaScheduleItem';
  breakHours?: Maybe<Span>;
  closed?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  operatingHours?: Maybe<Span>;
};

export type FestaSize = {
  __typename?: 'FestaSize';
  url: Scalars['String']['output'];
};

export type FestaSizes = {
  __typename?: 'FestaSizes';
  full: FestaSize;
  large: FestaSize;
  small_square: FestaSize;
};

export type FestaTranslatedNames = {
  __typename?: 'FestaTranslatedNames';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['String']['output']>;
};

/** 항공권 */
export type FlightInfo = {
  __typename?: 'FlightInfo';
  /** 공항 정보 */
  airport: Airport;
  /** 항공 스케줄 - DateTime */
  schedule: Scalars['DateTime']['output'];
  /** 항공 스케줄 - 날짜 */
  scheduleDate: Scalars['String']['output'];
  /** 항공 스케줄 - 시간 */
  scheduleTime: Scalars['String']['output'];
  /** 공항 터미널 */
  terminal?: Maybe<Scalars['String']['output']>;
};

/** 항공 스케줄 */
export type FlightSchedule = {
  __typename?: 'FlightSchedule';
  /** 항공사 정보 */
  airline: Airline;
  /** 도착 정보 */
  arrival: FlightInfo;
  /** 출발 정보 */
  departure: FlightInfo;
  /** 비행 시간 */
  flightDuration?: Maybe<Scalars['String']['output']>;
  /** 항공편 이름 */
  flightName: Scalars['String']['output'];
  /** 항공 스케줄 ID */
  id: Scalars['ID']['output'];
  /** 운항 항공자 정보 */
  operatingAirline?: Maybe<Airline>;
  /** 운항 항공편 번호 */
  operatingFlightNumber?: Maybe<Scalars['String']['output']>;
  /** 항공권 주문 ID */
  orderId?: Maybe<Scalars['String']['output']>;
  /** 여행 일정 ID */
  tripPlanId: Scalars['ID']['output'];
};

export type ForeignEntity = {
  __typename?: 'ForeignEntity';
  name?: Maybe<Scalars['String']['output']>;
  service: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type GeneralTrip = {
  __typename?: 'GeneralTrip';
  cities: Array<GeneralTripCity>;
  /** 동행자 수 */
  companionCount?: Maybe<Scalars['Int']['output']>;
  /** 동행자 ID 목록 */
  companions: Array<Maybe<Scalars['String']['output']>>;
  /** 여행 생성 일시 */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * 현재 날짜 기준으로 여행의 진행 상태를 나타내는 값
   * - 여행이 이미 시작된 경우: 출발일로부터 경과된 일수 + 1을 반환
   * - 여행이 아직 시작되지 않은 경우: 출발일까지 남은 일수(음수 값)를 반환
   */
  dateInterval?: Maybe<Scalars['Int']['output']>;
  /** 여행 삭제 여부 */
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** 지오태그 스타일 정보 */
  geotagStyles: Array<GeneralTripGeotagStyle>;
  /** 지오태그 정보 */
  geotags: Array<GeneralTripGeotag>;
  /** 여행 ID */
  id: Scalars['ID']['output'];
  /** 여행 종료 날짜 */
  localEndDate?: Maybe<Scalars['String']['output']>;
  /** 여행 시작 날짜 */
  localStartDate?: Maybe<Scalars['String']['output']>;
  /** 여행 생성 위치의 timezone */
  timezone?: Maybe<Scalars['String']['output']>;
  /** 제목 */
  title?: Maybe<Scalars['String']['output']>;
  /** 여행 번호 - 구버전 대응용 필드 */
  tripNumber?: Maybe<Scalars['String']['output']>;
  /** 여행 소유자 ID */
  userId?: Maybe<Scalars['ID']['output']>;
};

export type GeneralTripCity = {
  __typename?: 'GeneralTripCity';
  airportIataCodes?: Maybe<Array<Scalars['String']['output']>>;
  city?: Maybe<SimpleCity>;
  country: SimpleCountry;
  iataCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  names: GeneralTripCityName;
  poiId?: Maybe<Scalars['String']['output']>;
  regionId?: Maybe<Scalars['String']['output']>;
  shortNames?: Maybe<GeneralTripCityName>;
  timezone?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  zoneId?: Maybe<Scalars['String']['output']>;
};

export type GeneralTripCityName = {
  __typename?: 'GeneralTripCityName';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
};

export type GeneralTripGeotag = {
  __typename?: 'GeneralTripGeotag';
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};

export type GeneralTripGeotagMedia = {
  __typename?: 'GeneralTripGeotagMedia';
  backgroundImage?: Maybe<GeneralTripMediaSource>;
  backgroundVideo?: Maybe<GeneralTripMediaSource>;
  blurredBackgroundImage?: Maybe<GeneralTripMediaSource>;
  logoImage?: Maybe<GeneralTripMediaSource>;
};

export type GeneralTripGeotagStyle = {
  __typename?: 'GeneralTripGeotagStyle';
  countryCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  media?: Maybe<GeneralTripGeotagMedia>;
  names?: Maybe<GeneralTripGeotagStyleName>;
};

export type GeneralTripGeotagStyleName = {
  __typename?: 'GeneralTripGeotagStyleName';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
};

export type GeneralTripMediaImgUrl = {
  __typename?: 'GeneralTripMediaImgUrl';
  url?: Maybe<Scalars['String']['output']>;
};

export type GeneralTripMediaSize = {
  __typename?: 'GeneralTripMediaSize';
  full: GeneralTripMediaImgUrl;
  large: GeneralTripMediaImgUrl;
  small_square: GeneralTripMediaImgUrl;
};

export type GeneralTripMediaSource = {
  __typename?: 'GeneralTripMediaSource';
  cloudinaryBucket: Scalars['String']['output'];
  cloudinaryId: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  sizes: GeneralTripMediaSize;
  source?: Maybe<GeneralTripMediaImgUrl>;
  type: Scalars['String']['output'];
  video?: Maybe<GeneralTripMediaSize>;
  width: Scalars['Int']['output'];
};

/** 여행 일정 */
export type GeneralTripPlan = {
  __typename?: 'GeneralTripPlan';
  /** 통합 주문번호 */
  compositeOrderId?: Maybe<Scalars['String']['output']>;
  /** 일정 생성 시각 */
  createdAt: Scalars['DateTime']['output'];
  /** 일차 */
  day: Scalars['Int']['output'];
  /** External Link 정보 */
  externalLink?: Maybe<ExternalLinkInfo>;
  /** 항공 스케줄 정보 */
  flightSchedule?: Maybe<FlightSchedule>;
  /** 호텔 예약번호 */
  hotelReservationId?: Maybe<Scalars['String']['output']>;
  /** 일정 ID */
  id: Scalars['ID']['output'];
  /** 메모 - 텍스트 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 메모 - 이미지 */
  memoImages?: Maybe<Array<MemoImage>>;
  /** 순서 */
  order: Scalars['Int']['output'];
  /** POI 정보 */
  poi?: Maybe<Poi>;
  /** 시각 */
  time?: Maybe<Scalars['String']['output']>;
  /** TNA 예약번호 */
  tnaBookingId?: Maybe<Scalars['String']['output']>;
  /** 여행 ID */
  tripId: Scalars['ID']['output'];
  /** 일정 번호 - 구버전 */
  tripPlanNumber: Scalars['String']['output'];
  /** 일정 타입 */
  type: TripPlanType;
};

/** 여행 일정 목록 */
export type GeneralTripPlanList = {
  __typename?: 'GeneralTripPlanList';
  /** Day 별 여행 일정 목록 */
  items: Array<GeneralTripPlanListGroupByDay>;
  /** 총 일정 수 */
  totalCount: Scalars['Int']['output'];
};

/** Day 별 여행 일정 목록 */
export type GeneralTripPlanListGroupByDay = {
  __typename?: 'GeneralTripPlanListGroupByDay';
  /** 일차 */
  day: Scalars['Int']['output'];
  /** 여행 일정 목록 */
  plans: Array<GeneralTripPlan>;
  /** 여행 ID */
  tripId: Scalars['ID']['output'];
};

export type GeoMetadata = {
  __typename?: 'GeoMetadata';
  areas?: Maybe<Array<Scalars['JSON']['output']>>;
  cities?: Maybe<Array<Maybe<NamedGeotag>>>;
  geotags?: Maybe<Array<Scalars['JSON']['output']>>;
  timeZone?: Maybe<Scalars['String']['output']>;
  vicinity?: Maybe<Scalars['String']['output']>;
};

export type GeoTag = {
  __typename?: 'GeoTag';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type Geotag = {
  __typename?: 'Geotag';
  createdAt: Scalars['DateTime']['output'];
  /** 태그 ID */
  id: Scalars['String']['output'];
  names: Scalars['JSON']['output'];
  source: GeotagSource;
  /** 태그 타입 */
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GeotagInput = {
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type GeotagSource = {
  __typename?: 'GeotagSource';
  attractionCategories?: Maybe<Array<Scalars['JSON']['output']>>;
  attractionFilters?: Maybe<Array<Scalars['JSON']['output']>>;
  countryCode?: Maybe<Scalars['String']['output']>;
  currencies?: Maybe<Array<Scalars['String']['output']>>;
  defaultRange?: Maybe<Scalars['Int']['output']>;
  featuredNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  foreignEntities?: Maybe<Array<ForeignEntity>>;
  geofence?: Maybe<Scalars['JSON']['output']>;
  languages?: Maybe<Array<Scalars['String']['output']>>;
  media?: Maybe<Scalars['JSON']['output']>;
  menu?: Maybe<Scalars['JSON']['output']>;
  names: Scalars['JSON']['output'];
  popularKeywords?: Maybe<Array<Scalars['String']['output']>>;
  ranges?: Maybe<Array<Scalars['Int']['output']>>;
  regionCategory?: Maybe<RegionCategory>;
  regionIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  relatedGeotags?: Maybe<Array<RelatedGeotag>>;
  restaurantCategories?: Maybe<Array<Scalars['JSON']['output']>>;
  restaurantFilters?: Maybe<Array<Scalars['JSON']['output']>>;
  stale?: Maybe<Scalars['JSON']['output']>;
  timeZone?: Maybe<Scalars['String']['output']>;
};

/** 가계부 지출 목록 조회 입력 */
export type GetAccountBookExpensesInput = {
  /** 개인 지출 여부 */
  isPersonal?: InputMaybe<Scalars['Boolean']['input']>;
  /** 지출 목록 정렬 */
  order?: InputMaybe<AccountBookExpenseOrder>;
  /** 조회 페이지 */
  page?: InputMaybe<Scalars['Int']['input']>;
  /** 조회 갯수 */
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type GetFestaArgs = {
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['ID']['input'];
};

export type GetFestasArgs = {
  areaIds?: InputMaybe<Array<Scalars['String']['input']>>;
  category?: InputMaybe<Scalars['String']['input']>;
  coordinates?: InputMaybe<CoordinatesArg>;
  durationEndGte?: InputMaybe<Scalars['String']['input']>;
  durationEndLte?: InputMaybe<Scalars['String']['input']>;
  durationStartGte?: InputMaybe<Scalars['String']['input']>;
  durationStartLte?: InputMaybe<Scalars['String']['input']>;
  isGeolocationExists?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  maxDistance?: InputMaybe<Scalars['Int']['input']>;
  nextItemId?: InputMaybe<Scalars['String']['input']>;
  orderByDurationEnd?: InputMaybe<Scalars['Int']['input']>;
  regionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  resourceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetFestasByScheduleArgs = {
  regionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  schedule?: InputMaybe<Scalars['String']['input']>;
};

/** 목적지와 날짜와 겹치는 여행 목록 조회 입력 */
export type GetOverlappingGeneralTripInput = {
  /** 리전 ID 목록 */
  destinations: Array<Scalars['String']['input']>;
  /** 여행 종료일 */
  endDate: Scalars['String']['input'];
  /** 여행 시작일 */
  startDate: Scalars['String']['input'];
  /** 사용자 ID */
  userId: Scalars['ID']['input'];
};

export type GetRecommendedFestasArgs = {
  excludeIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type HeaderButton = {
  __typename?: 'HeaderButton';
  enabled: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
};

export type Holiday = {
  __typename?: 'Holiday';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<HolidayType>;
};

export type HolidayList = {
  __typename?: 'HolidayList';
  items: Array<Holiday>;
  totalCount: Scalars['Int']['output'];
};

export const HolidayType = {
  ELECTION: 'ELECTION',
  LEGAL: 'LEGAL',
  TEMPORARY: 'TEMPORARY'
} as const;

export type HolidayType = typeof HolidayType[keyof typeof HolidayType];
export type ImageSize = {
  __typename?: 'ImageSize';
  /** 풀사이즈 */
  full: ImageUrl;
  /** 큰 사이즈 */
  large: ImageUrl;
  /** 작은 정사각형 */
  smallSquare: ImageUrl;
};

export type ImageSource = {
  __typename?: 'ImageSource';
  /** 소스 URL */
  url?: Maybe<Scalars['String']['output']>;
};

export type ImageUrl = {
  __typename?: 'ImageUrl';
  /** 이미지 URL */
  url: Scalars['String']['output'];
};

export type LeisurePrice = {
  __typename?: 'LeisurePrice';
  discountRate?: Maybe<Scalars['Int']['output']>;
  finalPrice?: Maybe<Scalars['Int']['output']>;
};

export type LeisureProduct = {
  __typename?: 'LeisureProduct';
  hasLeisure?: Maybe<Scalars['Boolean']['output']>;
  items: Array<LeisureProductItem>;
};

export type LeisureProductItem = {
  __typename?: 'LeisureProductItem';
  category?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price?: Maybe<LeisurePrice>;
  productId: Scalars['ID']['output'];
  thumbnail?: Maybe<Thumbnail>;
};

/** 숙소 검색 결과 */
export type LodgingSearchItem = ContentPoiSearchItem & {
  __typename?: 'LodgingSearchItem';
  /** 지역 목록 */
  areas?: Maybe<Array<Scalars['String']['output']>>;
  /** 카테고리 목록 */
  categories?: Maybe<Array<Scalars['String']['output']>>;
  comment?: Maybe<Scalars['String']['output']>;
  /** 국가명 */
  country?: Maybe<Scalars['String']['output']>;
  /** 위치 정보 태그 */
  geotags: Array<GeoTag>;
  /** 하이라이트 처리된 장소명 */
  highlight?: Maybe<Scalars['String']['output']>;
  /** POI ID */
  id: Scalars['ID']['output'];
  /** 위치(위도, 경도) */
  location: Array<Scalars['Float']['output']>;
  /** 미디어 정보 */
  media?: Maybe<Media>;
  /** 장소명 */
  name: Scalars['String']['output'];
  /** 평점 */
  starRating?: Maybe<Scalars['Int']['output']>;
  /** 컨텐츠 POI 타입 */
  type: ContentPoiSearchType;
  /** 근처 지역 */
  vicinity?: Maybe<Scalars['String']['output']>;
};

/** 미디어 정보 */
export type Media = {
  __typename?: 'Media';
  /** cloudinary ID */
  cloudinaryId?: Maybe<Scalars['ID']['output']>;
  /** 높이 */
  height: Scalars['Int']['output'];
  /** 미디어 ID */
  id: Scalars['ID']['output'];
  /**
   * 사이즈별 이미지 정보
   * - video 타입인 경우, 영상의 썸네일 이미지
   */
  sizes: MediaSizes;
  /** 미디어 소스 정보 */
  source?: Maybe<MediaSource>;
  /** 미디어 타입 (image, video) */
  type?: Maybe<Scalars['String']['output']>;
  /** 사이즈별 비디오 정보 */
  video?: Maybe<MediaSizes>;
  /** 너비 */
  width: Scalars['Int']['output'];
};

/** 미디어 사이즈별 정보 */
export type MediaSize = {
  __typename?: 'MediaSize';
  /** 미디어 URL */
  url?: Maybe<Scalars['String']['output']>;
};

/** 미디어 사이즈 정보 */
export type MediaSizes = {
  __typename?: 'MediaSizes';
  full: MediaSize;
  large: MediaSize;
  smallSquare: MediaSize;
};

/** 미디어 소스 정보 */
export type MediaSource = {
  __typename?: 'MediaSource';
  /** Origin Source URL */
  url?: Maybe<Scalars['String']['output']>;
};

export const MediaType = {
  /** 이미지 */
  IMAGE: 'IMAGE',
  /** 비디오 */
  VIDEO: 'VIDEO'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];
/** 메모 이미지 */
export type MemoImage = {
  __typename?: 'MemoImage';
  /** 이미지 타입(jpg, png 등) */
  format: Scalars['String']['output'];
  /** full 이미지 URL */
  fullImage: Scalars['String']['output'];
  /** 이미지 세로 길이 */
  height: Scalars['Int']['output'];
  /** 이미지 ID */
  id: Scalars['ID']['output'];
  /** large 썸네일 이미지 URL */
  largeThumbnail: Scalars['String']['output'];
  /** 클라우디너리 Public ID */
  name: Scalars['String']['output'];
  /** small 썸네일 이미지 URL */
  smallThumbnail: Scalars['String']['output'];
  /** 이미지 URL */
  url: Scalars['String']['output'];
  /** 이미지 가로 길이 */
  width: Scalars['Int']['output'];
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

export const MessageOrderType = {
  asc: 'asc',
  desc: 'desc'
} as const;

export type MessageOrderType = typeof MessageOrderType[keyof typeof MessageOrderType];
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

export const MessagePayloadType = {
  image: 'image',
  text: 'text'
} as const;

export type MessagePayloadType = typeof MessagePayloadType[keyof typeof MessagePayloadType];
export type MessageReactions = {
  __typename?: 'MessageReactions';
  like?: Maybe<ReactionStatus>;
};

export type Metadata = {
  __typename?: 'Metadata';
  hasTnaProducts?: Maybe<Scalars['Boolean']['output']>;
  reviewImagesCount?: Maybe<Scalars['Int']['output']>;
  reviewsCount?: Maybe<Scalars['Int']['output']>;
  reviewsRating?: Maybe<Scalars['Float']['output']>;
  scrapsCount?: Maybe<Scalars['Int']['output']>;
  structuredAddress?: Maybe<StructuredAddress>;
};

/** 여행 수정 내역 */
export type Modification = {
  __typename?: 'Modification';
  /** 수정 시각 */
  timestamp: Scalars['Int']['output'];
  /** 수정 유형 */
  type: TripModificationType;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 가계부 통화 추가 */
  addAccountBookCurrency: AccountBookCurrency;
  /** 가계부 지출 내역 생성 */
  createAccountBookExpense: AccountBookExpense;
  /** 가계부 가상 유저 생성 */
  createAccountBookVirtualUser: AccountBookVirtualUser;
  createPurchaseToken: ReviewPurchaseToken;
  createReview: Review;
  /** 여행 생성 */
  createTrip: GeneralTrip;
  /**
   * 여행 일정 생성
   * - 여러개의 일정 생성
   */
  createTripPlans: Array<Maybe<GeneralTripPlan>>;
  /**
   * 여행 일정 생성
   * - 여러 day에 대해 동일한 일정 생성
   */
  createTripPlansForMultipleDays: Array<Maybe<GeneralTripPlan>>;
  /** 가계부 지출 내역 삭제 */
  deleteAccountBookExpense: Scalars['Boolean']['output'];
  /** 가계부 가상 유저 삭제 */
  deleteAccountBookVirtualUser: Scalars['Boolean']['output'];
  deleteMessage: Message;
  deleteRecommendationImage: Poi;
  deleteReview: Scalars['Boolean']['output'];
  /** 여행 삭제 */
  deleteTrip: Scalars['Boolean']['output'];
  /** 여행 일정 단건 삭제 */
  deleteTripPlan: Scalars['Boolean']['output'];
  /** 여행 일정 다건 삭제 */
  deleteTripPlans: Scalars['Boolean']['output'];
  editReview: Review;
  /** 여행 일정 수정 권한 발급 */
  getTripPlanEditPermission: Scalars['Boolean']['output'];
  /** 여행 일정 수정 권한 반납 */
  giveBackTripPlanEditPermission: Scalars['Boolean']['output'];
  likeReview: ReviewReaction;
  reportReview: ReviewReaction;
  /** 가계부 지출 내역 순서 변경 및 삭제 */
  restructureAccountBookExpenses: Scalars['Boolean']['output'];
  sendMessage: Message;
  unlikeReview: Scalars['Boolean']['output'];
  /** 가계부 지출 내역 수정 */
  updateAccountBookExpense: AccountBookExpense;
  /** 가계부 가상 유저 업데이트 */
  updateAccountBookVirtualUser: AccountBookVirtualUser;
  /** 여행 목적지 수정 */
  updateTripDestination: GeneralTrip;
  /** 여행 일정 메모 수정 */
  updateTripPlanMemo: GeneralTripPlan;
  /** 여행 일정 시간 수정 */
  updateTripPlanTime: GeneralTripPlan;
  /** 여행 일정 삭제 및 순서 편집 */
  updateTripPlans: GeneralTripPlanList;
  /** 여행 수정 */
  updateTripSchedule: GeneralTrip;
  /** 여행 제목 수정 */
  updateTripTitle: GeneralTrip;
  uploadRecommendationImage: Poi;
};


export type MutationAddAccountBookCurrencyArgs = {
  input: AddAccountBookCurrencyInput;
};


export type MutationCreateAccountBookExpenseArgs = {
  input: CreateAccountBookExpenseInput;
};


export type MutationCreateAccountBookVirtualUserArgs = {
  input: CreateAccountBookVirtualUserInput;
};


export type MutationCreatePurchaseTokenArgs = {
  input: PurchaseTokenInput;
};


export type MutationCreateReviewArgs = {
  input: ReviewCreateInput;
};


export type MutationCreateTripArgs = {
  input: CreateTripInput;
};


export type MutationCreateTripPlansArgs = {
  input: CreateTripPlansInput;
};


export type MutationCreateTripPlansForMultipleDaysArgs = {
  input: CreatePlansForMultipleDaysInput;
};


export type MutationDeleteAccountBookExpenseArgs = {
  input: DeleteAccountBookExpenseInput;
};


export type MutationDeleteAccountBookVirtualUserArgs = {
  input: DeleteAccountBookVirtualUserInput;
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


export type MutationDeleteTripArgs = {
  input: DeleteTripInput;
};


export type MutationDeleteTripPlanArgs = {
  input: DeleteTripPlanInput;
};


export type MutationDeleteTripPlansArgs = {
  input: DeleteTripPlansInput;
};


export type MutationEditReviewArgs = {
  id: Scalars['ID']['input'];
  input: ReviewUpdateInput;
};


export type MutationGetTripPlanEditPermissionArgs = {
  tripId: Scalars['ID']['input'];
};


export type MutationGiveBackTripPlanEditPermissionArgs = {
  tripId: Scalars['ID']['input'];
};


export type MutationLikeReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationReportReviewArgs = {
  input: ReportReviewInput;
  reviewId: Scalars['String']['input'];
};


export type MutationRestructureAccountBookExpensesArgs = {
  input: RestructureAccountBookExpensesInput;
};


export type MutationSendMessageArgs = {
  message: MessageInput;
};


export type MutationUnlikeReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationUpdateAccountBookExpenseArgs = {
  input: UpdateAccountBookExpenseInput;
};


export type MutationUpdateAccountBookVirtualUserArgs = {
  input: UpdateAccountBookVirtualUserInput;
};


export type MutationUpdateTripDestinationArgs = {
  input: UpdateTripDestinationInput;
};


export type MutationUpdateTripPlanMemoArgs = {
  input: UpdateTripPlanInput;
};


export type MutationUpdateTripPlanTimeArgs = {
  input: UpdateTripPlanInput;
};


export type MutationUpdateTripPlansArgs = {
  input: ArrangeTripPlanInput;
};


export type MutationUpdateTripScheduleArgs = {
  input: UpdateTripScheduleInput;
};


export type MutationUpdateTripTitleArgs = {
  input: UpdateTripTitleInput;
};


export type MutationUploadRecommendationImageArgs = {
  image: Scalars['JSON']['input'];
  poiId: Scalars['ID']['input'];
  recommendationId: Scalars['ID']['input'];
};

export type NamedGeotag = {
  __typename?: 'NamedGeotag';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Names = {
  __typename?: 'Names';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['String']['output']>;
};

export type Notice = {
  __typename?: 'Notice';
  /** 배너 콘텐츠 */
  bannerContent: BannerContent;
  /** 노출 종료 일시 */
  displayEndAt?: Maybe<Scalars['DateTime']['output']>;
  /** 노출 시작 일시 */
  displayStartAt: Scalars['DateTime']['output'];
  /** 공지 ID */
  id: Scalars['ID']['output'];
  /** 타겟팅 조건 */
  targetingCondition: TargetingCondition;
  /** 공지 제목 */
  title: Scalars['String']['output'];
};

export type NoticeImage = {
  __typename?: 'NoticeImage';
  /** Cloudinary 버킷 */
  cloudinaryBucket?: Maybe<Scalars['String']['output']>;
  /** Cloudinary ID */
  cloudinaryId: Scalars['String']['output'];
  /** 이미지 높이 */
  height?: Maybe<Scalars['Int']['output']>;
  /** 이미지 ID */
  id: Scalars['String']['output'];
  /** 이미지 사이즈 */
  sizes: ImageSize;
  /** 이미지 소스 */
  source: ImageSource;
  /** 미디어 타입 */
  type: MediaType;
  /** 이미지 너비 */
  width?: Maybe<Scalars['Int']['output']>;
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
  productMapping?: Maybe<ProductMapping>;
  readableSpecialHours?: Maybe<Array<Scalars['JSON']['output']>>;
  region?: Maybe<Region>;
  regions: Array<Region>;
  relationshipCounts: Scalars['JSON']['output'];
  restaurantRecommendations?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  reviewImage?: Maybe<Scalars['JSON']['output']>;
  reviewed?: Maybe<Scalars['Boolean']['output']>;
  scraped?: Maybe<Scalars['Boolean']['output']>;
  seoMetadata?: Maybe<PoiSeoMetadata>;
  serviceMetadata?: Maybe<PoiServiceMetadata>;
  source: PoiSource;
  starRating?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PoiSeoMetadata = {
  __typename?: 'PoiSeoMetadata';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type PoiServiceMetadata = {
  __typename?: 'PoiServiceMetadata';
  id: Scalars['ID']['output'];
  review?: Maybe<ReviewMetadata>;
  scrap?: Maybe<ScrapMetadata>;
};

export type PoiSource = {
  __typename?: 'PoiSource';
  addresses: Scalars['JSON']['output'];
  /** @deprecated deprecated in favor of geoMetadata.areas. */
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
  /** @deprecated deprecated in favor of geoMetadata.geotags. */
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
  /** @deprecated deprecated in favor of geoMetadata.timeZone. */
  timeZone?: Maybe<Scalars['String']['output']>;
  tips?: Maybe<Array<Scalars['String']['output']>>;
  /** @deprecated deprecated in favor of geoMetadata.vicinity. */
  vicinity?: Maybe<Scalars['String']['output']>;
};

/** 좌표 */
export type Point = {
  __typename?: 'Point';
  /** 위도 */
  latitude: Scalars['Float']['output'];
  /** 경도 */
  longitude: Scalars['Float']['output'];
};

/** 좌표 */
export type PointInput = {
  /** 위도 */
  latitude: Scalars['Float']['input'];
  /** 경도 */
  longitude: Scalars['Float']['input'];
};

export const PricingType = {
  FREE: 'FREE',
  PAID: 'PAID',
  UNKNOWN: 'UNKNOWN'
} as const;

export type PricingType = typeof PricingType[keyof typeof PricingType];
export type ProductMapping = {
  __typename?: 'ProductMapping';
  id: Scalars['ID']['output'];
  sourceContentMetadata?: Maybe<SourceContentMetadata>;
};

export type PurchaseOptionInput = {
  displayName: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type PurchaseTokenInput = {
  displayName: Scalars['String']['input'];
  options?: InputMaybe<Array<PurchaseOptionInput>>;
  orderId: Scalars['String']['input'];
  purchaseCount: Scalars['Int']['input'];
  purchaseDate: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  checkIfReviewCanBeChanged: ReviewChangeable;
  checkIfReviewCanBeCreated: ReviewValidationResult;
  /** 가계부 조회 */
  getAccountBook?: Maybe<AccountBook>;
  /** 가계부 지출 조회 */
  getAccountBookExpense?: Maybe<AccountBookExpense>;
  /** 가계부 카테고리 지출 요약 목록 조회 */
  getAccountBookExpenseCategorySummaries: AccountBookExpenseCategorySummaries;
  /** 가계부 지출 목록 조회 */
  getAccountBookExpenses: AccountBookExpenseList;
  /** 가계부 정산 요약 조회 */
  getAccountBookSettlementSummary: AccountBookSettlementSummary;
  getAnnouncements: Array<Article>;
  getArticle?: Maybe<Article>;
  getConvertedPoiFromGooglePlaceId?: Maybe<Poi>;
  getCountry?: Maybe<Country>;
  getFeaturedDestinationsList?: Maybe<FeaturedDestinationsList>;
  getFesta?: Maybe<Festa>;
  getFestaExistsByLanguage?: Maybe<FestaExistsByLanguage>;
  getFestas?: Maybe<FestaList>;
  getFestasBySchedule?: Maybe<FestaList>;
  /** 항공 예약 번호로 여행 조회 */
  getGeneralTripByFlightOrderId: GeneralTrip;
  /** 여행 조회 */
  getGeneralTripById: GeneralTrip;
  /** planId로 여행 일정 조회 */
  getGeneralTripPlanByIdAndTripId: GeneralTripPlan;
  /** 여행 일정 전체 조회 */
  getGeneralTripPlansByTripId: GeneralTripPlanList;
  /** day별 여행 일정 조회 */
  getGeneralTripPlansByTripIdAndDay: GeneralTripPlanList;
  getGeotag?: Maybe<Geotag>;
  getGeotags: Array<Geotag>;
  getGuides: Array<Article>;
  /** 공휴일 조회 */
  getHolidaysWithIn?: Maybe<HolidayList>;
  getLatestReviews: Array<Review>;
  /** 메모 조회 */
  getMemoTypeTripPlan: GeneralTripPlan;
  getMessage: Message;
  getMessages: Array<Message>;
  getMyReview?: Maybe<Review>;
  getMyReviewUserBoard: ReviewUserBoard;
  getMyReviewsByResourceId: Array<Review>;
  getMyReviewsList: Array<Review>;
  getNewsletters: Array<Article>;
  getNextNewsletter?: Maybe<Article>;
  /** 공지사항 목록 조회 */
  getNotices: Array<Maybe<Notice>>;
  /** 목적지와 날짜와 겹치는 여행 목록 조회 */
  getOverlappingGeneralTrip: Array<Maybe<GeneralTrip>>;
  getPoi?: Maybe<Poi>;
  getPois?: Maybe<Array<Poi>>;
  getPopularReviews: Array<Review>;
  getPosts: Array<Article>;
  getPrevNewsletter?: Maybe<Article>;
  getRecommendedFestas?: Maybe<Array<Festa>>;
  /** 제주 레저 추천 상품 조회 */
  getRecommendedLeisureByTripId: LeisureProduct;
  /** 추천 POI 조회 */
  getRecommendedPoisByTripIdAndDay: Array<Poi>;
  getRegion?: Maybe<Region>;
  getRegionCategories: Array<RegionCategory>;
  getRegionCategory?: Maybe<RegionCategory>;
  getRegionsByIds: Array<Region>;
  getReplyMessages: ReplyMessagePageResponse;
  getReviewResourceBoard: ReviewResourceBoard;
  getReviewResourceBoardsByResourceIds: Array<ReviewResourceBoard>;
  getReviewSpecification?: Maybe<ReviewSpecification>;
  getReviewsAllowedActionByOrders: Array<ReviewActionByOrderId>;
  getReviewsByOrderIds: Array<Review>;
  getReviewsByRating: Array<Review>;
  getReviewsByResourceIds: Array<Review>;
  getReviewsCount: Scalars['Int']['output'];
  getRoom: Room;
  getScraps: Array<Scrap>;
  /** TNA 카탈로그 조회 */
  getTnaCatalogByTripId: TnaCatalog;
  getTripByTripCode: Trip;
  /** 여행 수정 권한 조회 */
  getTripEditPermission: TripEditPermission;
  getTripPlans: Array<Array<TripPlan>>;
  getTripPlansByTripCode: Array<Array<TripPlan>>;
  /**
   * 다가오는 여행 목록 조회
   * - 여행중 & 여행 예정인 여행 목록 조회
   */
  getUpcomingTrips: Array<Maybe<GeneralTrip>>;
  /** 유저 여행 목록 조회 */
  getUserGeneralTrips: Array<Maybe<GeneralTrip>>;
  getZone?: Maybe<Zone>;
  isJoinedTrip: Scalars['Boolean']['output'];
  mgetArticleSeoMetadata?: Maybe<Array<Maybe<ArticleSeoMetadata>>>;
  mgetArticleServiceMetadata?: Maybe<Array<Maybe<ArticleServiceMetadata>>>;
  mgetArticles: Array<Article>;
  mgetCountries: Array<Country>;
  mgetGeotags: Array<Maybe<Geotag>>;
  mgetMessages: Array<Message>;
  mgetPoiSeoMetadata?: Maybe<Array<Maybe<PoiSeoMetadata>>>;
  mgetPoiServiceMetadata?: Maybe<Array<Maybe<PoiServiceMetadata>>>;
  mgetPois: Array<Poi>;
  mgetRecommendedPois: Array<Poi>;
  mgetRegionCategories: Array<Maybe<RegionCategory>>;
  mgetRegions: Array<Maybe<Region>>;
  mgetReplyBoards: Array<ReplyBoard>;
  mgetReviewArticleServiceMetadata?: Maybe<Array<ArticleServiceMetadata>>;
  mgetReviewPoiServiceMetadata?: Maybe<Array<PoiServiceMetadata>>;
  mgetReviewedArticles: Array<Article>;
  mgetReviewedPois: Array<Poi>;
  mgetReviews: Array<Maybe<Review>>;
  mgetRooms: Array<Room>;
  mgetScrapArticleServiceMetadata?: Maybe<Array<ArticleServiceMetadata>>;
  mgetScrapPoiServiceMetadata?: Maybe<Array<PoiServiceMetadata>>;
  mgetScrapedArticles?: Maybe<Array<Article>>;
  mgetScrapedFestas: Array<Festa>;
  mgetScrapedPois: Array<Poi>;
  mgetScrapedTna: Array<TnaProduct>;
  mgetUsersByFbIds: Array<User>;
  mgetZones: Array<Maybe<Zone>>;
  searchCities: Array<City>;
  /** Content POI 검색 */
  searchContentPoi: ContentPoiSearchItemList;
};


export type QueryCheckIfReviewCanBeChangedArgs = {
  actionType: ReviewActionType;
  id: Scalars['ID']['input'];
};


export type QueryCheckIfReviewCanBeCreatedArgs = {
  resourceId: Scalars['String']['input'];
};


export type QueryGetAccountBookArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetAccountBookExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAccountBookExpenseCategorySummariesArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetAccountBookExpensesArgs = {
  input: GetAccountBookExpensesInput;
};


export type QueryGetAccountBookSettlementSummaryArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetAnnouncementsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  sinceId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetConvertedPoiFromGooglePlaceIdArgs = {
  googlePlaceId: Scalars['String']['input'];
  poiType: Scalars['String']['input'];
};


export type QueryGetCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFeaturedDestinationsListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFestaArgs = {
  args?: InputMaybe<GetFestaArgs>;
};


export type QueryGetFestaExistsByLanguageArgs = {
  resourceId: Scalars['ID']['input'];
};


export type QueryGetFestasArgs = {
  args?: InputMaybe<GetFestasArgs>;
};


export type QueryGetFestasByScheduleArgs = {
  args?: InputMaybe<GetFestasByScheduleArgs>;
};


export type QueryGetGeneralTripByFlightOrderIdArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetGeneralTripByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGeneralTripPlanByIdAndTripIdArgs = {
  planId: Scalars['ID']['input'];
  tripId: Scalars['ID']['input'];
};


export type QueryGetGeneralTripPlansByTripIdArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetGeneralTripPlansByTripIdAndDayArgs = {
  day: Scalars['Int']['input'];
  tripId: Scalars['ID']['input'];
};


export type QueryGetGeotagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGeotagsArgs = {
  from: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetGuidesArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tagId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetHolidaysWithInArgs = {
  country: Scalars['String']['input'];
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type QueryGetLatestReviewsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMemoTypeTripPlanArgs = {
  planId: Scalars['ID']['input'];
  tripId: Scalars['ID']['input'];
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


export type QueryGetMyReviewsByResourceIdArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  resourceId: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMyReviewsListArgs = {
  from: Scalars['Int']['input'];
  resourceTypes?: InputMaybe<Array<ReviewResourceType>>;
  size: Scalars['Int']['input'];
};


export type QueryGetNewslettersArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNextNewsletterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetNoticesArgs = {
  bannerType?: InputMaybe<Scalars['String']['input']>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOverlappingGeneralTripArgs = {
  input: GetOverlappingGeneralTripInput;
};


export type QueryGetPoiArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
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
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
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


export type QueryGetRecommendedFestasArgs = {
  args?: InputMaybe<GetRecommendedFestasArgs>;
};


export type QueryGetRecommendedLeisureByTripIdArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetRecommendedPoisByTripIdAndDayArgs = {
  day: Scalars['Int']['input'];
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tripId: Scalars['ID']['input'];
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


export type QueryGetReplyMessagesArgs = {
  input: ReplyMessagePageInput;
};


export type QueryGetReviewResourceBoardArgs = {
  resourceId: Scalars['String']['input'];
};


export type QueryGetReviewResourceBoardsByResourceIdsArgs = {
  resourceIds: Array<Scalars['String']['input']>;
};


export type QueryGetReviewSpecificationArgs = {
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};


export type QueryGetReviewsAllowedActionByOrdersArgs = {
  input: Array<CheckReviewAllowedActionInput>;
};


export type QueryGetReviewsByOrderIdsArgs = {
  orderIds: Array<Scalars['String']['input']>;
};


export type QueryGetReviewsByRatingArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortByRatingsInput>;
};


export type QueryGetReviewsByResourceIdsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  hasPurchaseInfo?: InputMaybe<Scalars['Boolean']['input']>;
  includeBlinded?: InputMaybe<Scalars['Boolean']['input']>;
  resourceIds: Array<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ReviewByResourceIdsSortByInput>;
};


export type QueryGetReviewsCountArgs = {
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
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


export type QueryGetTnaCatalogByTripIdArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetTripByTripCodeArgs = {
  tripCode: Scalars['String']['input'];
};


export type QueryGetTripEditPermissionArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetTripPlansArgs = {
  tripId: Scalars['ID']['input'];
};


export type QueryGetTripPlansByTripCodeArgs = {
  tripCode: Scalars['String']['input'];
};


export type QueryGetUpcomingTripsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserGeneralTripsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetZoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsJoinedTripArgs = {
  tripCode: Scalars['String']['input'];
};


export type QueryMgetArticleSeoMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetArticleServiceMetadataArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMgetArticlesArgs = {
  excludeUnpublished?: InputMaybe<Scalars['Boolean']['input']>;
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetCountriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetGeotagsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetMessagesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetPoiSeoMetadataArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMgetPoiServiceMetadataArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryMgetPoisArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetRecommendedPoisArgs = {
  coordinates?: InputMaybe<CoordinatesInput>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  excludedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  from?: InputMaybe<Scalars['Int']['input']>;
  maxGrade?: InputMaybe<Scalars['Int']['input']>;
  poiTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  regionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  size?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryMgetReviewArticleServiceMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetReviewPoiServiceMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
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


export type QueryMgetScrapArticleServiceMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapPoiServiceMetadataArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapedArticlesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryMgetScrapedFestasArgs = {
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


export type QuerySearchContentPoiArgs = {
  input: SearchContentPoiInput;
};

export type ReactionStatus = {
  __typename?: 'ReactionStatus';
  count: Scalars['Int']['output'];
  haveMine: Scalars['Boolean']['output'];
};

export type Region = {
  __typename?: 'Region';
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  regionCategory?: Maybe<RegionCategory>;
  regionCategoryId?: Maybe<Scalars['String']['output']>;
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
  foreignEntities?: Maybe<Array<ForeignEntity>>;
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

export type RelatedGeotag = {
  __typename?: 'RelatedGeotag';
  alias: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
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
  language: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  translations?: Maybe<Array<Translation>>;
  updatedAt: Scalars['String']['output'];
  writer?: Maybe<ReplyUser>;
};

export type ReplyMessageContent = {
  __typename?: 'ReplyMessageContent';
  markdownText?: Maybe<Scalars['String']['output']>;
  mentionedUser?: Maybe<ReplyUser>;
  text?: Maybe<Scalars['String']['output']>;
};

export type ReplyMessagePageInput = {
  order?: InputMaybe<SortDirection>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type ReplyMessagePageResponse = {
  __typename?: 'ReplyMessagePageResponse';
  currentPage: Scalars['Int']['output'];
  data: Array<ExternalMessageView>;
  hasNext: Scalars['Boolean']['output'];
  totalCount: Scalars['Long']['output'];
};

export type ReplyUser = {
  __typename?: 'ReplyUser';
  href?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type ReportReviewInput = {
  comment: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  type: ReviewReportType;
};

/** 음식점 검색 결과 */
export type RestaurantSearchItem = ContentPoiSearchItem & {
  __typename?: 'RestaurantSearchItem';
  /** 지역 목록 */
  areas?: Maybe<Array<Scalars['String']['output']>>;
  /** 카테고리 목록 */
  categories?: Maybe<Array<Scalars['String']['output']>>;
  comment?: Maybe<Scalars['String']['output']>;
  /** 위치 정보 태그 */
  geotags: Array<GeoTag>;
  /** 하이라이트 처리된 장소명 */
  highlight?: Maybe<Scalars['String']['output']>;
  /** POI ID */
  id: Scalars['ID']['output'];
  /** 위치(위도, 경도) */
  location: Array<Scalars['Float']['output']>;
  /** 미디어 정보 */
  media?: Maybe<Media>;
  /** 장소명 */
  name: Scalars['String']['output'];
  /** 컨텐츠 POI 타입 */
  type: ContentPoiSearchType;
  /** 근처 지역 */
  vicinity?: Maybe<Scalars['String']['output']>;
};

/** 가계부 지출 목록 재구성 입력 */
export type RestructureAccountBookExpensesInput = {
  /** 지출 */
  deletedIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 지출일별 순서 변경 입력 목록 */
  reorders?: InputMaybe<Array<RestructureAccountBookExpensesReorderInput>>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

/** 가계부 지출일별 순서 변경 입력 */
export type RestructureAccountBookExpensesReorderInput = {
  /** 지출일 */
  day: Scalars['Int']['input'];
  /** 지출 ID 목록 */
  ids: Array<Scalars['ID']['input']>;
};

export type Review = {
  __typename?: 'Review';
  blinded?: Maybe<Scalars['Boolean']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  geotags: Array<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  isMyReview: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  liked: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
  media?: Maybe<Array<Scalars['JSON']['output']>>;
  purchaseInfo?: Maybe<ReviewPurchaseInfo>;
  rating?: Maybe<Scalars['Int']['output']>;
  recentTrip: Scalars['Boolean']['output'];
  regionId?: Maybe<Scalars['String']['output']>;
  replyBoard?: Maybe<ReplyBoard>;
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  reviewedAt: Scalars['String']['output'];
  serviceOrigin: ServiceOrigin;
  translatedComment?: Maybe<TranslatedComment>;
  user?: Maybe<User>;
  visitDate?: Maybe<Scalars['String']['output']>;
};

export type ReviewActionByOrderId = {
  __typename?: 'ReviewActionByOrderId';
  actions: Array<ReviewActionType>;
  orderId: Scalars['String']['output'];
};

export const ReviewActionType = {
  create: 'create',
  delete: 'delete',
  update: 'update'
} as const;

export type ReviewActionType = typeof ReviewActionType[keyof typeof ReviewActionType];
export type ReviewByResourceIdsSortByInput = {
  rating?: InputMaybe<SortDirection>;
  reviewedAt?: InputMaybe<SortDirection>;
};

export type ReviewChangeable = {
  __typename?: 'ReviewChangeable';
  changeable: Scalars['Boolean']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type ReviewCommentSpecification = {
  __typename?: 'ReviewCommentSpecification';
  maxLength: Scalars['Int']['output'];
  placeholder: Scalars['String']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewCreateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  geotags?: InputMaybe<Array<InputMaybe<GeotagInput>>>;
  mediaIds?: InputMaybe<Array<Scalars['String']['input']>>;
  purchaseTokenId?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  resourceId: Scalars['String']['input'];
  resourceName: Scalars['String']['input'];
  resourceType: ReviewResourceType;
  visitDate?: InputMaybe<Scalars['String']['input']>;
};

export type ReviewMediaSpecification = {
  __typename?: 'ReviewMediaSpecification';
  maxCount: Scalars['Int']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewMetadata = {
  __typename?: 'ReviewMetadata';
  global?: Maybe<ReviewMetadataDetail>;
  id: Scalars['ID']['output'];
  triple?: Maybe<ReviewMetadataDetail>;
};

export type ReviewMetadataDetail = {
  __typename?: 'ReviewMetadataDetail';
  averageRating?: Maybe<Scalars['Float']['output']>;
  imagesCount?: Maybe<Scalars['Int']['output']>;
  reviewsCount?: Maybe<Scalars['Int']['output']>;
};

export type ReviewPurchaseInfo = {
  __typename?: 'ReviewPurchaseInfo';
  displayName: Scalars['String']['output'];
  options?: Maybe<Array<ReviewPurchaseOption>>;
  orderId: Scalars['String']['output'];
  purchaseCount: Scalars['Int']['output'];
  purchaseDate: Scalars['String']['output'];
};

export type ReviewPurchaseOption = {
  __typename?: 'ReviewPurchaseOption';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ReviewPurchaseToken = {
  __typename?: 'ReviewPurchaseToken';
  createdAt: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  options?: Maybe<Array<ReviewPurchaseOption>>;
  orderId: Scalars['String']['output'];
  purchaseCount: Scalars['Int']['output'];
  purchaseDate: Scalars['String']['output'];
  purchaseTokenId: Scalars['String']['output'];
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
};

export type ReviewRatingSpecification = {
  __typename?: 'ReviewRatingSpecification';
  description?: Maybe<Array<Scalars['String']['output']>>;
  required?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewReaction = {
  __typename?: 'ReviewReaction';
  id: Scalars['ID']['output'];
  reactedAt: Scalars['String']['output'];
  review: Review;
  serviceOrigin: ServiceOrigin;
  type: Scalars['String']['output'];
  user: User;
};

export const ReviewReportType = {
  ABUSE: 'ABUSE',
  COMMERCIAL: 'COMMERCIAL',
  DELETE: 'DELETE',
  ETC: 'ETC',
  ILLEGAL: 'ILLEGAL',
  INFRINGEMENT: 'INFRINGEMENT',
  NOT_RELEVANT: 'NOT_RELEVANT',
  OBSCENE: 'OBSCENE',
  PRIVACY: 'PRIVACY',
  SAME_CONTENTS: 'SAME_CONTENTS'
} as const;

export type ReviewReportType = typeof ReviewReportType[keyof typeof ReviewReportType];
export type ReviewResourceBoard = {
  __typename?: 'ReviewResourceBoard';
  averageRating: Scalars['Float']['output'];
  imagesCount: Scalars['Int']['output'];
  purchaserAverageRating?: Maybe<Scalars['Float']['output']>;
  purchaserReviewsCount?: Maybe<Scalars['Int']['output']>;
  resourceId: Scalars['ID']['output'];
  resourceType: Scalars['String']['output'];
  reviewsCount: Scalars['Int']['output'];
  reviewsWithMediaCount: Scalars['Int']['output'];
};

export const ReviewResourceType = {
  article: 'article',
  attraction: 'attraction',
  festa: 'festa',
  hotel: 'hotel',
  package: 'package',
  poi: 'poi',
  restaurant: 'restaurant',
  ticket: 'ticket',
  ticket_post: 'ticket_post',
  ticket_pre: 'ticket_pre',
  tna: 'tna'
} as const;

export type ReviewResourceType = typeof ReviewResourceType[keyof typeof ReviewResourceType];
export type ReviewSpecification = {
  __typename?: 'ReviewSpecification';
  comment: ReviewCommentSpecification;
  media: ReviewMediaSpecification;
  rating?: Maybe<ReviewRatingSpecification>;
};

export type ReviewUpdateInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  mediaIds?: InputMaybe<Array<Scalars['String']['input']>>;
  purchaseTokenId?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  visitDate?: InputMaybe<Scalars['String']['input']>;
};

export type ReviewUserBoard = {
  __typename?: 'ReviewUserBoard';
  reports: Scalars['Int']['output'];
  reviewsV2: Scalars['Int']['output'];
  thanks: Scalars['Int']['output'];
};

export type ReviewValidationResult = {
  __typename?: 'ReviewValidationResult';
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type Room = {
  __typename?: 'Room';
  geotag: Geotag;
  id: Scalars['ID']['output'];
  lastMessage?: Maybe<Message>;
  title: Scalars['String']['output'];
  travelingUsers?: Maybe<TravelingUsers>;
};

export type Scrap = {
  __typename?: 'Scrap';
  comment?: Maybe<Scalars['String']['output']>;
  content: Content;
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Float']['output'];
};

export const ScrapContentType = {
  ARTICLES_ARTICLE: 'ARTICLES_ARTICLE',
  POIS_ATTRACTION: 'POIS_ATTRACTION',
  POIS_HOTEL: 'POIS_HOTEL',
  POIS_RESTAURANT: 'POIS_RESTAURANT',
  TNA: 'TNA'
} as const;

export type ScrapContentType = typeof ScrapContentType[keyof typeof ScrapContentType];
export type ScrapMetadata = {
  __typename?: 'ScrapMetadata';
  global?: Maybe<ScrapMetadataDetail>;
  id: Scalars['ID']['output'];
  triple?: Maybe<ScrapMetadataDetail>;
};

export type ScrapMetadataDetail = {
  __typename?: 'ScrapMetadataDetail';
  scrapsCount?: Maybe<Scalars['Int']['output']>;
};

/** 컨텐츠 POI 검색 입력 */
export type SearchContentPoiInput = {
  /** 지오 태그 필터 목록 */
  geotags?: InputMaybe<Array<SearchGeoTagInput>>;
  /** 조회 페이지 */
  page: Scalars['Int']['input'];
  /** 검색 키워드 */
  query: Scalars['String']['input'];
  /** 조회 페이지 크기 */
  size: Scalars['Int']['input'];
  /** 검색 타입 */
  types: Array<ContentPoiSearchType>;
};

/** 검색 GeoTag 입력 */
export type SearchGeoTagInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export const ServiceOrigin = {
  global: 'global',
  int: 'int',
  nol: 'nol',
  triple: 'triple'
} as const;

export type ServiceOrigin = typeof ServiceOrigin[keyof typeof ServiceOrigin];
export type SimpleCity = {
  __typename?: 'SimpleCity';
  iataCode: Scalars['String']['output'];
  names: GeneralTripCityName;
  regionId?: Maybe<Scalars['String']['output']>;
  zoneId?: Maybe<Scalars['String']['output']>;
};

export type SimpleCountry = {
  __typename?: 'SimpleCountry';
  code: Scalars['String']['output'];
  names: GeneralTripCityName;
};

export type SortByRatingsInput = {
  rating?: InputMaybe<Scalars['String']['input']>;
};

export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
  asc: 'asc',
  desc: 'desc'
} as const;

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];
export type SourceContentMetadata = {
  __typename?: 'SourceContentMetadata';
  headerButton?: Maybe<HeaderButton>;
};

export type Span = {
  __typename?: 'Span';
  end: Scalars['String']['output'];
  start: Scalars['String']['output'];
};

export type StructuredAddress = {
  __typename?: 'StructuredAddress';
  addressCountry?: Maybe<Scalars['String']['output']>;
  addressLocality?: Maybe<Scalars['String']['output']>;
  addressRegion?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
};

export type TargetingCondition = {
  __typename?: 'TargetingCondition';
  /** 여행 생성 후 경과 일수 제한 (null이면 제한 없음) */
  daysAfterCreation?: Maybe<Scalars['Int']['output']>;
  /** 지역 태그 (null이면 모든 지역) */
  geotags?: Maybe<Array<Maybe<Geotag>>>;
  /** 숙박 포함 여부 (null이면 제한 없음) */
  hasAccommodation?: Maybe<Scalars['Boolean']['output']>;
  /** 항공 포함 여부 (null이면 제한 없음) */
  hasFlight?: Maybe<Scalars['Boolean']['output']>;
};

export type Thumbnail = {
  __typename?: 'Thumbnail';
  full?: Maybe<Scalars['String']['output']>;
  large?: Maybe<Scalars['String']['output']>;
  original?: Maybe<Scalars['String']['output']>;
  smallSquare?: Maybe<Scalars['String']['output']>;
};

export type TnaCatalog = {
  __typename?: 'TnaCatalog';
  cityIds: Array<Scalars['ID']['output']>;
  hasTna?: Maybe<Scalars['Boolean']['output']>;
  items: Array<TnaCatalogItem>;
};

export type TnaCatalogItem = {
  __typename?: 'TnaCatalogItem';
  category?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price?: Maybe<TnaPrice>;
  productId: Scalars['ID']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Thumbnail>;
};

export type TnaPrice = {
  __typename?: 'TnaPrice';
  appliedCoupon?: Maybe<Scalars['Float']['output']>;
  couponToSalesDiscountRate?: Maybe<Scalars['Int']['output']>;
  discountRate?: Maybe<Scalars['Int']['output']>;
  display?: Maybe<Scalars['Int']['output']>;
  sales?: Maybe<Scalars['Int']['output']>;
  totalDiscountRate?: Maybe<Scalars['Int']['output']>;
};

export type TnaProduct = {
  __typename?: 'TnaProduct';
  id: Scalars['ID']['output'];
  scraped?: Maybe<Scalars['Boolean']['output']>;
};

export type TranslatedComment = {
  __typename?: 'TranslatedComment';
  en?: Maybe<Scalars['String']['output']>;
  ja?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  zh?: Maybe<Scalars['String']['output']>;
  zhCn?: Maybe<Scalars['String']['output']>;
};

export type Translation = {
  __typename?: 'Translation';
  language: Scalars['String']['output'];
  markdownText?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type TravelingUsers = {
  __typename?: 'TravelingUsers';
  count: Scalars['Int']['output'];
  recordedAt: Scalars['DateTime']['output'];
};

export type Trip = {
  __typename?: 'Trip';
  companionCount?: Maybe<Scalars['Int']['output']>;
  dateInterval?: Maybe<Scalars['Int']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  end?: Maybe<Scalars['String']['output']>;
  geotagStyles: Array<TripGeotagStyle>;
  geotags: Array<TripGeotag>;
  localEndDate?: Maybe<Scalars['String']['output']>;
  localStartDate?: Maybe<Scalars['String']['output']>;
  share?: Maybe<TripShare>;
  start?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  tripCompanions: Array<Maybe<TripCompanion>>;
  tripTitle?: Maybe<Scalars['String']['output']>;
};

export type TripCompanion = {
  __typename?: 'TripCompanion';
  name: Scalars['String']['output'];
  photo: Scalars['String']['output'];
};

/** 여행 수정 권한 및 수정 가능 상태 조회 */
export type TripEditPermission = {
  __typename?: 'TripEditPermission';
  /** 여행 수정 가능 상태 */
  editable: Scalars['Boolean']['output'];
  /** 여행 생성자 여부 */
  isTripOwner: Scalars['Boolean']['output'];
  /** 여행 수정 내역 */
  modifications?: Maybe<Array<Maybe<Modification>>>;
  /** 여행 수정 권한을 가지고 있는 사용자 ID */
  permissionOwnerId?: Maybe<Scalars['String']['output']>;
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

export type TripGeotag = {
  __typename?: 'TripGeotag';
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TripGeotagMedia = {
  __typename?: 'TripGeotagMedia';
  backgroundImage: TripMediaSource;
  backgroundVideo: TripMediaSource;
  blurredBackgroundImage: TripMediaSource;
  logoImage: TripMediaSource;
};

export type TripGeotagStyle = {
  __typename?: 'TripGeotagStyle';
  countryCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  media?: Maybe<TripGeotagMedia>;
  names?: Maybe<TripGeotagStyleName>;
};

export type TripGeotagStyleName = {
  __typename?: 'TripGeotagStyleName';
  en?: Maybe<Scalars['String']['output']>;
  ko?: Maybe<Scalars['String']['output']>;
  local?: Maybe<Scalars['String']['output']>;
};

export type TripLodgingBookingInfo = {
  __typename?: 'TripLodgingBookingInfo';
  bookingId?: Maybe<Scalars['ID']['output']>;
  checkIn?: Maybe<Scalars['String']['output']>;
  checkOut?: Maybe<Scalars['String']['output']>;
};

export type TripMediaImgUrl = {
  __typename?: 'TripMediaImgUrl';
  url?: Maybe<Scalars['String']['output']>;
};

export type TripMediaSize = {
  __typename?: 'TripMediaSize';
  full: TripMediaImgUrl;
  large: TripMediaImgUrl;
  small_square: TripMediaImgUrl;
};

export type TripMediaSource = {
  __typename?: 'TripMediaSource';
  cloudinaryBucket: Scalars['String']['output'];
  cloudinaryId: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  sizes: TripMediaSize;
  source?: Maybe<TripMediaImgUrl>;
  type: Scalars['String']['output'];
  video?: Maybe<TripMediaSize>;
  width: Scalars['Int']['output'];
};

export const TripModificationType = {
  DESTINATION: 'DESTINATION',
  PLAN: 'PLAN',
  SCHEDULE: 'SCHEDULE',
  TRIP_TITLE: 'TRIP_TITLE'
} as const;

export type TripModificationType = typeof TripModificationType[keyof typeof TripModificationType];
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
  tripPlanImages?: Maybe<Array<TripPlanImage>>;
  type: Scalars['String']['output'];
};

export type TripPlanImage = {
  __typename?: 'TripPlanImage';
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

/** 여행 일정 입력 */
export type TripPlanInput = {
  /** 메모 이미지 ID 목록 - 구버전 */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 메모 이미지 목록 */
  attachments?: InputMaybe<Array<AttachmentInput>>;
  /** 컨텐츠 ID */
  contentId?: InputMaybe<Scalars['String']['input']>;
  /** 컨텐츠 타입 */
  contentType?: InputMaybe<ContentType>;
  /** custom POI ID */
  customPoiId?: InputMaybe<Scalars['String']['input']>;
  /** External Link(PDP) */
  externalLink?: InputMaybe<ExternalLinkInput>;
  /** 호텔 예약 ID */
  hotelReservationId?: InputMaybe<Scalars['String']['input']>;
  /** 메모 텍스트 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** TNA 예약 ID */
  tnaBookingId?: InputMaybe<Scalars['String']['input']>;
};

export const TripPlanType = {
  CUSTOM_POI: 'CUSTOM_POI',
  EXTERNAL_LINK: 'EXTERNAL_LINK',
  FLIGHT: 'FLIGHT',
  HOTEL: 'HOTEL',
  MEMO: 'MEMO',
  POI: 'POI',
  TNA: 'TNA'
} as const;

export type TripPlanType = typeof TripPlanType[keyof typeof TripPlanType];
export type TripShare = {
  __typename?: 'TripShare';
  kakaoShareImage: Scalars['String']['output'];
  message: Scalars['String']['output'];
  shareImage: Scalars['String']['output'];
  title: Scalars['String']['output'];
  webLink: Scalars['String']['output'];
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
  regions?: Maybe<Array<Region>>;
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

/** 가계부 지출 수정 입력 */
export type UpdateAccountBookExpenseInput = {
  /** 결제 금액 */
  amount: Scalars['Float']['input'];
  /** 지출 카테고리 */
  category: AccountBookExpenseCategory;
  /** 지출 일행 유저 ID 목록 */
  companionUsers: Array<AccountBookUserInput>;
  /** 지출 컨텐츠 정보 */
  content?: InputMaybe<AccountBookExpenseContentInput>;
  /** 국가 코드 */
  currencyCode: Scalars['String']['input'];
  /** 결제일 */
  day: Scalars['Int']['input'];
  /** 환율 */
  exchangeRate: Scalars['Float']['input'];
  /** 가계부 지출 ID */
  id: Scalars['ID']['input'];
  /** 개인 지출 여부 */
  isPersonal: Scalars['Boolean']['input'];
  /** 첨부 미디어 ID 목록 */
  mediaIds: Array<Scalars['ID']['input']>;
  /** 결제 유저 ID 목록 */
  payerUsers: Array<AccountBookUserInput>;
  /** 결제 수단 */
  paymentMethod: AccountBookExpensePaymentMethod;
  /** 지출 제목 */
  title: Scalars['String']['input'];
};

/** 가계부 가상 유저 수정 입력 */
export type UpdateAccountBookVirtualUserInput = {
  /** 가상 유저 ID */
  id: Scalars['ID']['input'];
  /** 유저명 */
  name: Scalars['String']['input'];
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type UpdateTripDestinationInput = {
  geotags: Array<InputMaybe<GeotagInput>>;
  id: Scalars['ID']['input'];
};

/** 여행 일정 수정 입력 */
export type UpdateTripPlanInput = {
  /** 메모 이미지 ID 목록 - 구버전 */
  attachmentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 메모 이미지 목록 */
  attachments?: InputMaybe<Array<AttachmentInput>>;
  /** 여행 일정 ID */
  id: Scalars['ID']['input'];
  /** 메모 - 텍스트 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 시각 */
  time?: InputMaybe<Scalars['String']['input']>;
  /** 여행 ID */
  tripId: Scalars['ID']['input'];
};

export type UpdateTripScheduleInput = {
  endDate: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTripTitleInput = {
  id: Scalars['ID']['input'];
  tripTitle: Scalars['String']['input'];
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

export type BaseReviewFragment = { __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null, purchaseInfo?: { __typename?: 'ReviewPurchaseInfo', orderId: string, displayName: string, purchaseDate: string, purchaseCount: number } | null };

export type BaseUserFragment = { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null };

export type BasePinnedMessageFragment = { __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null };

export type BaseReviewSpecificationFragment = { __typename?: 'ReviewSpecification', rating?: { __typename?: 'ReviewRatingSpecification', required?: boolean | null, description?: Array<string> | null } | null };

export type GetPopularReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPopularReviewsQuery = { __typename?: 'Query', popularReviews: Array<{ __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null, purchaseInfo?: { __typename?: 'ReviewPurchaseInfo', orderId: string, displayName: string, purchaseDate: string, purchaseCount: number } | null }> };

export type GetLatestReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLatestReviewsQuery = { __typename?: 'Query', latestReviews: Array<{ __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null, purchaseInfo?: { __typename?: 'ReviewPurchaseInfo', orderId: string, displayName: string, purchaseDate: string, purchaseCount: number } | null }> };

export type GetReviewsByRatingQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortByRatingsInput>;
}>;


export type GetReviewsByRatingQuery = { __typename?: 'Query', ratingReviews: Array<{ __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null, purchaseInfo?: { __typename?: 'ReviewPurchaseInfo', orderId: string, displayName: string, purchaseDate: string, purchaseCount: number } | null }> };

export type GetMyReviewQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
}>;


export type GetMyReviewQuery = { __typename?: 'Query', myReview?: { __typename?: 'Review', id: string, resourceId: string, resourceType: string, comment?: string | null, media?: Array<any> | null, rating?: number | null, visitDate?: string | null, recentTrip: boolean, likesCount: number, blinded?: boolean | null, reviewedAt: string, liked: boolean, user?: { __typename?: 'User', unregister?: boolean | null, uid: string, photo?: string | null, name?: string | null, mileage?: { __typename?: 'UserMileage', level?: number | null, point?: number | null, badges?: Array<{ __typename?: 'UserMileageBadge', label?: string | null, icon?: { __typename?: 'UserMileageIcon', image_url?: string | null } | null } | null> | null } | null, userBoard?: { __typename?: 'UserBoard', trips?: number | null, reviews?: number | null, thanks?: number | null, reports?: number | null, reviewsV2?: number | null, itineraries?: number | null } | null } | null, replyBoard?: { __typename?: 'ReplyBoard', id: string, resourceId: string, resourceType: string, rootMessagesCount: number, childMessagesCount: number, pinnedMessagesCount: number, pinnedMessages: Array<{ __typename?: 'ReplyMessage', createdAt: string, updatedAt: string, content: { __typename?: 'ReplyMessageContent', text?: string | null, markdownText?: string | null }, writer?: { __typename?: 'ReplyUser', name: string } | null }> } | null, purchaseInfo?: { __typename?: 'ReviewPurchaseInfo', orderId: string, displayName: string, purchaseDate: string, purchaseCount: number } | null } | null };

export type GetReviewSpecificationQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
}>;


export type GetReviewSpecificationQuery = { __typename?: 'Query', reviewsSpecification?: { __typename?: 'ReviewSpecification', rating?: { __typename?: 'ReviewRatingSpecification', required?: boolean | null, description?: Array<string> | null } | null } | null };

export type GetReviewsCountQueryVariables = Exact<{
  resourceType: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  recentTrip?: InputMaybe<Scalars['Boolean']['input']>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetReviewsCountQuery = { __typename?: 'Query', reviewsCount: number };

export const BaseUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}}]} as unknown as DocumentNode;
export const BasePinnedMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const BaseReviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const BaseReviewSpecificationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReviewSpecification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewSpecification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode;
export const LikeReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export const UnlikeReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}}}]}]}}]} as unknown as DocumentNode;
export const DeleteReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export const GetPopularReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPopularReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"popularReviews"},"name":{"kind":"Name","value":"getPopularReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMedia"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetLatestReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatestReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"latestReviews"},"name":{"kind":"Name","value":"getLatestReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMedia"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetReviewsByRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewsByRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortByRatingsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"ratingReviews"},"name":{"kind":"Name","value":"getReviewsByRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMedia"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetMyReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"myReview"},"name":{"kind":"Name","value":"getMyReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"visitDate"}},{"kind":"Field","name":{"kind":"Name","value":"recentTrip"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"blinded"}},{"kind":"Field","name":{"kind":"Name","value":"reviewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"rootMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"childMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasePinnedMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregister"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"mileage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userBoard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"thanks"}},{"kind":"Field","name":{"kind":"Name","value":"reports"}},{"kind":"Field","name":{"kind":"Name","value":"reviewsV2"}},{"kind":"Field","name":{"kind":"Name","value":"itineraries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasePinnedMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"markdownText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"writer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const GetReviewSpecificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewSpecification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reviewsSpecification"},"name":{"kind":"Name","value":"getReviewSpecification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseReviewSpecification"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseReviewSpecification"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewSpecification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode;
export const GetReviewsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reviewsCount"},"name":{"kind":"Name","value":"getReviewsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"recentTrip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recentTrip"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasMedia"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasMedia"}}}]}]}}]} as unknown as DocumentNode;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
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
    GetReviewsByRating(variables: GetReviewsByRatingQueryVariables, options?: C): Promise<GetReviewsByRatingQuery> {
      return requester<GetReviewsByRatingQuery, GetReviewsByRatingQueryVariables>(GetReviewsByRatingDocument, variables, options) as Promise<GetReviewsByRatingQuery>;
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
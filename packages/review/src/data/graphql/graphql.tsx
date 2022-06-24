import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
  JSON: unknown
}

export type ScrapType =
  | 'ALL'
  | 'ARTICLE'
  | 'ARTICLES'
  | 'ATTRACTION'
  | 'ATTRACTIONS'
  | 'HOTEL'
  | 'HOTELS'
  | 'POI'
  | 'POIS'
  | 'RESTAURANT'
  | 'RESTAURANTS'

export type BaseReviewReactionFragment = {
  __typename: 'ReviewReaction'
  id: string
  type: string
  updatedAt: string
  createdAt: string
  user: {
    __typename: 'User'
    email: string | null
    unregister: boolean | null
    uid: string | null
    photo: string | null
    name: string | null
    mileage: {
      __typename: 'UserMileage'
      level: number | null
      point: number | null
    } | null
  }
  review: {
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    regionId: string | null
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    geotags: Array<unknown>
    blinded: boolean | null
    createdAt: string
    updatedAt: string | null
    liked: boolean
    user: {
      __typename: 'User'
      email: string | null
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      resourceId: string
      resourceType: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  }
}

export type LikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type LikeReviewMutation = {
  __typename: 'Mutation'
  likeReview: {
    __typename: 'ReviewReaction'
    id: string
    type: string
    updatedAt: string
    createdAt: string
    user: {
      __typename: 'User'
      email: string | null
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
    }
    review: {
      __typename: 'Review'
      id: string
      resourceId: string
      resourceType: string
      regionId: string | null
      comment: string | null
      media: Array<unknown> | null
      rating: number | null
      visitDate: string | null
      recentTrip: boolean
      likesCount: number
      geotags: Array<unknown>
      blinded: boolean | null
      createdAt: string
      updatedAt: string | null
      liked: boolean
      user: {
        __typename: 'User'
        email: string | null
        unregister: boolean | null
        uid: string | null
        photo: string | null
        name: string | null
        mileage: {
          __typename: 'UserMileage'
          level: number | null
          point: number | null
        } | null
        userBoard: {
          __typename: 'UserBoard'
          trips: number | null
          reviews: number | null
          thanks: number | null
          reports: number | null
          reviewsV2: number | null
          itineraries: number | null
        } | null
      } | null
      replyBoard: {
        __typename: 'ReplyBoard'
        id: string
        resourceId: string
        resourceType: string
        rootMessagesCount: number
        childMessagesCount: number
      } | null
    }
  } | null
}

export type UnlikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type UnlikeReviewMutation = {
  __typename: 'Mutation'
  unlikeReview: {
    __typename: 'ReviewReaction'
    id: string
    type: string
    updatedAt: string
    createdAt: string
    user: {
      __typename: 'User'
      email: string | null
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
    }
    review: {
      __typename: 'Review'
      id: string
      resourceId: string
      resourceType: string
      regionId: string | null
      comment: string | null
      media: Array<unknown> | null
      rating: number | null
      visitDate: string | null
      recentTrip: boolean
      likesCount: number
      geotags: Array<unknown>
      blinded: boolean | null
      createdAt: string
      updatedAt: string | null
      liked: boolean
      user: {
        __typename: 'User'
        email: string | null
        unregister: boolean | null
        uid: string | null
        photo: string | null
        name: string | null
        mileage: {
          __typename: 'UserMileage'
          level: number | null
          point: number | null
        } | null
        userBoard: {
          __typename: 'UserBoard'
          trips: number | null
          reviews: number | null
          thanks: number | null
          reports: number | null
          reviewsV2: number | null
          itineraries: number | null
        } | null
      } | null
      replyBoard: {
        __typename: 'ReplyBoard'
        id: string
        resourceId: string
        resourceType: string
        rootMessagesCount: number
        childMessagesCount: number
      } | null
    }
  } | null
}

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteReviewMutation = {
  __typename: 'Mutation'
  deleteReview: boolean
}

export type BaseReviewFragment = {
  __typename: 'Review'
  id: string
  resourceId: string
  resourceType: string
  regionId: string | null
  comment: string | null
  media: Array<unknown> | null
  rating: number | null
  visitDate: string | null
  recentTrip: boolean
  likesCount: number
  geotags: Array<unknown>
  blinded: boolean | null
  createdAt: string
  updatedAt: string | null
  liked: boolean
  user: {
    __typename: 'User'
    email: string | null
    unregister: boolean | null
    uid: string | null
    photo: string | null
    name: string | null
    mileage: {
      __typename: 'UserMileage'
      level: number | null
      point: number | null
    } | null
    userBoard: {
      __typename: 'UserBoard'
      trips: number | null
      reviews: number | null
      thanks: number | null
      reports: number | null
      reviewsV2: number | null
      itineraries: number | null
    } | null
  } | null
  replyBoard: {
    __typename: 'ReplyBoard'
    id: string
    resourceId: string
    resourceType: string
    rootMessagesCount: number
    childMessagesCount: number
  } | null
}

export type BaseReviewSpecificationFragment = {
  __typename: 'ReviewSpecification'
  rating: {
    __typename: 'ReviewRatingSpecification'
    required: boolean | null
    description: Array<string> | null
  } | null
  comment: {
    __typename: 'ReviewCommentSpecification'
    required: boolean | null
    maxLength: number
    placeholder: string
  }
  media: {
    __typename: 'ReviewMediaSpecification'
    required: boolean | null
    maxCount: number
  }
}

export type GetLatestReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
  recentTrip: InputMaybe<Scalars['Boolean']>
  from: InputMaybe<Scalars['Int']>
  size: InputMaybe<Scalars['Int']>
}>

export type GetLatestReviewsQuery = {
  __typename: 'Query'
  getLatestReviews: Array<{
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    regionId: string | null
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    geotags: Array<unknown>
    blinded: boolean | null
    createdAt: string
    updatedAt: string | null
    liked: boolean
    user: {
      __typename: 'User'
      email: string | null
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      resourceId: string
      resourceType: string
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
  __typename: 'Query'
  getMyReview: {
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    regionId: string | null
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    geotags: Array<unknown>
    blinded: boolean | null
    createdAt: string
    updatedAt: string | null
    liked: boolean
    user: {
      __typename: 'User'
      email: string | null
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      resourceId: string
      resourceType: string
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
  __typename: 'Query'
  getReviewSpecification: {
    __typename: 'ReviewSpecification'
    rating: {
      __typename: 'ReviewRatingSpecification'
      required: boolean | null
      description: Array<string> | null
    } | null
    comment: {
      __typename: 'ReviewCommentSpecification'
      required: boolean | null
      maxLength: number
      placeholder: string
    }
    media: {
      __typename: 'ReviewMediaSpecification'
      required: boolean | null
      maxCount: number
    }
  } | null
}

export type GetReviewsCountQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetReviewsCountQuery = {
  __typename: 'Query'
  getReviewsCount: number
}

export declare const BaseReviewReaction: import('graphql').DocumentNode
export declare const LikeReview: import('graphql').DocumentNode
export declare const UnlikeReview: import('graphql').DocumentNode
export declare const DeleteReview: import('graphql').DocumentNode
export declare const BaseReview: import('graphql').DocumentNode
export declare const BaseReviewSpecification: import('graphql').DocumentNode
export declare const GetLatestReviews: import('graphql').DocumentNode
export declare const GetMyReview: import('graphql').DocumentNode
export declare const GetReviewSpecification: import('graphql').DocumentNode
export declare const GetReviewsCount: import('graphql').DocumentNode
export const BaseReviewFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BaseReview' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Review' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resourceType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'regionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'comment' } },
          { kind: 'Field', name: { kind: 'Name', value: 'media' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
          { kind: 'Field', name: { kind: 'Name', value: 'visitDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'recentTrip' } },
          { kind: 'Field', name: { kind: 'Name', value: 'likesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'geotags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blinded' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'unregister' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'photo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mileage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'point' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userBoard' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'trips' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reviews' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'thanks' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reports' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reviewsV2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'itineraries' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'replyBoard' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resourceId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'resourceType' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rootMessagesCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'childMessagesCount' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'liked' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BaseReviewFragment, unknown>
export const BaseReviewReactionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BaseReviewReaction' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ReviewReaction' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'unregister' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'photo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'mileage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'point' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'review' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReview' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
        ],
      },
    },
    ...BaseReviewFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<BaseReviewReactionFragment, unknown>
export const BaseReviewSpecificationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BaseReviewSpecification' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ReviewSpecification' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rating' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'required' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'required' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxLength' } },
                { kind: 'Field', name: { kind: 'Name', value: 'placeholder' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'media' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'required' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxCount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BaseReviewSpecificationFragment, unknown>
export const LikeReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LikeReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reviewId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'likeReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reviewId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reviewId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReviewReaction' },
                },
              ],
            },
          },
        ],
      },
    },
    ...BaseReviewReactionFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<LikeReviewMutation, LikeReviewMutationVariables>
export const UnlikeReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UnlikeReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reviewId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unlikeReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reviewId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reviewId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReviewReaction' },
                },
              ],
            },
          },
        ],
      },
    },
    ...BaseReviewReactionFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UnlikeReviewMutation,
  UnlikeReviewMutationVariables
>
export const DeleteReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>
export const GetLatestReviewsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLatestReviews' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'recentTrip' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'from' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'size' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getLatestReviews' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recentTrip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'recentTrip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'from' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'size' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'size' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReview' },
                },
              ],
            },
          },
        ],
      },
    },
    ...BaseReviewFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetLatestReviewsQuery,
  GetLatestReviewsQueryVariables
>
export const GetMyReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMyReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMyReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReview' },
                },
              ],
            },
          },
        ],
      },
    },
    ...BaseReviewFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetMyReviewQuery, GetMyReviewQueryVariables>
export const GetReviewSpecificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReviewSpecification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getReviewSpecification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'BaseReviewSpecification' },
                },
              ],
            },
          },
        ],
      },
    },
    ...BaseReviewSpecificationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetReviewSpecificationQuery,
  GetReviewSpecificationQueryVariables
>
export const GetReviewsCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetReviewsCount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceType' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'resourceId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getReviewsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceType' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resourceId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'resourceId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetReviewsCountQuery,
  GetReviewsCountQueryVariables
>

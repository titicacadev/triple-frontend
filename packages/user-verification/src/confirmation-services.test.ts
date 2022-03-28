import { get } from '@titicaca/fetcher'

import { confirmVerification } from './confirmation-services'

jest.mock('@titicaca/fetcher')

afterEach(() => {
  ;(get as unknown as jest.MockedFunction<typeof get>).mockRestore()
})

describe('confirmVerification', () => {
  describe('sms-verification', () => {
    it('returns not-verified state when it is not verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 404,
          parsedBody: { message: 'not found' },
          ok: false,
        }),
      )

      expect(await confirmVerification('sms-verification')).toStrictEqual({
        verified: false,
      })
      expect(getMock).toHaveBeenCalledWith('/api/users/smscert')
    })

    it('returns verified state when it is verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 200,
          parsedBody: {
            phoneId: 123,
            phoneNumber: '+821012345678',
            os: 'ios 15.2.1',
            certificated: true,
            certificatedAt: 1645575936545,
            verified: true,
            verifiedAt: 1645575936545,
            formatted: {
              phoneNumber: '01012345678',
              countryCallingCode: 82,
              countryCode: 'KR',
            },
          },
          ok: true,
        }),
      )
      const result = await confirmVerification('sms-verification')

      expect(getMock).toHaveBeenCalledWith('/api/users/smscert')
      expect(result).toHaveProperty('verified', true)
      expect(result).toHaveProperty('phoneNumber', '+821012345678')
    })

    it('returns undefined state when it is responded with an error', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 500,
          parsedBody: {
            message: 'internal server error',
          },
          ok: false,
        }),
      )
      const result = await confirmVerification('sms-verification')

      expect(getMock).toHaveBeenCalledWith('/api/users/smscert')
      expect(result).toHaveProperty('verified', undefined)
    })
  })

  describe('personal-id-verification-with-residence', () => {
    it('returns not-verified state when it is not verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 404,
          parsedBody: { message: 'not found' },
          ok: false,
        }),
      )

      expect(
        await confirmVerification('personal-id-verification-with-residence'),
      ).toStrictEqual({
        verified: false,
      })
      expect(getMock).toHaveBeenCalledWith('/api/users/kto-stay-2021')
    })

    it('returns verified state when it is verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 200,
          parsedBody: {
            userId: 28,
            residence: [
              {
                key: 'korea-sido',
                value: '11',
              },
              {
                key: 'korea-sgg',
                value: '11710',
              },
            ],
            nameChecked: true,
            phoneNumber: '01012345678',
          },
          ok: true,
        }),
      )
      const result = await confirmVerification(
        'personal-id-verification-with-residence',
      )

      expect(result).toHaveProperty('verified', true)
      expect(result).toHaveProperty('phoneNumber', '01012345678')
      expect(getMock).toHaveBeenCalledWith('/api/users/kto-stay-2021')
    })

    it('returns undefined state when it is responded with an error', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 500,
          parsedBody: {
            message: 'internal server error',
          },
          ok: false,
        }),
      )
      const result = await confirmVerification(
        'personal-id-verification-with-residence',
      )

      expect(result).toHaveProperty('verified', undefined)
      expect(getMock).toHaveBeenCalledWith('/api/users/kto-stay-2021')
    })
  })

  describe('personal-id-verification', () => {
    it('returns not-verified state whtn it is not verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 404,
          parsedBody: { message: 'not found' },
          ok: false,
        }),
      )

      expect(
        await confirmVerification('personal-id-verification'),
      ).toStrictEqual({
        verified: false,
      })
      expect(getMock).toHaveBeenCalledWith('/api/users/namecheck')
    })

    it('returns verified state when it is verified', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 200,
          parsedBody: {
            name: '트리플',
            birthday: '20160111',
            gender: 'MALE',
            mobile: '01012345678',
            isForeign: false,
            createdAt: '2022-02-23T00:25:36.535301',
          },
          ok: true,
        }),
      )

      const result = await confirmVerification('personal-id-verification')

      expect(getMock).toHaveBeenCalledWith('/api/users/namecheck')
      expect(result).toHaveProperty('verified', true)
      expect(result).toHaveProperty('phoneNumber', '01012345678')
    })

    it('returns undefined state when it is responded with an error', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 500,
          parsedBody: {
            message: 'internal server error',
          },
          ok: false,
        }),
      )

      const result = await confirmVerification('personal-id-verification')

      expect(getMock).toHaveBeenCalledWith('/api/users/namecheck')
      expect(result).toHaveProperty('verified', undefined)
    })
  })

  describe('external-promotion-*', () => {
    it('invokes external-promotion eligibility check api', async () => {
      const getMock = (
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 404,
          parsedBody: { message: 'not found' },
          ok: false,
        }),
      )

      expect(
        await confirmVerification('external-promotion-kto-stay-2022'),
      ).toStrictEqual({
        verified: false,
      })
      expect(getMock).toHaveBeenCalledWith(
        '/api/users/external-promotion/kto-stay-2022/eligibility',
      )
    })

    it('returns not-verified state when it is not verified', async () => {
      ;(
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 404,
          parsedBody: { message: 'not found' },
          ok: false,
        }),
      )

      expect(
        await confirmVerification('external-promotion-kto-stay-2022'),
      ).toStrictEqual({
        verified: false,
      })
    })

    it('returns verified state when it is verified', async () => {
      ;(
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 200,
          parsedBody: {
            userId: 28,
            residence: [
              {
                key: 'korea-sido',
                value: '11',
              },
              {
                key: 'korea-sgg',
                value: '11710',
              },
            ],
            nameChecked: true,
            phoneNumber: '01012345678',
          },
          ok: true,
        }),
      )
      const result = await confirmVerification(
        'external-promotion-kto-stay-2022',
      )

      expect(result).toHaveProperty('verified', true)
      expect(result).toHaveProperty('phoneNumber', '01012345678')
    })

    it('returns undefined state when it is responded with an error', async () => {
      ;(
        get as unknown as jest.MockedFunction<
          () => Promise<{
            status: number
            parsedBody: unknown
            ok: boolean
          }>
        >
      ).mockImplementation(() =>
        Promise.resolve({
          status: 500,
          parsedBody: {
            message: 'internal server error',
          },
          ok: false,
        }),
      )
      const result = await confirmVerification(
        'external-promotion-kto-stay-2022',
      )

      expect(result).toHaveProperty('verified', undefined)
    })
  })
})

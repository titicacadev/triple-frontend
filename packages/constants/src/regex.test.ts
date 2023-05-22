import { EMAIL_REGEX } from './regex'

const testIsInvalidEmail = (email: string) => !EMAIL_REGEX.test(email)
const testIsValidEmail = (email: string) => EMAIL_REGEX.test(email)

test('영문, 숫자, 특수문자 +-_. 이외의 문자가 포함되어 있으면(@는 1회만 허용) 유효하지 않은 이메일 주소입니다', async () => {
  const INVALID_USER_ID_CHAR = [
    '^test@triple-corp.com',
    'test‼️@triple-corp.com',
    'test@$triple-corp.com',
    'test@triple#-corp.com',
    'test@triple-~corp.com',
    'test@triple-corp.com*',
    'test@triple@corp.com',
    'test@triple-corp.com@',
  ]
  expect(INVALID_USER_ID_CHAR.every(testIsInvalidEmail)).toBe(true)
})

test('사용자 ID가 영문, 숫자, 특수문자 +-_로 시작하지 않으면 유효하지 않은 이메일 주소입니다.', async () => {
  const INVALID_INIT_CHAR = ['.test@triple-corp.com']
  expect(INVALID_INIT_CHAR.every(testIsInvalidEmail)).toBe(true)
  const VALID_INIT_CHAR = [
    '+test@triple-corp.com',
    '-test@triple-corp.com',
    '_test@triple-corp.com',
  ]
  expect(VALID_INIT_CHAR.every(testIsValidEmail)).toBe(true)
})

test('사용자 ID에 .이 포함되어 있을 때 바로 다음 문자가 영문, 숫자, 특수문자 +-_로 시작하지 않으면 유효하지 않은 이메일 주소입니다.', async () => {
  const NOT_SINGLE_DOT = ['t..est@triple-corp.com', 'test..@triple-corp.com']
  expect(NOT_SINGLE_DOT.every(testIsInvalidEmail)).toBe(true)
})

test('-(하이픈)이 도메인 주소 시작 또는 끝에 존재하면 유효하지 않은 이메일 주소입니다.', async () => {
  const INVALID_DOMAIN_NAME = [
    'test@triple-corp-.com',
    'test@-triple-corp.com',
    'test@-triple-corp-.com',
  ]
  expect(INVALID_DOMAIN_NAME.every(testIsInvalidEmail)).toBe(true)
})

test('2글자 이상의 최상위 도메인 주소가 존재하지 않으면 유효하지 않은 이메일 주소입니다.', async () => {
  const INVALID_DOMAIN_NAME = ['test@triple-corp.c', 'test@triple.corp.c']
  expect(INVALID_DOMAIN_NAME.every(testIsInvalidEmail)).toBe(true)
  const VALID_DOMAIN_NAME = [
    'test@triple.corp.co',
    'test@triple.corp.com',
    'test@triple-corp.com',
  ]
  expect(VALID_DOMAIN_NAME.every(testIsValidEmail)).toBe(true)
})

export interface EnvValue {
  /**
   * 앱을 여는데 필요한 scheme
   */
  appUrlScheme: string
  /**
   * 서비스 path 앞에 붙여서 URL을 만드는 값
   */
  webUrlBase: string
  /**
   * facebook에 등록된 App ID. Facebook Open Graph 관련 태그로 사용합니다.
   */
  facebookAppId: string
  /**
   * 페이지의 기본 제목. title 태그의 기본값이 됩니다.
   */
  defaultPageTitle: string
  /**
   * 페이지의 기본 설명. meta[name="description"] 태그의 기본 content가 됩니다.
   */
  defaultPageDescription: string
  /**
   *  구글 맵 API Key
   */
  googleMapsApiKey?: string
  /**
   * 디퍼드 딥링크의 도메인을 생성할 때 필요한 값입니다.
   */
  afOnelinkSubdomain: string
  /**
   * AppsFlyer에 등록된 앱 ID입니다.
   */
  afOnelinkId: string
  /**
   * 미디어 소스 이름을 의미하며, 모든 측정 링크에서 반드시 포함되어야 할 유일하고 중요한 파라미터입니다.
   */
  afOnelinkPid: string
}

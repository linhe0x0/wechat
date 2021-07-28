import logger from '../helpers/logger'
import request from '../helpers/request'
import { MINAPP_API_HOST, MINAPP_AUTH_CODE2SESSION } from './constants'
import { SDK } from './types'

type GrantType = 'authorization_code'

export interface Code2SessionResponse {
  openid: string
  session_key: string
  unionid?: string
}

export async function code2Session(
  this: SDK,
  code: string,
  grantType: GrantType = 'authorization_code'
): Promise<Code2SessionResponse> {
  const url = `${MINAPP_API_HOST}${MINAPP_AUTH_CODE2SESSION}`

  logger.debug('call auth.code2Session api.', { code, grantType })

  return request.get<Code2SessionResponse>(url, {
    appid: this.appID,
    secret: this.appSecret,
    js_code: code,
    grantType,
  })
}

export interface AuthAPI {
  code2Session: (
    code: string,
    grantType?: GrantType
  ) => Promise<Code2SessionResponse>
}

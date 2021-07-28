import _ from 'lodash'

import logger from '../helpers/logger'
import request from '../helpers/request'
import {
  MINAPP_API_HOST,
  MINAPP_SUBSCRIBEMESSAGE_SEND,
  MINAPP_UNIFORMMESSAGE_SEND,
} from './constants'
import { SDK } from './types'

export interface SubscribeMessagePayload {
  accessToken: string
  toUser: string
  templateID: string
  page?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  miniprogramState?: string
  lang?: string
}

export async function sendSubscribeMessage(
  this: SDK,
  payload: SubscribeMessagePayload
): Promise<void> {
  const url = `${MINAPP_API_HOST}${MINAPP_SUBSCRIBEMESSAGE_SEND}`

  _.assign(payload, {
    access_token: payload.accessToken,
    touser: payload.toUser,
    template_id: payload.templateID,
    miniprogram_state: payload.miniprogramState,
  })

  logger.debug('call subscribeMessage.send api.', payload)

  return request.post<void>(
    `${url}?access_token=${payload.accessToken}`,
    payload
  )
}

export interface UniformMessagePayload {
  accessToken: string
  toUser: string
  weappTemplateMsg?: {
    templateID: string
    page: string
    formID: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    emphasisKeyword: string
  }
  mpTemplateMsg?: {
    appid: string
    templateID: string
    url: string
    miniprogram: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  }
}

export interface SubscribeMessageAPI {
  send: (payload: SubscribeMessagePayload) => Promise<void>
}

export async function sendUniformMessage(
  this: SDK,
  payload: UniformMessagePayload
): Promise<void> {
  const url = `${MINAPP_API_HOST}${MINAPP_UNIFORMMESSAGE_SEND}`

  _.assign(payload, {
    access_token: payload.accessToken,
    touser: payload.toUser,
  })

  if (payload.weappTemplateMsg) {
    _.assign(payload, {
      weapp_template_msg: _.assign({}, payload.weappTemplateMsg, {
        template_id: payload.weappTemplateMsg.templateID,
        form_id: payload.weappTemplateMsg.formID,
      }),
    })
  }

  if (payload.mpTemplateMsg) {
    _.assign(payload, {
      mp_template_msg: _.assign({}, payload.mpTemplateMsg, {
        template_id: payload.mpTemplateMsg.templateID,
      }),
    })
  }

  logger.debug('call uniformMessage.send api.', payload)

  return request.post<void>(
    `${url}?access_token=${payload.accessToken}`,
    payload
  )
}

export interface UniformMessageAPI {
  send: (payload: UniformMessagePayload) => Promise<void>
}

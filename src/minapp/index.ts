import { LogLevel } from 'consola'
import _ from 'lodash'

import logger from '../helpers/logger'
import { AuthAPI, code2Session } from './auth'
import {
  sendSubscribeMessage,
  sendUniformMessage,
  SubscribeMessageAPI,
  UniformMessageAPI,
} from './message'
import { decrypt, SensitiveAPI } from './sensitive'
import { SignatureAPI, verifySensitiveSignature } from './signature'
import { SDK, SDKOptions } from './types'

const defaultMinAppSDKOptions: SDKOptions = {
  debug: false,
}

export class MinApp implements SDK {
  appID = ''

  appSecret = ''

  options: SDKOptions

  auth: AuthAPI

  subscribeMessage: SubscribeMessageAPI

  uniformMessage: UniformMessageAPI

  sensitive: SensitiveAPI

  signature: SignatureAPI

  constructor(options?: Partial<SDKOptions>) {
    this.options = _.defaults(options, defaultMinAppSDKOptions)

    logger.level = this.options.debug ? LogLevel.Verbose : LogLevel.Warn

    this.auth = {
      code2Session: code2Session.bind(this),
    }

    this.subscribeMessage = {
      send: sendSubscribeMessage.bind(this),
    }

    this.uniformMessage = {
      send: sendUniformMessage.bind(this),
    }

    this.sensitive = {
      decrypt: decrypt.bind(this),
    }

    this.signature = {
      verifySensitiveSignature: verifySensitiveSignature.bind(this),
    }
  }

  init(appID: string, secret: string): MinApp {
    this.appID = appID
    this.appSecret = secret

    logger.debug(`Init minapp sdk with appID: ${appID}, secret: ${secret}`)

    return this
  }

  config(options: Partial<SDKOptions>): MinApp {
    this.options = _.assign(this.options, options)

    logger.level = this.options.debug ? LogLevel.Verbose : LogLevel.Warn

    return this
  }

  create(appID: string, secret: string, options?: Partial<SDKOptions>): MinApp {
    return new MinApp(options).init(appID, secret)
  }
}

export const minapp = new MinApp()

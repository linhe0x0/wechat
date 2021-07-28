import crypto from 'crypto'

import { d64 } from '../helpers/crypto'
import logger from '../helpers/logger'
import { SDK } from './types'

interface BaseDecryptResult {
  watermark: {
    appid: string
    timestamp: number
  }
}

export function decrypt(
  this: SDK,
  sessionKey: string,
  data: string,
  iv: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  logger.debug('call sensitive.decrypt api.', {
    sessionKey,
    data,
    iv,
  })

  const sessionKeyHex = d64(sessionKey)
  const encryptedDataHex = d64(data)
  const ivHex = d64(iv)

  const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyHex, ivHex)

  decipher.setAutoPadding(true)

  const decoded = Buffer.concat([
    decipher.update(encryptedDataHex),
    decipher.final(),
  ]).toString('utf8')

  let result: unknown

  try {
    result = JSON.parse(decoded)
  } catch (err) {
    throw Error(`Invalid payload from sensitive data. ${err.message}`)
  }

  const { watermark } = result as BaseDecryptResult

  if (watermark.appid !== this.appID) {
    throw new Error(
      `Invalid app id from sensitive data. Expect ${this.appID}, but got ${watermark.appid}`
    )
  }

  return result
}

export interface SensitiveAPI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decrypt(sessionKey: string, data: string, iv: string): any
}

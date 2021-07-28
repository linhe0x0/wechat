import crypto from 'crypto'

type HexBase64Latin1Encoding = 'hex' | 'base64'

export function sha1(
  str: string,
  encoding: HexBase64Latin1Encoding = 'hex'
): string {
  const hash = crypto.createHash('sha1')

  hash.update(str)

  return hash.digest(encoding)
}

export function b64(str: string): string {
  return Buffer.from(str).toString('base64')
}

export function d64(str: string): Buffer {
  return Buffer.from(str, 'base64')
}

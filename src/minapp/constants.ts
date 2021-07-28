export const MINAPP_API_HOST = 'https://api.weixin.qq.com'

export const MINAPP_AUTH_CODE2SESSION = '/sns/jscode2session'

export const MINAPP_SUBSCRIBEMESSAGE_SEND = '/cgi-bin/message/subscribe/send'

export const MINAPP_UNIFORMMESSAGE_SEND =
  '/cgi-bin/message/wxopen/template/uniform_send'

export const MINAPP_ERROR_MESSAGE = {
  '-1': '系统繁忙',

  '40029': '临时登录凭证 code 无效',
  '40013': '无效的小程序 app id',
  '40125': '无效的小程序 app secret',
  '40163': '临时登录凭证 code 已被使用',

  '41002': '小程序 app id 缺失',
  '41004': '小程序 app secret 缺失',
  '41008': '临时登录凭证 code 缺失',

  '45011': '频率限制',
}

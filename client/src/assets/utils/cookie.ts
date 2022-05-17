import Cookies from 'js-cookie'

// 获取cookies
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key)
}

// 设置Cookies
export const setCookie = (
  key: string,
  value: any,
  expiresTime: number,
  domain?: string
): any => {
  if (getCookie(key)?.length) {
    removeCookie(key)
  }

  const seconds = expiresTime

  const expires = new Date(+new Date() * 1 + seconds * 1000)
  if (domain) {
    return Cookies.set(key, value, { expires, domain })
  } else {
    return Cookies.set(key, value, { expires })
  }
}

// 移除Cookies
export const removeCookie = (key: string): any => {
  return Cookies.remove(key)
}

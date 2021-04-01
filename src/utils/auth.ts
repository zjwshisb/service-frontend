import Cookies from 'js-cookie'

const name = "api_token"
export function getToken(): string {
  return Cookies.get(name) ?? ''
}

export function setToken(token: string) {
  Cookies.set(name, token)
}

export function removeToken() {
  Cookies.remove(name)
}

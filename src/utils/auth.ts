import Cookies from 'js-cookie';

const name = 'Admin-Token';
export function getToken(): string {
  return Cookies.get(name) ?? '';
}

export function setToken(token: string) {
  Cookies.set(name, token);
}

export function removeToken() {
  Cookies.remove(name);
}

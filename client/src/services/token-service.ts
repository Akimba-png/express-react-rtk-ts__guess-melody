import { AUTHORIZATION } from '../constants/const';

class TokenService {
  getToken() {
    return localStorage.getItem(AUTHORIZATION);
  }

  setToken(token: string) {
    localStorage.setItem(AUTHORIZATION, token);
  }

  resetToken() {
    localStorage.setItem(AUTHORIZATION, '');
  }
}

export const tokenService = new TokenService();

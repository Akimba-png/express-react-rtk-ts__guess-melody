export const AUTHORIZATION = 'Authorization';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Signup = '/signup',
  Game = '/game',
  Success = '/success',
  Fail = '/fail',
}

export enum AuthStatus {
  Auth = 'auth',
  NotAuth = 'notAuth',
  Unknown = 'unknown',
}

export enum LoadingStatus {
  Pending = 'pending',
  Idle = 'idle',
}

export enum ApiRoute {
  BaseUrl = 'http://localhost:5000',
  Questions = '/public/question',
  Signup = '/auth/signup',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
}

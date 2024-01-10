export enum AppRoute {
  Main = '/',
  Login = '/login',
  Signup = '/signup',
  Game = '/game',
  Success = '/success',
  Fail = '/fail',
}

export enum LoadingStatus {
  Pending = 'pending',
  Idle = 'idle',
}

export enum ApiRoute {
  BaseUrl = 'http://localhost:5000',
  Questions = '/public/question',
}

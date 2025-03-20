const prefix = process.env.NODE_ENV === 'production' ? '/cv/backoffice' : '';

export const AppRoute = {
  landing: prefix + '/',
  profile: prefix + '/profile',
  users: prefix + '/users',
  userView: prefix + '/users/:id',
  transactions: prefix + '/transactions',
  transactionView: prefix + '/transaction/:id',
  login: prefix + '/login',
  logout: prefix + '/logout',
  singup: prefix + '/signup',
}

export const config = {
  matcher: ['/hanmaltok', '/hanmaltok/(.*)'],
}

const COOKIE = 'ht_auth'
const PASSWORD = process.env.ADMIN_PASSWORD || 'hanmaltok2025'

export default function middleware(req) {
  const cookie = req.cookies.get(COOKIE)
  if (cookie?.value === PASSWORD) return

  const loginUrl = new URL('/login.html', req.url)
  loginUrl.searchParams.set('next', req.nextUrl?.pathname || '/hanmaltok')
  return Response.redirect(loginUrl)
}

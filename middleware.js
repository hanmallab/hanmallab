export const config = {
  matcher: ['/hanmaltok', '/hanmaltok/(.*)'],
}

const COOKIE_NAME = 'ht_auth'
const PASSWORD = process.env.ADMIN_PASSWORD || 'hanmaltok2025'

function getCookie(request, name) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  return cookies[name]
}

export default function middleware(request) {
  const auth = getCookie(request, COOKIE_NAME)
  if (auth === PASSWORD) return  // 통과 — Vercel이 정적 파일 그대로 서빙

  const url = new URL(request.url)
  const loginUrl = new URL('/login.html', request.url)
  loginUrl.searchParams.set('next', url.pathname)
  return Response.redirect(loginUrl)
}

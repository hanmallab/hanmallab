export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { password } = req.body
  const correct = process.env.ADMIN_PASSWORD || 'hanmaltok2025'

  if (password === correct) {
    const maxAge = 60 * 60 * 24 * 7 // 7 days
    res.setHeader(
      'Set-Cookie',
      `ht_auth=${correct}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`
    )
    return res.status(200).json({ ok: true })
  }

  return res.status(401).json({ error: 'Unauthorized' })
}

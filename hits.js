// Update Version 2025-03-29
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env.HITS)
  }
}

// Replace this part with your domain and keyword(s)
const ALLOWED_DOMAIN = 'your.domain.com'
const ALLOWED_PATHS = ['keyword1', 'keyword2', 'keyword3']

async function handleRequest(request, db) {
  const url = new URL(request.url)

  if (url.hostname !== ALLOWED_DOMAIN) {
    return new Response('Not Found', { status: 404 })
  }

  const pathParts = url.pathname.split('/').filter(Boolean)
  const counterName = pathParts[0]?.replace('.svg', '')

  if (!ALLOWED_PATHS.includes(counterName)) {
    return new Response('Not Found', { status: 404 })
  }

  const action = url.searchParams.get('action') || 'view'
  const isSvg = url.pathname.endsWith('.svg')
  const today = new Date().toISOString().split('T')[0]

  const totalKey = `${counterName}:total`
  const dailyKey = `${counterName}:daily:${today}`

  let total = await getCounter(db, totalKey)
  let daily = await getCounter(db, dailyKey)

  if (action.toLowerCase() === 'hit') {
    total++
    daily++
    await updateCounter(db, totalKey, total)
    await updateCounter(db, dailyKey, daily)
  }

  if (isSvg) {
    const countBg = url.searchParams.get('count_bg') || '#79C83D'
    const titleBg = url.searchParams.get('title_bg') || '#555555'
    const title = url.searchParams.get('title') || 'Hits'
    const edgeFlat = url.searchParams.get('edge_flat') === 'true'

    const svg = generateSvg({
      title,
      titleBg,
      countBg,
      edgeFlat,
      dailyCount: daily,
      totalCount: total
    })

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  }

  const responseData = {
    counter: counterName,
    action: action,
    total: total,
    daily: daily,
    date: today,
    timestamp: new Date().toISOString()
  }

  return new Response(JSON.stringify(responseData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

async function getCounter(db, key) {
  const { results } = await db.prepare('SELECT count FROM counters WHERE name = ?').bind(key).all()
  return results.length > 0 ? results[0].count : 0
}

async function updateCounter(db, key, value) {
  await db.prepare(`
    INSERT INTO counters (name, count) 
    VALUES (?, ?) 
    ON CONFLICT(name) 
    DO UPDATE SET count = excluded.count
  `).bind(key, value).run()
}

function getTextWidth(text) {
  let width = 0
  for (const char of text) {
    width += char.charCodeAt(0) > 255 ? 14 : 7
  }
  return width + 10
}

function generateSvg({ title, titleBg, countBg, edgeFlat, dailyCount, totalCount }) {
  const borderRadius = edgeFlat ? '0' : '3'
  const countText = `${dailyCount} / ${totalCount}`
  const titleWidth = getTextWidth(title)
  const countWidth = countText.length * 7 + 10
  const width = countWidth + titleWidth

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
  <linearGradient id="smooth" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>

  <mask id="round">
    <rect width="${width}" height="20" rx="${borderRadius}" ry="${borderRadius}" fill="#fff"/>
  </mask>

  <g mask="url(#round)">
    <rect width="${titleWidth}" height="20" fill="${titleBg}"/>
    <rect x="${titleWidth}" width="${countWidth}" height="20" fill="${countBg}"/>
    <rect width="${width}" height="20" fill="url(#smooth)"/>
  </g>

  <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11">
    <text x="${titleWidth/2}" y="15" fill="#010101" fill-opacity=".3">${title}</text>
    <text x="${titleWidth/2}" y="14" fill="#fff">${title}</text>
    <text x="${titleWidth + countWidth/2}" y="15" fill="#010101" fill-opacity=".3">${countText}</text>
    <text x="${titleWidth + countWidth/2}" y="14" fill="#fff">${countText}</text>
  </g>
</svg>
  `.trim()
}

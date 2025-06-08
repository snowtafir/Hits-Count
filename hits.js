// Update Version 2025-06-08
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env.HITS)
  }
}

// Replace this part with your domain and keyword(s)
const ALLOWED_DOMAIN = 'your.domain.com'
const ALLOWED_PATHS = ['keyword1', 'keyword2', 'keyword3']

const namedColors = {
  brightgreen: '#4c1',
  green: '#97ca00',
  yellow: '#dfb317',
  yellowgreen: '#a4a61d',
  orange: '#fe7d37',
  red: '#e05d44',
  blue: '#007ec6',
  grey: '#555',
  lightgrey: '#9f9f9f',
}

const aliases = {
  gray: 'grey',
  lightgray: 'lightgrey',
  critical: 'red',
  important: 'orange',
  success: 'brightgreen',
  informational: 'blue',
  inactive: 'lightgrey',
}

async function handleRequest(request, db) {
  const url = new URL(request.url)

  if (url.hostname !== ALLOWED_DOMAIN) {
    return new Response('Not Found', { status: 404 })
  }

  const params = url.searchParams;
  const pathParts = url.pathname.split('/').filter(Boolean)
  const counterName = pathParts[0]?.replace('.svg', '')
  const histroyName = pathParts[1]?.replace('.svg', '')

  if (
    !ALLOWED_PATHS.includes(counterName) && 
    !(pathParts[0] === 'history' && ALLOWED_PATHS.includes(histroyName))
  ) {
    return new Response('Not Found', { status: 404 })
  }

  const action = params.get('action') || 'view'
  const isSvg = url.pathname === `/${counterName}.svg`
  const isHistory = pathParts[0] === 'history'
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
    const countBg = params.get('count_bg') || '#79C83D'
    const titleBg = params.get('title_bg') || '#555555'
    const title = params.get('title') || 'Hits'
    const edgeFlat = params.get('edge_flat') === 'true'

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

  if (isHistory) {
    const days = parseInt(params.get('days')) || 7;
    const chartType = params.get('chartType') || 'scatter';
    const customTitle = params.get('title') || `${histroyName} Daily Clicks (Last ${days} Days)`;
    const svgWidth = parseInt(params.get('width')) || 600;
    const svgHeight = parseInt(params.get('height')) || 400;
    const chartColor = params.get('color') || 'steelblue';

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days + 1);

    const formatDateForSQL = (date) => date.toISOString().split('T')[0];

    try {
      const query = `
        SELECT name, count 
        FROM counters 
        WHERE name LIKE ? 
        AND name LIKE '%:daily:%'
        AND DATE(SUBSTR(name, LENGTH('${histroyName}:daily:') + 1)) BETWEEN ? AND ?
        ORDER BY name ASC;
      `;
      const stmt = db.prepare(query);
      const { results } = await stmt.bind(
        `${histroyName}:daily:%`,
        formatDateForSQL(startDate),
        formatDateForSQL(endDate)
      ).all();

      if (!results || results.length === 0) {
        return new Response('No data found', { status: 404 });
      }

      const dates = results.map(row => row.name.split(':')[2]);
      const counts = results.map(row => row.count);
      const maxCount = Math.max(...counts, 1);

      const padding = Math.min(50, svgWidth * 0.08);
      const xStep = (svgWidth - 2 * padding) / (days - 1);

      let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <text x="${svgWidth / 2}" y="30" text-anchor="middle" font-family="Arial" font-size="16">
          ${customTitle}
        </text>`;

      let xshift = 0;
      if (chartType === 'bar') {
        xshift = xStep;
      }
      svg += `
        <path d="M${padding},${svgHeight - padding} L${svgWidth - padding + xshift},${svgHeight - padding}" 
              stroke="black" stroke-width="2"/>
        <path d="M${padding},${svgHeight - padding} L${padding},${padding}" 
              stroke="black" stroke-width="2"/>
      `;

      const maxTicks = 15;
      const tickInterval = Math.max(1, Math.floor(days / maxTicks));
      
      for (let i = 0; i < days; i += tickInterval) {
        let x = padding + i * xStep;
        
        if (chartType === 'bar') {
          x += xStep * 0.7;
        }
      
        const dateLabel = dates[i] ? dates[i].split('-').slice(1).join('-') : '';
        
        svg += `
          <path d="M${x},${svgHeight-padding} L${x},${svgHeight-padding+5}" 
                stroke="black" stroke-width="1"/>
          <text x="${x}" y="${svgHeight-padding+20}" 
                text-anchor="middle" font-size="10">
            ${dateLabel}
          </text>
        `;
      }

      const yStep = (svgHeight - 2 * padding) / 5;
      for (let i = 0; i <= 5; i++) {
        const y = svgHeight - padding - i * yStep;
        const value = Math.round((maxCount * i) / 5);
        svg += `
          <path d="M${padding - 5},${y} L${padding},${y}" 
                stroke="black" stroke-width="1"/>
          <text x="${padding - 10}" y="${y + 5}" 
                text-anchor="end" font-family="Arial" font-size="12">
            ${value}
          </text>
        `;
      }

      if (chartType === 'bar') {
        const barWidth = xStep * 0.618;
        const barGap = xStep * 0.382;
  
        for (let i = 0; i < counts.length; i++) {
          const x = padding + barGap + i * xStep;
          const y = svgHeight - padding - (counts[i] / maxCount) * (svgHeight - 2 * padding);
          const height = (counts[i] / maxCount) * (svgHeight - 2 * padding);
    
          svg += `
          <rect x="${x}" y="${y}" 
          width="${barWidth}" height="${height}"
          fill="${chartColor}" opacity="0.8"/>
          <text x="${x + barWidth/2}" y="${y - 5}" 
          text-anchor="middle" font-size="10">
          ${counts[i]}
          </text>
          `;
        }
      } else {
        let pathData = '';
        for (let i = 0; i < counts.length; i++) {
          const x = padding + i * xStep;
          const y = svgHeight - padding - (counts[i] / maxCount) * (svgHeight - 2 * padding);
          if (i === 0) pathData += `M${x},${y}`;
          else pathData += ` L${x},${y}`;
          
          svg += `
            <circle cx="${x}" cy="${y}" r="4" fill="${chartColor}"/>
            <text x="${x}" y="${y - 5}" 
                  text-anchor="middle" font-family="Arial" font-size="${svgWidth > 700 ? 12 : 10}">
              ${counts[i]}
            </text>
          `;
        }
        svg += `<path d="${pathData}" stroke="${chartColor}" stroke-width="2" fill="none"/>`;
      }

      svg += '</svg>';
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600',
          'Expires': new Date(Date.now() + 3600000).toUTCString()
        }
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
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

function resolveColor(color) {
  return namedColors[aliases[color] || color] || color;
}

function getTextWidth(text) {
  let width = 0
  for (const char of text) {
    width += char.charCodeAt(0) > 255 ? 14 : 7
  }
  return width + 10
}

function generateSvg({ title, titleBg = 'grey', countBg = 'green', edgeFlat, dailyCount, totalCount }) {
  const borderRadius = edgeFlat ? '0' : '3'
  const countText = `${dailyCount} / ${totalCount}`
  const titleWidth = getTextWidth(title)
  const countWidth = countText.length * 7 + 10
  const width = countWidth + titleWidth

  const resolvedTitleBg = resolveColor(titleBg)
  const resolvedCountBg = resolveColor(countBg)

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
    <rect width="${titleWidth}" height="20" fill="${resolvedTitleBg}"/>
    <rect x="${titleWidth}" width="${countWidth}" height="20" fill="${resolvedCountBg}"/>
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

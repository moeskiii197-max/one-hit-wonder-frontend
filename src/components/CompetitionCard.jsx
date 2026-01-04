import { useEffect, useMemo, useState } from 'react'

function formatEnds(endDateIso) {
  const end = new Date(endDateIso)
  if (Number.isNaN(end.getTime())) return '—'
  const diff = end.getTime() - Date.now()
  if (diff <= 0) return 'Ended'
  const d = Math.floor(diff / 86400000)
  const h = Math.floor(diff / 3600000) % 24
  const m = Math.floor(diff / 60000) % 60
  return `${d}d ${h}h ${m}m`
}

export default function CompetitionCard({ c }) {
  const [qty, setQty] = useState(1)
  const remaining = Math.max(0, (c.totalTickets ?? 0) - (c.soldTickets ?? 0))
  const odds = remaining > 0 ? `1 in ${remaining}` : 'Sold out'
  const total = (Number(c.price || 0) * qty).toFixed(2)

  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 14,
      padding: 16,
      background: 'white',
      boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{c.title}</h2>
        {c.instantWin ? (
          <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: '#ffe7e7', color: '#a40000' }}>
            Instant Win
          </span>
        ) : null}
      </div>

      <p style={{ marginTop: 8, marginBottom: 12, color: '#444' }}>{c.description}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: 13 }}>
        <div><strong>Ends:</strong> {formatEnds(c.endDate)}</div>
        <div><strong>Odds:</strong> {odds}</div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: '#555' }}>
          Tickets:{' '}
          <select value={qty} onChange={e => setQty(Number(e.target.value))} disabled={remaining === 0}>
            {[1,2,5,10,20].filter(n => n <= Math.max(1, remaining)).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <span style={{ fontSize: 13, color: '#555' }}>
          <strong>Price:</strong> {c.currency || 'GBP'} {total}
        </span>
      </div>

      <button
        disabled={remaining === 0}
        onClick={() => alert('Next step: Stripe checkout (Apple Pay / Google Pay)')}
        style={{
          marginTop: 14,
          width: '100%',
          padding: '10px 12px',
          borderRadius: 10,
          border: 'none',
          cursor: remaining === 0 ? 'not-allowed' : 'pointer',
          background: remaining === 0 ? '#ddd' : '#111',
          color: 'white',
          fontWeight: 700
        }}
      >
        Enter now
      </button>
    </div>
  )
}

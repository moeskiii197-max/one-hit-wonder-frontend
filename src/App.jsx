import { useEffect, useMemo, useState } from 'react'
import CompetitionCard from './components/CompetitionCard.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4242'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${API}/competitions`)
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        const data = await res.json()
        setCompetitions(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e?.message || 'Failed to load competitions')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif', maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0 }}>One Hit Wonder</h1>
          <p style={{ marginTop: 6, color: '#444' }}>Live competitions — choose tickets and enter.</p>
        </div>
        <a href="https://one-hit-wonder-backend.onrender.com" target="_blank" rel="noreferrer" style={{ color: '#111' }}>
          Backend status
        </a>
      </header>

      {loading && <p>Loading competitions…</p>}
      {error && (
        <div style={{ padding: 12, border: '1px solid #f3b', borderRadius: 8, color: '#900', background: '#fff5f7' }}>
          <strong>Couldn’t load competitions.</strong><div style={{ marginTop: 6 }}>{error}</div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
            Check that VITE_API_URL is set in Vercel and that your backend has a /competitions route.
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: 16,
        marginTop: 16
      }}>
        {competitions.map(c => (
          <CompetitionCard key={c.id} c={c} />
        ))}
      </div>

      <footer style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #eee', color: '#666', fontSize: 13 }}>
        Payments (Apple Pay / Google Pay) will be added next with Stripe Checkout.
      </footer>
    </div>
  )
}

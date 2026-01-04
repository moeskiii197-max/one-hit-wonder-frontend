import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CompetitionCard from "./components/CompetitionCard.jsx"
import Badge from "./components/Badge.jsx"

const API = import.meta.env.VITE_API_URL || "http://localhost:4242"

export default function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(`${API}/competitions`)
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        const data = await res.json()
        setCompetitions(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e?.message || "Failed to load competitions")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-40 left-10 h-[420px] w-[520px] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute top-52 right-10 h-[420px] w-[520px] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-glow overflow-hidden"
        >
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/25 via-sky-500/15 to-amber-500/15" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="gold">🎯 One Hit Wonder</Badge>
                <Badge tone="blue">⚡ Fast entries</Badge>
                <Badge>🍎 Apple Pay + Google Pay</Badge>
              </div>

              <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight">
                Colourful competitions. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-300 to-sky-300">Big wins.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-slate-200/90 text-lg">
                Choose your tickets, enter in seconds, and watch the countdown. Instant Win comps are clearly marked.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#competitions"
                  className="rounded-xl bg-gradient-to-r from-amber-300 via-fuchsia-300 to-sky-300 px-5 py-3 font-extrabold text-slate-950 hover:brightness-110"
                >
                  View competitions
                </a>
                <a
                  href={`${API}/health`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white/5 px-5 py-3 font-bold text-white ring-1 ring-white/10 hover:bg-white/10"
                >
                  Backend status
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div id="competitions" className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Live competitions</h2>
              <p className="text-slate-200/80 mt-1">Pick tickets. Tap enter. Payments next.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Badge tone="gold">✅ Secure checkout</Badge>
              <Badge tone="blue">📱 Mobile ready</Badge>
            </div>
          </div>

          {loading && <p className="mt-6 text-slate-200">Loading competitions…</p>}

          {error && (
            <div className="mt-6 rounded-2xl bg-rose-500/10 ring-1 ring-rose-400/30 p-4">
              <div className="font-extrabold text-rose-200">Couldn’t load competitions</div>
              <div className="mt-1 text-rose-100/80 text-sm">{error}</div>
              <div className="mt-2 text-slate-200/70 text-xs">
                Check VITE_API_URL in Vercel and that your backend has /competitions.
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {competitions.map((c, i) => (
              <CompetitionCard key={c.id || i} c={c} index={i} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-200/70">
          Next: Stripe Checkout integration. Apple Pay / Google Pay will show automatically on supported devices.
        </div>
      </div>
    </div>
  )
}

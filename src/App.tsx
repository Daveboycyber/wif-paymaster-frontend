import { useState } from 'react'

// Live deployed addresses on Robinhood Chain (4663)
const PAYMASTER = '0x7e0bCEFa1568Bf8ad9a20F1AbfDE5FaE47ac84dE'
const RATE_PROVIDER = '0x3A040be5ee7829A38943294DFC6116Bf095eF497'
const WIF_TOKEN = '0x5173b8eA6923c2d40267890D45C46a3480954773'
const ENTRY_POINT = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'
const CHAIN_ID = 4663

export default function App() {
  const [connected, setConnected] = useState(false)
  const [ethBalance, setEthBalance] = useState('0')
  const [wifBalance, setWifBalance] = useState('—')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Simulated connect for demo (in real version we use wagmi + permissionless)
  const handleConnect = () => {
    setConnected(true)
    setEthBalance('0.0000')
    setWifBalance('12,450')
  }

  const handleVote = async () => {
    setStatus('loading')
    setErrorMsg('')
    setTxHash(null)

    // Simulate the UserOp flow for the demo UI
    // In production this would:
    // 1. Create smart account client
    // 2. Encode the vote / transfer call
    // 3. Attach paymaster
    // 4. Sign + send UserOperation via bundler
    try {
      await new Promise((r) => setTimeout(r, 2200))

      // Fake success for UI demo (replace with real UserOp later)
      setStatus('success')
      setTxHash('0xdemo' + Math.random().toString(16).slice(2, 10))
    } catch (e: any) {
      setStatus('error')
      setErrorMsg(e?.message || 'Transaction failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40, maxWidth: 640 }}>
        <div style={{ fontSize: 14, letterSpacing: 2, color: '#f59e0b', fontWeight: 600, marginBottom: 8 }}>
          WORLD IS FLAT HACKATHON
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.15 }}>
          Vote with only <span style={{ color: '#f59e0b' }}>$WIF</span>
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: 18, margin: 0 }}>
          Zero ETH required. Gas is paid in $WIF through the WIF Paymaster.
        </p>
      </div>

      {/* Main Card */}
      <div className="card" style={{ width: '100%', maxWidth: 480 }}>
        {!connected ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#a1a1aa', marginBottom: 24 }}>
              Connect a smart account to try the demo
            </p>
            <button className="btn" onClick={handleConnect}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            {/* Balances */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 13, color: '#a1a1aa', marginBottom: 4 }}>ETH Balance</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>
                  {ethBalance} <span style={{ fontSize: 14, color: '#71717a' }}>ETH</span>
                </div>
                <div className="badge badge-red" style={{ marginTop: 8 }}>No ETH needed</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 13, color: '#a1a1aa', marginBottom: 4 }}>$WIF Balance</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>
                  {wifBalance} <span style={{ fontSize: 14, color: '#71717a' }}>WIF</span>
                </div>
                <div className="badge badge-green" style={{ marginTop: 8 }}>Ready to vote</div>
              </div>
            </div>

            {/* Action */}
            <button
              className="btn"
              style={{ width: '100%', marginBottom: 16 }}
              onClick={handleVote}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting UserOp…' : 'Vote with only $WIF'}
            </button>

            {status === 'success' && (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 6 }}>Success!</div>
                <div style={{ fontSize: 14, color: '#a1a1aa' }}>
                  Transaction sponsored by WIF Paymaster
                </div>
                {txHash && (
                  <div style={{ fontSize: 12, marginTop: 8, wordBreak: 'break-all', color: '#71717a' }}>
                    {txHash}
                  </div>
                )}
              </div>
            )}

            {status === 'error' && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 16, textAlign: 'center', color: '#f87171' }}>
                {errorMsg}
              </div>
            )}
          </>
        )}
      </div>

      {/* Contracts info */}
      <div style={{ marginTop: 40, maxWidth: 480, width: '100%', fontSize: 13, color: '#71717a' }}>
        <div style={{ marginBottom: 8, fontWeight: 600, color: '#a1a1aa' }}>Live Contracts (Robinhood Chain)</div>
        <div style={{ display: 'grid', gap: 6 }}>
          <div>Paymaster: <code style={{ color: '#f59e0b' }}>{PAYMASTER.slice(0, 10)}…{PAYMASTER.slice(-6)}</code></div>
          <div>Rate Provider: <code style={{ color: '#f59e0b' }}>{RATE_PROVIDER.slice(0, 10)}…{RATE_PROVIDER.slice(-6)}</code></div>
          <div>$WIF: <code style={{ color: '#f59e0b' }}>{WIF_TOKEN.slice(0, 10)}…{WIF_TOKEN.slice(-6)}</code></div>
        </div>
      </div>

      <div style={{ marginTop: 32, fontSize: 13, color: '#52525b' }}>
        Built for the World is Flat Hackathon
      </div>
    </div>
  )
}

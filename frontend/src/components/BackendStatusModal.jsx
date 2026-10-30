import React, { useState, useEffect } from 'react'
import {
  getBackendUrl,
  setBackendUrl,
  resetBackendUrl,
  checkBackendHealth,
} from '../services/api'

export default function BackendStatusModal({ isOpen, onClose, onStatusChange }) {
  const [currentUrl, setCurrentUrl] = useState(getBackendUrl())
  const [isChecking, setIsChecking] = useState(false)
  const [healthStatus, setHealthStatus] = useState(null)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setCurrentUrl(getBackendUrl())
      testConnection(getBackendUrl())
    }
  }, [isOpen])

  const testConnection = async (targetUrl = currentUrl) => {
    setIsChecking(true)
    setHealthStatus(null)
    const result = await checkBackendHealth()
    setIsChecking(false)
    setHealthStatus(result)
    if (onStatusChange) onStatusChange(result.ok)
  }

  const handleSave = () => {
    setBackendUrl(currentUrl)
    setSaveMsg('Backend URL updated!')
    setTimeout(() => setSaveMsg(''), 2500)
    testConnection(currentUrl)
  }

  const handleReset = () => {
    resetBackendUrl()
    const def = getBackendUrl()
    setCurrentUrl(def)
    setSaveMsg('Reset to default (http://10.100.1.90:8000)')
    setTimeout(() => setSaveMsg(''), 2500)
    testConnection(def)
  }

  const setPreset = (preset) => {
    setCurrentUrl(preset)
    setBackendUrl(preset)
    testConnection(preset)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div className="bg-[#090D18] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl shadow-cyan-950/60 space-y-5 text-slate-200 text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Backend Connection Settings
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-base font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Status Box */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-400">Target Server:</span>
            <span className="font-mono text-cyan-300 font-bold">{getBackendUrl()}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-slate-400">Health Endpoint:</span>
            <span className="font-mono text-slate-400 text-[11px]">GET /api/health</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
            <span className="font-mono text-slate-400">Connection Status:</span>
            {isChecking ? (
              <span className="text-amber-400 flex items-center gap-1.5 font-mono">
                <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                Probing...
              </span>
            ) : healthStatus?.ok ? (
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                ONLINE (200 OK)
              </span>
            ) : (
              <span className="text-rose-400 font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                OFFLINE / UNREACHABLE
              </span>
            )}
          </div>

          {healthStatus && !healthStatus.ok && (
            <p className="text-[11px] text-rose-400/90 font-mono pt-1">
              {healthStatus.error || `HTTP ${healthStatus.status}`} - ensure backend is running and reachable.
            </p>
          )}
        </div>

        {/* Input & Presets */}
        <div className="space-y-3">
          <label className="block text-slate-400 font-semibold font-mono text-[11px] uppercase tracking-wider">
            Backend API URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="http://10.100.1.90:8000"
              className="flex-1 bg-black/60 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              onClick={() => testConnection(currentUrl)}
              disabled={isChecking}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-mono text-xs cursor-pointer"
            >
              Test
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl font-mono text-xs cursor-pointer"
            >
              Save
            </button>
          </div>

          {saveMsg && (
            <div className="text-[11px] text-emerald-400 font-mono">
              ✓ {saveMsg}
            </div>
          )}

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase">Quick Presets:</span>
            <button
              onClick={() => setPreset('http://10.100.1.90:8000')}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-cyan-300 cursor-pointer"
            >
              10.100.1.90:8000
            </button>
            <button
              onClick={() => setPreset('http://127.0.0.1:8000')}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-slate-300 cursor-pointer"
            >
              127.0.0.1:8000 (Local)
            </button>
            <button
              onClick={() => setPreset('/api')}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-slate-300 cursor-pointer"
            >
              /api (Vite Proxy)
            </button>
          </div>
        </div>

        {/* Setup & Troubleshooting Checklist */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-[11px] text-slate-300 leading-relaxed font-mono">
          <div className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider">
            Connection Checklist (Backend Host 10.100.1.90):
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
            <li>
              <span className="text-slate-200">Bind to 0.0.0.0:</span> Run{' '}
              <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">
                uvicorn app:app --host 0.0.0.0 --port 8000
              </code>
            </li>
            <li>
              <span className="text-slate-200">CORS enabled:</span> Ensure backend has FastAPI{' '}
              <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">CORSMiddleware</code> with{' '}
              <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">allow_origins=["*"]</code>
            </li>
            <li>
              <span className="text-slate-200">Same Network:</span> Both laptops must share Wi-Fi or phone Mobile Hotspot. (Campus Wi-Fi AP Isolation may block peer-to-peer traffic).
            </li>
            <li>
              <span className="text-slate-200">Windows Firewall:</span> Allow incoming connections on port 8000 on the host machine.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-white/[0.08]">
          <button
            onClick={handleReset}
            className="text-[11px] text-slate-500 hover:text-slate-300 underline font-mono cursor-pointer"
          >
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition text-xs cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}

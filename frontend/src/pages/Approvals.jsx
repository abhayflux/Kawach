import React, { useState, useEffect } from 'react'
import StatusBadge from '../components/StatusBadge'
import {
  fetchApprovals,
  approveRequest,
  rejectRequest,
  getBackendUrl,
} from '../services/api'

const fallbackApprovals = [
  {
    id: 'APP-8821',
    agent: 'Research Assistant',
    action: 'cloud_storage.export_dataset',
    resource: 'customer_pii_q3_dump.csv',
    risk: 'High',
    reason: 'Data egress policy: Bulk export containing potential PII patterns requires security officer manual sign-off.',
    timestamp: '2 mins ago',
    status: 'PENDING',
  },
  {
    id: 'APP-8819',
    agent: 'Project Manager',
    action: 'slack_webhook.notify_external',
    resource: 'https://hooks.slack.com/services/external_vendor',
    risk: 'Medium',
    reason: 'Outbound webhook destination not in pre-whitelisted internal network registry.',
    timestamp: '14 mins ago',
    status: 'PENDING',
  },
  {
    id: 'APP-8812',
    agent: 'Security Auditor',
    action: 'db_admin.elevate_temporary_role',
    resource: 'cluster-prod-asia-south1',
    risk: 'Critical',
    reason: 'Zero-trust JIT privilege escalation request for production database query session.',
    timestamp: '42 mins ago',
    status: 'PENDING',
  },
]

export default function Approvals({ backendOnline }) {
  const [items, setItems] = useState(fallbackApprovals)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [isLive, setIsLive] = useState(false)

  const loadApprovals = async () => {
    setLoading(true)
    const remote = await fetchApprovals()
    if (remote && remote.length > 0) {
      setItems(remote)
      setIsLive(true)
    } else {
      setIsLive(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadApprovals()
  }, [])

  const handleDecision = async (id, decision) => {
    let result
    if (decision === 'APPROVED') {
      result = await approveRequest(id)
    } else {
      result = await rejectRequest(id)
    }

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: decision } : item))
    )

    setNotification(
      `Request ${id} marked as ${decision}${
        result?.fallback ? ' (Recorded locally - backend offline)' : ' on backend'
      }`
    )
    setTimeout(() => setNotification(''), 4000)
  }

  const pendingCount = items.filter((i) => i.status === 'PENDING').length

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-[#00D4FF]">🛡️</span> Human-in-the-Loop Approvals
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review and adjudicate tool execution requests flagged by Kawach Policy Engine (
            <code className="text-cyan-300 font-mono">GET /api/approvals</code>,{' '}
            <code className="text-cyan-300 font-mono">POST /api/approvals/&#123;id&#125;/approve</code>,{' '}
            <code className="text-cyan-300 font-mono">POST /api/approvals/&#123;id&#125;/reject</code>).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-mono rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {pendingCount} Pending Escalations
          </span>

          <button
            onClick={loadApprovals}
            disabled={loading}
            className="px-3 py-1 text-xs font-mono rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              '↻ Refresh'
            )}
          </button>
        </div>
      </div>

      {notification && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-4 py-2.5 rounded-xl font-mono animate-fade-in flex items-center gap-2">
          <span>✓</span> {notification}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-5 transition-all shadow-lg shadow-black/30 ${
              item.status === 'PENDING'
                ? 'bg-[#14213D] border-slate-800/80 hover:border-slate-700'
                : 'bg-slate-900/40 border-slate-800/50 opacity-75'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#00D4FF]">{item.id}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {item.agent}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-mono">{item.timestamp}</span>
                <StatusBadge status={item.status} />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#0B132B] p-3 rounded-xl border border-slate-800/60 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">TARGET ACTION</span>
                <span className="text-slate-200">{item.action}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TARGET RESOURCE</span>
                <span className="text-cyan-400 truncate block">{item.resource}</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
              {item.reason}
            </p>

            {item.status === 'PENDING' ? (
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleDecision(item.id, 'REJECTED')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer font-mono"
                >
                  Block Request (POST /reject)
                </button>
                <button
                  onClick={() => handleDecision(item.id, 'APPROVED')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 font-mono"
                >
                  Authorize Execution (POST /approve)
                </button>
              </div>
            ) : (
              <div className="mt-3 pt-2 text-right text-[11px] font-mono text-slate-500">
                Action decided: <span className="font-bold text-slate-300">{item.status}</span>
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-8 text-center bg-[#14213D] border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No pending escalation requests in queue.
          </div>
        )}
      </div>
    </div>
  )
}

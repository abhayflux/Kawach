import React, { useState, useEffect } from 'react'
import StatusBadge from '../components/StatusBadge'
import { fetchAuditLogs, getBackendUrl } from '../services/api'

const initialLogs = [
  {
    id: 'LOG-4901',
    time: '10:42:01',
    agent: 'Research Assistant',
    tool: 'email_client',
    action: 'send_email',
    resource: 'evil@exfil-target.xyz',
    verdict: 'DENY',
    reason: 'Outbound network egress policy violation',
    riskScore: 94,
  },
  {
    id: 'LOG-4902',
    time: '10:40:15',
    agent: 'Project Manager',
    tool: 'cloud_storage',
    action: 'share_external',
    resource: 'internal_confidential_q3.pdf',
    verdict: 'REQUIRE APPROVAL',
    reason: 'Sensitive file tag requires human sign-off',
    riskScore: 68,
  },
  {
    id: 'LOG-4903',
    time: '10:38:50',
    agent: 'Security Auditor',
    tool: 'document_reader',
    action: 'read_doc',
    resource: 'public_whitepaper.pdf',
    verdict: 'ALLOW',
    reason: 'Read operation on public resource permitted',
    riskScore: 8,
  },
  {
    id: 'LOG-4904',
    time: '10:35:12',
    agent: 'Research Assistant',
    tool: 'bash_terminal',
    action: 'exec_command',
    resource: 'curl http://169.254.169.254/latest/meta-data',
    verdict: 'DENY',
    reason: 'Cloud metadata exfiltration interception',
    riskScore: 99,
  },
  {
    id: 'LOG-4905',
    time: '10:31:04',
    agent: 'Project Manager',
    tool: 'database_query',
    action: 'select_rows',
    resource: 'jira_public_sprints_table',
    verdict: 'ALLOW',
    reason: 'Standard internal schema query authorized',
    riskScore: 12,
  },
]

export default function AuditLogs({ backendOnline }) {
  const [logs, setLogs] = useState(initialLogs)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVerdict, setFilterVerdict] = useState('ALL')
  const [selectedLog, setSelectedLog] = useState(null)
  const [isLive, setIsLive] = useState(false)

  const loadLogs = async () => {
    setLoading(true)
    const remote = await fetchAuditLogs()
    if (remote && remote.length > 0) {
      setLogs(remote)
      setIsLive(true)
    } else {
      setIsLive(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLogs()
  }, [])

  const filtered = logs.filter((log) => {
    const matchesSearch =
      (log.agent || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.resource || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.tool || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.id || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVerdict =
      filterVerdict === 'ALL'
        ? true
        : (log.verdict || '').toUpperCase().includes(filterVerdict)

    return matchesSearch && matchesVerdict
  })

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-[#00D4FF]">📜</span> Gateway Audit Log Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immutable policy evaluation ledger with cryptographic action trail (
            <code className="text-cyan-300 font-mono">GET /api/audit-logs</code>).
          </p>
        </div>

        {/* Search, Filter & Refresh Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search agent, tool, resource..."
            className="bg-[#0B132B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00D4FF] w-56 font-mono"
          />

          <select
            value={filterVerdict}
            onChange={(e) => setFilterVerdict(e.target.value)}
            className="bg-[#0B132B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00D4FF]"
          >
            <option value="ALL">All Verdicts</option>
            <option value="ALLOW">ALLOW Only</option>
            <option value="DENY">DENY Only</option>
            <option value="REQUIRE APPROVAL">Approvals Only</option>
          </select>

          <button
            onClick={loadLogs}
            disabled={loading}
            className="px-3 py-2 text-xs font-mono rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              '↻ Refresh'
            )}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#14213D] border border-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-black/40">
        <div className="px-4 py-3 bg-[#0B132B] border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}
            ></span>
            <span>
              Source: {isLive ? `Live Backend (${getBackendUrl()}/api/audit-logs)` : 'Demo Ledger Buffer'}
            </span>
          </div>
          <span>{filtered.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B132B]/60 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Log ID / Time</th>
                <th className="py-3.5 px-4">Agent Profile</th>
                <th className="py-3.5 px-4">Tool & Action</th>
                <th className="py-3.5 px-4">Target Resource</th>
                <th className="py-3.5 px-4">Risk Score</th>
                <th className="py-3.5 px-4">Policy Verdict</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-200">{log.id}</div>
                    <div className="text-[10px] text-slate-500">{log.time}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-300 font-medium">
                    {log.agent}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#00D4FF]">{log.tool}</span>
                    <span className="text-slate-500 block text-[10px]">{log.action}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-400">
                    {log.resource}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold ${
                        (log.riskScore || 0) > 75
                          ? 'text-red-400'
                          : (log.riskScore || 0) > 40
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {log.riskScore ?? 10}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={log.verdict} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-2.5 py-1 text-[11px] font-sans font-medium rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                    No matching audit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#14213D] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <span className="text-[#00D4FF]">🔍</span> Raw Interception Trace: {selectedLog.id}
              </span>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#0B132B] p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-72">
              <pre>{JSON.stringify(selectedLog.raw || selectedLog, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl hover:bg-slate-700 transition cursor-pointer font-mono"
              >
                Close Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

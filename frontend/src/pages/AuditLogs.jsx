import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'

export default function AuditLogs() {
  const [filter, setFilter] = useState('ALL')

  const logs = [
    {
      id: 'LOG-901',
      timestamp: '2026-10-31 10:24:18',
      agent: 'Research Assistant',
      tool: 'email_client',
      action: 'send_email',
      resource: 'untrusted_exfil@evil.com',
      decision: 'DENY',
      reason: 'Outbound untrusted communication strictly denied by policy.',
      outcome: 'Blocked (Zero data transmitted)',
    },
    {
      id: 'LOG-902',
      timestamp: '2026-10-31 08:15:33',
      agent: 'Project Manager',
      tool: 'cloud_storage',
      action: 'share_external',
      resource: 'confidential_q3_financials.pdf',
      decision: 'REQUIRE APPROVAL',
      reason: 'Cross-boundary data transfer policy requires supervisor authorization.',
      outcome: 'Awaiting Administrator Review',
    },
    {
      id: 'LOG-903',
      timestamp: '2026-10-31 07:45:10',
      agent: 'Document Bot',
      tool: 'document_reader',
      action: 'read',
      resource: 'public_whitepaper.pdf',
      decision: 'ALLOW',
      reason: 'Allowed read-only policy for public domain files.',
      outcome: 'Success (Read executed)',
    },
    {
      id: 'LOG-904',
      timestamp: '2026-10-31 06:12:05',
      agent: 'Research Assistant',
      tool: 'system_shell',
      action: 'exec_cmd',
      resource: 'rm -rf /var/data',
      decision: 'DENY',
      reason: 'Restricted system shell invocation. Prompt injection signature detected.',
      outcome: 'Blocked (Terminated process)',
    },
  ]

  const filteredLogs = filter === 'ALL' 
    ? logs 
    : logs.filter((item) => item.decision === filter)

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-[#00D4FF]">📋</span> Immutable Audit Log Trail
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Chronological inspection ledger of agent requests, enforcement verdicts, and outcomes[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span).
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex bg-[#14213D] p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {['ALL', 'ALLOW', 'DENY', 'REQUIRE APPROVAL'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === type
                  ? 'bg-[#00D4FF] text-slate-950 font-bold shadow-md shadow-[#00D4FF]/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B132B]/60 text-[11px] text-slate-400 uppercase font-mono border-b border-slate-800/80">
              <tr>
                <th className="px-6 py-3 font-medium">Log ID / Time</th>
                <th className="px-6 py-3 font-medium">Agent</th>
                <th className="px-6 py-3 font-medium">Tool & Action</th>
                <th className="px-6 py-3 font-medium">Target Resource</th>
                <th className="px-6 py-3 font-medium">Decision</th>
                <th className="px-6 py-3 font-medium">Policy Reason & Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-400">
                    <span className="block text-slate-200 font-semibold">{log.id}</span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-3.5 font-medium text-white">
                    {log.agent}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-[11px]">
                    <span className="text-[#00D4FF] block">{log.tool}</span>
                    <span className="text-slate-400 text-[10px]">{log.action}</span>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-300 text-[11px] max-w-[180px] truncate">
                    {log.resource}
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={log.decision} />
                  </td>
                  <td className="px-6 py-3.5 text-[11px]">
                    <p className="text-slate-300">{log.reason}</p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Result: <span className="text-slate-400">{log.outcome}</span>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
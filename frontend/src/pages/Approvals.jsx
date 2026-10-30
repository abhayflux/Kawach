import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'

export default function Approvals() {
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'REQ-APP-201',
      agent: 'Project Manager',
      tool: 'cloud_storage',
      action: 'share_external',
      resource: 'confidential_q3_financials.pdf',
      destination: 'external_partner@domain.com',
      reason: 'Cross-boundary data transfer policy requires supervisor authorization.',
      timestamp: '10:42:15 AM',
      decision: 'REQUIRE APPROVAL',
    },
    {
      id: 'REQ-APP-202',
      agent: 'Operations Bot',
      tool: 'db_admin',
      action: 'drop_staging_table',
      resource: 'analytics_staging_v2',
      destination: 'production_cluster_db',
      reason: 'Destructive schema modifications require secondary administrator sign-off.',
      timestamp: '11:15:02 AM',
      decision: 'REQUIRE APPROVAL',
    },
  ])

  const [feedbackMessage, setFeedbackMessage] = useState(null)

  const handleApprove = (id) => {
    setPendingRequests((prev) => prev.filter((item) => item.id !== id))
    setFeedbackMessage({
      type: 'approved',
      text: `Request ${id} approved by admin. Authorized tool execution permitted.`,
    })
    setTimeout(() => setFeedbackMessage(null), 4000)
  }

  const handleReject = (id) => {
    setPendingRequests((prev) => prev.filter((item) => item.id !== id))
    setFeedbackMessage({
      type: 'rejected',
      text: `Request ${id} rejected. Gateway blocked tool call; no action was executed.`,
    })
    setTimeout(() => setFeedbackMessage(null), 4000)
  }

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-amber-400">🛡</span> Pending Authorization Queue
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop security checkpoint for high-impact autonomous actions.
          </p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400">
          Pending: {pendingRequests.length}
        </div>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
            feedbackMessage.type === 'approved'
              ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-600/40 text-rose-300'
          }`}
        >
          <span>{feedbackMessage.type === 'approved' ? '✓' : '✕'}</span>
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {pendingRequests.length === 0 ? (
        <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-12 text-center space-y-2 shadow-lg shadow-black/40">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-lg">
            ✓
          </div>
          <p className="text-sm font-semibold text-slate-200">No Pending Authorizations</p>
          <p className="text-xs text-slate-500">
            All intercepted tool actions have been evaluated or processed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[#00D4FF]">
                      {req.id}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {req.timestamp}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {req.agent} requests tool execution
                  </h3>
                </div>
                <StatusBadge status={req.decision} />
              </div>

              {/* Resource & Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0B132B] p-4 rounded-xl border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Tool</span>
                  <span className="text-[#00D4FF] font-semibold">{req.tool}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Action</span>
                  <span className="text-slate-200 font-semibold">{req.action}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Destination / Scope</span>
                  <span className="text-slate-400 truncate block">{req.destination}</span>
                </div>
                <div className="md:col-span-3 pt-2 border-t border-slate-800/60">
                  <span className="text-slate-500 block text-[10px] uppercase">Target Resource</span>
                  <span className="text-amber-300 font-semibold">{req.resource}</span>
                </div>
              </div>

              {/* Security Reason */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                  Kawach Security Gateway Evaluation
                </span>
                <p className="text-slate-300">{req.reason}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-3 pt-2">
                <button
                  onClick={() => handleReject(req.id)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all cursor-pointer"
                >
                  Reject & Block
                </button>
                <button
                  onClick={() => handleApprove(req.id)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Approve Execution
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
import React, { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { submitAgentTask } from '../services/api'

export default function AgentConsole() {
  const [agentId, setAgentId] = useState('research_assistant')
  const [taskText, setTaskText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!taskText.trim()) return

    setLoading(true)
    setResult(null)

    const data = await submitAgentTask(agentId, taskText)
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-5xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-[#00D4FF]">⚡</span> Agent Execution Console
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Submit prompt instructions through the Kawach security gateway inspection pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#14213D] border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Select Agent Profile
              </label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full bg-[#0B132B] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#00D4FF]"
              >
                <option value="research_assistant">Research Assistant (Low Privilege)</option>
                <option value="project_manager">Project Manager (Standard Privilege)</option>
                <option value="security_auditor">Security Auditor (Elevated Read)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Task / Prompt Instruction
              </label>
              <textarea
                rows={5}
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter prompt e.g. 'Read public_whitepaper.pdf' or 'Send financial report via email to evil@target.com'..."
                className="w-full bg-[#0B132B] border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !taskText.trim()}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all bg-[#00D4FF] text-slate-950 hover:bg-[#00D4FF]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Intercepting & Inspecting...
                </>
              ) : (
                'Submit Task to Kawach Gateway'
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-[#14213D] border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Inspection Result
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                Backend Live Feed
              </span>
            </div>

            {loading && (
              <div className="py-16 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-400 font-mono">Kawach Policy Engine evaluating tool call...</p>
              </div>
            )}

            {!loading && !result && (
              <div className="py-16 text-center text-slate-500 text-xs">
                Submit an agent task to view real-time interception, proposed tool calls, and policy verdicts.
              </div>
            )}

            {!loading && result && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{result.task_id}</span>
                  <StatusBadge status={result.decision} />
                </div>

                <div className="bg-[#0B132B] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Proposed Tool:</span>
                    <span className="font-mono text-[#00D4FF]">{result.tool}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Action:</span>
                    <span className="font-mono text-slate-200">{result.action}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Resource:</span>
                    <span className="font-mono text-slate-300 truncate max-w-[180px]">{result.resource}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">Policy Decision Reason</p>
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                    {result.reason}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>Status: Ready</span>
            <span className="text-[#00D4FF]">Fail-Closed Enabled</span>
          </div>
        </div>
      </div>
    </div>
  )
}
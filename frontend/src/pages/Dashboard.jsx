

export default function Dashboard() {
  return (
    <div className="space-y-6 text-[#E6F1FF]">
      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Card 1: Policy Compliance Ring */}
        <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-4 h-4 rounded-full border border-cyan-400 flex items-center justify-center text-[10px] text-cyan-400">✓</span>
            <span>GATEWAY COMPLIANCE</span>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D4FF]"
                  strokeDasharray="98, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold font-mono text-white">98%</span>
                <span className="block text-[9px] text-slate-400 uppercase tracking-tighter">Compliant</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <div className="text-[11px] text-slate-400">Total Requests <span className="font-bold text-white ml-2">482</span></div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"></span>Safe</span>
                <span className="font-mono text-white">473</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Violations</span>
                <span className="font-mono text-rose-400">9</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 flex items-center gap-1.5">
            <span className="text-xs">✓</span> Strict Policy Guard Enforced
          </div>
        </div>

        {/* Card 2: Active Agents Gauge */}
        <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-[#00D4FF]">⊞</span>
            <span>PROTECTED AGENTS</span>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D4FF]"
                  strokeDasharray="92, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold font-mono text-white">247</span>
                <span className="block text-[9px] text-slate-400 uppercase tracking-tighter">Protected</span>
              </div>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"></span>Active</span>
                <span className="font-mono text-white">241</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Restricted</span>
                <span className="font-mono text-amber-300">4</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>Offline</span>
                <span className="font-mono text-slate-400">2</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 flex items-center gap-1.5">
            <span className="text-xs">✓</span> All Agent Tool Access Monitored
          </div>
        </div>

        {/* Card 3: Interception Alerts Feed */}
        <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[#00D4FF]">⚠</span>
              <span>INTERCEPT ALERTS</span>
            </div>
          </div>

          <div className="my-3 space-y-2 text-xs">
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-1.5">
              <div>
                <p className="text-slate-200 font-medium text-[11px]">Exfiltration via Email</p>
                <p className="text-[10px] text-slate-400">Research Assistant</p>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">High</span>
            </div>
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-1.5">
              <div>
                <p className="text-slate-200 font-medium text-[11px]">Unauthorized Cloud Share</p>
                <p className="text-[10px] text-slate-400">Project Manager</p>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Med</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-200 font-medium text-[11px]">Sensitive Doc Read Attempt</p>
                <p className="text-[10px] text-slate-400">Finance Auditor</p>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Med</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>View all security alerts</span>
            <span className="text-cyan-400 font-bold">→</span>
          </div>
        </div>

        {/* Card 4: Tool Security Shield */}
        <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-[#00D4FF]">🛡</span>
            <span>TOOL SECURITY</span>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D4FF]"
                  strokeDasharray="99.2, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold font-mono text-white">99.2%</span>
                <span className="block text-[9px] text-slate-400 uppercase tracking-tighter">Protected</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <div className="text-[11px] text-slate-400">Calls Scanned <span className="font-bold text-white ml-1">28,542</span></div>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400">Threats Blocked</span>
                <span className="font-mono text-rose-400 font-bold">156</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400">Pending Review</span>
                <span className="font-mono text-amber-300 font-bold">23</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 flex items-center gap-1.5">
            <span className="text-xs">✓</span> Kawach Shield Operating Normally
          </div>
        </div>

      </div>

      {/* Middle Row: Threat Timeline + Risk & Incident Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Risk Score Widget */}
        <div className="lg:col-span-3 bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <span>🛡</span> SYSTEM RISK SCORE
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Aggregated tool & agent risk</p>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray="24, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-mono text-white">24</span>
                <span className="block text-[8px] text-emerald-400 font-bold uppercase">Low Risk</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] w-full">
              <div className="flex justify-between items-center text-slate-300">
                <span>Identity</span>
                <span className="text-emerald-400 font-mono text-[10px]">Low ●</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Files/Drive</span>
                <span className="text-emerald-400 font-mono text-[10px]">Low ●</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Network</span>
                <span className="text-amber-400 font-mono text-[10px]">Med ●</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center gap-1">
            <span>✓</span> Risk is within acceptable range
          </div>
        </div>

        {/* Threat Timeline */}
        <div className="lg:col-span-6 bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Threat Timeline
              </h4>
              <p className="text-[11px] text-slate-500">Chronological tool attack interception</p>
            </div>
            <span className="text-[11px] bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-slate-300 font-mono">
              Last 24 hours ▾
            </span>
          </div>

          {/* Interactive Timeline Bar */}
          <div className="relative py-6 px-4">
            <div className="h-0.5 bg-slate-700 w-full absolute top-1/2 left-0 -translate-y-1/2"></div>

            <div className="relative flex justify-between items-center z-10">
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 text-[10px] text-center max-w-[90px] leading-tight">
                  <span className="text-rose-400 font-bold block">Prompt Injection</span>
                  <span className="text-slate-500 font-mono text-[9px]">06:12 AM</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-[#14213D] border-2 border-white shadow-lg"></div>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-[#14213D] border-2 border-white shadow-lg"></div>
                <div className="mt-2 text-[10px] text-center max-w-[90px] leading-tight">
                  <span className="text-amber-400 font-bold block">Sensitive Access</span>
                  <span className="text-slate-500 font-mono text-[9px]">07:45 AM</span>
                </div>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 text-[10px] text-center max-w-[90px] leading-tight">
                  <span className="text-rose-400 font-bold block">Tool Exfil Block</span>
                  <span className="text-slate-500 font-mono text-[9px]">11:18 AM</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-[#14213D] border-2 border-white shadow-lg"></div>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-[#00D4FF] ring-4 ring-[#14213D] border-2 border-white shadow-lg"></div>
                <div className="mt-2 text-[10px] text-center max-w-[90px] leading-tight">
                  <span className="text-[#00D4FF] font-bold block">Policy Update</span>
                  <span className="text-slate-500 font-mono text-[9px]">03:36 PM</span>
                </div>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 text-[10px] text-center max-w-[90px] leading-tight">
                  <span className="text-emerald-400 font-bold block">Systems Nominal</span>
                  <span className="text-slate-500 font-mono text-[9px]">05:02 PM</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#14213D] border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> High Risk</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Low</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00D4FF]"></span> Info</span>
          </div>
        </div>

        {/* Incident Response Gauge */}
        <div className="lg:col-span-3 bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <span>⛊</span> INCIDENT PIPELINE
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Active security interventions</p>
          </div>

          <div className="flex items-center gap-4 my-4">
            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D4FF]"
                  strokeDasharray="25, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-mono text-white">1</span>
                <span className="block text-[8px] text-cyan-400 font-bold uppercase">Active</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] w-full">
              <div className="flex justify-between items-center text-slate-300">
                <span>Active</span>
                <span className="text-rose-400 font-mono font-bold">1</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Investigating</span>
                <span className="text-amber-400 font-mono">0</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Resolved</span>
                <span className="text-emerald-400 font-mono">2</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span className="text-cyan-400 font-bold">Detected</span>
              <span>Triage</span>
              <span>Contained</span>
              <span>Resolved</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Table: Recent Alerts & Interceptions */}
      <div className="bg-[#14213D] border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/40">
        <div className="p-4 px-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#00D4FF]">🔔</span>
            <h3 className="font-semibold text-slate-200 text-sm">
              Live Gateway Decision & Alert Feed
            </h3>
          </div>
          <span className="text-xs text-cyan-400 hover:underline cursor-pointer flex items-center gap-1">
            View full audit log →
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B132B]/60 text-[11px] text-slate-400 uppercase font-mono border-b border-slate-800/80">
              <tr>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Agent</th>
                <th className="px-6 py-3 font-medium">Target Resource / Alert</th>
                <th className="px-6 py-3 font-medium">Decision / Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-slate-400">10:24 AM</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    ● High
                  </span>
                </td>
                <td className="px-6 py-3.5 font-medium text-white">Research Assistant</td>
                <td className="px-6 py-3.5 text-slate-300 font-mono text-[11px]">email_client.send_email → evil_exfil@server.xyz</td>
                <td className="px-6 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-600/50">
                    DENY
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right font-mono text-slate-500 cursor-pointer hover:text-white">•••</td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-slate-400">08:15 AM</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    ● Medium
                  </span>
                </td>
                <td className="px-6 py-3.5 font-medium text-white">Project Manager</td>
                <td className="px-6 py-3.5 text-slate-300 font-mono text-[11px]">cloud_storage.share → public_external_link</td>
                <td className="px-6 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-400 border border-amber-600/50">
                    REQUIRE APPROVAL
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right font-mono text-slate-500 cursor-pointer hover:text-white">•••</td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-3.5 font-mono text-slate-400">07:45 AM</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ● Low
                  </span>
                </td>
                <td className="px-6 py-3.5 font-medium text-white">Document Bot</td>
                <td className="px-6 py-3.5 text-slate-300 font-mono text-[11px]">document_reader.read → public_knowledge_base.pdf</td>
                <td className="px-6 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-600/50">
                    ALLOW
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right font-mono text-slate-500 cursor-pointer hover:text-white">•••</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
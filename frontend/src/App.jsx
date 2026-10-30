import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AgentConsole from './pages/AgentConsole'
import Approvals from './pages/Approvals'
import AuditLogs from './pages/AuditLogs'
import DemoScenarios from './pages/DemoScenarios'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex h-screen bg-[#0B132B] text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-[#0B132B]/80 backdrop-blur shrink-0">
          <h2 className="text-lg font-semibold capitalize text-[#00D4FF]">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400">KAWACH Core Online</span>
          </div>
        </header>

        <section className="p-8 flex-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'agent-console' && <AgentConsole />}
          {activeTab === 'approvals' && <Approvals />}
          {activeTab === 'audit-logs' && <AuditLogs />}
          {activeTab === 'demo-scenarios' && <DemoScenarios />}
        </section>
      </main>
    </div>
  )
}

export default App
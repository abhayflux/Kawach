import logo from '../assets/logo.png'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'agent-console', label: 'Agent Console' },
    { id: 'approvals', label: 'Approvals' },
    { id: 'audit-logs', label: 'Audit Logs' },
    { id: 'demo-scenarios', label: 'Demo Scenarios' },
  ]

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none shrink-0">
      {/* Edge-to-edge full width logo banner */}
      <div className="w-full h-28 border-b border-slate-800 overflow-hidden flex items-center justify-center bg-slate-950">
        <img 
          src={logo} 
          alt="KAWACH AI Security Gateway" 
          className="w-full h-full object-cover scale-105" 
        />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center font-mono">
        Gateway Mode: Active
      </div>
    </aside>
  )
}
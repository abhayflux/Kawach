export default function StatusBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'ALLOW':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-600/50'
      case 'DENY':
        return 'bg-rose-950/80 text-rose-400 border-rose-600/50'
      case 'REQUIRE APPROVAL':
        return 'bg-amber-950/80 text-amber-400 border-amber-600/50'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-600/50'
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}
    >
      {status || 'UNKNOWN'}
    </span>
  )
}
import React from 'react'

export default function StatusBadge({ status }) {
  const normalized = (status || 'UNKNOWN').toUpperCase().replace(/_/g, ' ')

  const getBadgeStyle = () => {
    switch (normalized) {
      case 'ALLOW':
      case 'APPROVED':
      case 'AUTHORIZED':
      case 'SUCCESS':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-600/50'
      case 'DENY':
      case 'DENIED':
      case 'REJECTED':
      case 'BLOCKED':
        return 'bg-rose-950/80 text-rose-400 border-rose-600/50'
      case 'REQUIRE APPROVAL':
      case 'PENDING':
      case 'ESCALATED':
        return 'bg-amber-950/80 text-amber-400 border-amber-600/50'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-600/50'
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono border ${getBadgeStyle()}`}
    >
      {normalized}
    </span>
  )
}

// Kawach Security Gateway API Service
// Connects frontend to backend (e.g. http://10.100.1.90:8000)

const DEFAULT_BACKEND_URL = 'http://10.100.1.90:8000'

export function getBackendUrl() {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('KAWACH_API_URL')
    if (custom && custom.trim()) {
      return custom.trim().replace(/\/+$/, '')
    }
  }
  const envUrl = import.meta.env?.VITE_API_BASE_URL
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '')
  }
  return DEFAULT_BACKEND_URL
}

export function setBackendUrl(url) {
  if (typeof window !== 'undefined') {
    if (url && url.trim()) {
      localStorage.setItem('KAWACH_API_URL', url.trim().replace(/\/+$/, ''))
    } else {
      localStorage.removeItem('KAWACH_API_URL')
    }
  }
}

export function resetBackendUrl() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('KAWACH_API_URL')
  }
}

export function buildUrl(endpoint) {
  const base = getBackendUrl()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  if (base.endsWith('/api') && cleanEndpoint.startsWith('/api')) {
    return `${base}${cleanEndpoint.slice(4)}`
  }
  return `${base}${cleanEndpoint}`
}

/**
 * Health Check
 * GET /api/health
 */
export async function checkBackendHealth() {
  const url = buildUrl('/api/health')
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500)
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      return { ok: false, status: response.status, url }
    }
    const data = await response.json().catch(() => ({ status: 'ok' }))
    return { ok: true, data, url }
  } catch (err) {
    return { ok: false, error: err.message, url }
  }
}

/**
 * Submit Task to Security Gateway
 * POST /api/tasks
 */
export async function submitAgentTask(agentId, prompt, extraData = {}) {
  const url = buildUrl('/api/tasks')
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const payload = {
      task: prompt,
      prompt: prompt,
      agent_id: agentId,
      agent: agentId,
      untrusted_content: prompt,
      ...extraData,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`)
    }

    const data = await response.json()

    // Normalize response fields for seamless UI consumption
    return {
      task_id: data.task_id || data.id || data.request_id || `task_${Date.now().toString().slice(-4)}`,
      decision: data.decision || data.verdict || (data.status === 'approved' ? 'ALLOW' : data.status === 'blocked' ? 'DENY' : 'ALLOW'),
      tool: data.tool || data.tool_name || 'simulated_tool',
      action: data.action || data.operation || 'execute',
      resource: data.resource || data.target || data.path || prompt.slice(0, 30),
      reason: data.reason || data.explanation || 'Evaluated against Kawach security gateway policies.',
      risk: data.risk || data.risk_score || 'MEDIUM',
      executed: data.executed ?? (data.decision === 'ALLOW'),
      findings: data.findings || {},
      raw: data,
      _isLive: true,
    }
  } catch (err) {
    console.warn(`[Kawach] Backend at ${url} unavailable: ${err.message}. Running fallback simulation:`, err)

    const lower = prompt.toLowerCase()
    let mockResult

    if (lower.includes('email') || lower.includes('exfil') || lower.includes('steal') || lower.includes('password') || lower.includes('key')) {
      mockResult = {
        task_id: `task_${Date.now().toString().slice(-4)}`,
        decision: 'DENY',
        tool: 'email_client',
        action: 'send_email',
        resource: 'external_recipient@threat.xyz',
        reason: 'Policy Engine: Outbound data exfiltration / sensitive token pattern detected.',
        risk: 'CRITICAL',
        executed: false,
      }
    } else if (lower.includes('share') || lower.includes('upload') || lower.includes('export') || lower.includes('slack')) {
      mockResult = {
        task_id: `task_${Date.now().toString().slice(-4)}`,
        decision: 'REQUIRE APPROVAL',
        tool: 'cloud_storage',
        action: 'share_external',
        resource: 'internal_confidential_q3.pdf',
        reason: 'Policy Engine: Sensitive asset egress requires human administrator sign-off.',
        risk: 'HIGH',
        executed: false,
      }
    } else {
      mockResult = {
        task_id: `task_${Date.now().toString().slice(-4)}`,
        decision: 'ALLOW',
        tool: 'document_reader',
        action: 'read',
        resource: 'public_whitepaper.pdf',
        reason: 'Policy Engine: Request matches safe read access policy for verified public assets.',
        risk: 'LOW',
        executed: true,
      }
    }

    return {
      ...mockResult,
      _isLive: false,
      _fallbackReason: `Backend offline (${url}): ${err.message}`,
    }
  }
}

/**
 * List Requests
 * GET /api/requests
 */
export async function fetchRequests() {
  const url = buildUrl('/api/requests')
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`Status ${response.status}`)
    const data = await response.json()
    return Array.isArray(data) ? data : data.requests || []
  } catch (err) {
    console.warn('[Kawach] fetchRequests error:', err.message)
    return null
  }
}

/**
 * List Approvals
 * GET /api/approvals
 */
export async function fetchApprovals() {
  const url = buildUrl('/api/approvals')
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`Status ${response.status}`)
    const data = await response.json()
    const items = Array.isArray(data) ? data : data.approvals || []

    return items.map((item) => ({
      id: item.approval_id || item.id || `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      agent: item.agent || item.agent_id || 'Autonomous Agent',
      action: item.action || item.tool || 'system_action',
      resource: item.resource || item.target || 'target_resource',
      risk: item.risk || item.risk_level || 'High',
      reason: item.reason || 'Pending manual sign-off by security policy.',
      timestamp: item.timestamp || item.created_at || 'Just now',
      status: (item.status || 'PENDING').toUpperCase(),
      _raw: item,
    }))
  } catch (err) {
    console.warn('[Kawach] fetchApprovals error:', err.message)
    return null
  }
}

/**
 * Approve Request
 * POST /api/approvals/{approval_id}/approve
 */
export async function approveRequest(approvalId, reviewer = 'security_admin') {
  const url = buildUrl(`/api/approvals/${approvalId}/approve`)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ reviewer, decision: 'APPROVED' }),
    })
    if (!response.ok) {
      throw new Error(`Status ${response.status}`)
    }
    return await response.json().catch(() => ({ success: true }))
  } catch (err) {
    console.warn('[Kawach] approveRequest error:', err.message)
    return { success: false, fallback: true, error: err.message }
  }
}

/**
 * Reject Request
 * POST /api/approvals/{approval_id}/reject
 */
export async function rejectRequest(approvalId, reviewer = 'security_admin', reason = 'Rejected by security policy') {
  const url = buildUrl(`/api/approvals/${approvalId}/reject`)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ reviewer, reason, decision: 'REJECTED' }),
    })
    if (!response.ok) {
      throw new Error(`Status ${response.status}`)
    }
    return await response.json().catch(() => ({ success: true }))
  } catch (err) {
    console.warn('[Kawach] rejectRequest error:', err.message)
    return { success: false, fallback: true, error: err.message }
  }
}

/**
 * Fetch Immutable Audit Logs
 * GET /api/audit-logs
 */
export async function fetchAuditLogs() {
  const url = buildUrl('/api/audit-logs')
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`Status ${response.status}`)
    const data = await response.json()
    const records = Array.isArray(data) ? data : data.logs || data.records || []

    return records.map((r, idx) => ({
      id: r.id || r.event_hash ? `LOG-${(r.event_hash || '').slice(0, 6)}` : `LOG-${5000 + idx}`,
      time: r.time || (r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : 'Recent'),
      agent: r.agent || r.agent_id || 'Autonomous Agent',
      tool: r.tool || r.tool_name || 'agent_action',
      action: r.action || 'execute',
      resource: r.resource || r.arguments ? JSON.stringify(r.arguments).slice(0, 40) : 'system_resource',
      verdict: (r.verdict || r.decision || 'ALLOW').toUpperCase(),
      reason: r.reason || 'Evaluated by security policy engine.',
      riskScore: r.riskScore || (r.risk === 'HIGH' || r.risk === 'CRITICAL' ? 95 : r.risk === 'MEDIUM' ? 65 : 10),
      raw: r,
    }))
  } catch (err) {
    console.warn('[Kawach] fetchAuditLogs error:', err.message)
    return null
  }
}

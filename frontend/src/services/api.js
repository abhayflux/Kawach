const API_BASE_URL = 'http://localhost:8000/api'

export async function submitAgentTask(agentId, prompt) {
  try {
    const response = await fetch(`${API_BASE_URL}/agent/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        task: prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    return await response.json()
  } catch (err) {
    console.warn('Backend offline, running fallback mock engine:', err)

    const lower = prompt.toLowerCase()
    if (lower.includes('email') || lower.includes('exfil')) {
      return {
        task_id: 'task_094',
        decision: 'DENY',
        tool: 'email_client',
        action: 'send_email',
        resource: 'external_recipient@threat.xyz',
        reason: 'Policy Engine: Outbound data exfiltration detected. Untrusted external destination.',
      }
    } else if (lower.includes('share') || lower.includes('upload')) {
      return {
        task_id: 'task_095',
        decision: 'REQUIRE APPROVAL',
        tool: 'cloud_storage',
        action: 'share_external',
        resource: 'internal_confidential_q3.pdf',
        reason: 'Policy Engine: Sensitive classification requires supervisor approval before external share.',
      }
    } else {
      return {
        task_id: 'task_096',
        decision: 'ALLOW',
        tool: 'document_reader',
        action: 'read',
        resource: 'public_whitepaper.pdf',
        reason: 'Policy Engine: Request matches safe read access policy for public documents.',
      }
    }
  }
}

export async function fetchAuditLogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/audit/logs`)
    if (!response.ok) throw new Error('Failed to fetch logs')
    return await response.json()
  } catch (err) {
    console.warn('Backend offline, using local audit data')
    return null
  }
}
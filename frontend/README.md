# Kawach AI Security Gateway - Frontend

This frontend connects to the **AgentShield / Kawach Backend** (running at `http://10.100.1.90:8000`).

---

## 📡 Connected Backend APIs

The frontend is integrated with the following OpenAPI endpoints:

| Method | Endpoint | Description | UI Location |
|---|---|---|---|
| `GET` | `/api/health` | Gateway health check | Navbar Status Indicator & Modal |
| `POST` | `/api/tasks` | Submit agent instructions for inspection & enforcement | Agent Console & Scenarios |
| `GET` | `/api/requests` | List intercepted request history | Gateway Inspection Feeds |
| `GET` | `/api/approvals` | List pending human-in-the-loop approvals | Approvals Tab |
| `POST` | `/api/approvals/{id}/approve` | Authorize a flagged tool execution | Approvals Tab ("Authorize Execution") |
| `POST` | `/api/approvals/{id}/reject` | Reject/quarantine a flagged tool execution | Approvals Tab ("Block Request") |
| `GET` | `/api/audit-logs` | Retrieve immutable policy evaluation ledger | Audit Logs Tab |

---

## 🚀 Running the Frontend

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
By default, `.env` points to `http://10.100.1.90:8000`:
```env
VITE_API_BASE_URL=http://10.100.1.90:8000
VITE_BACKEND_TARGET=http://10.100.1.90:8000
```

> **Dynamic Switcher**: You can also change the backend URL directly inside the running UI by clicking the **"Backend Status"** pill in the top-right navbar!

### 3. Start Development Server
```bash
npm run dev
```

---

## 🛠️ Connecting Two Laptops (Troubleshooting Guide)

When connecting your frontend laptop to your teammate's backend laptop at `10.100.1.90:8000`, verify the following 4 steps on the **backend laptop**:

### 1. Bind to `0.0.0.0` (Not `127.0.0.1`)
If started with `127.0.0.1` (as shown in local browser tabs), the backend only accepts connections from the same machine. Start uvicorn with:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Enable CORS in FastAPI
Add `CORSMiddleware` in the backend so browsers allow cross-laptop requests:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Avoid Campus Wi-Fi Client Isolation
College/Campus Wi-Fi (such as `bmsce.ac.in`) frequently enforces **AP / Client Isolation**, which blocks laptops from talking to each other directly.
- **Solution**: Connect both laptops to a shared **Phone Mobile Hotspot** or a local router.

### 4. Allow Port 8000 in Windows Defender Firewall
On the backend laptop, allow inbound traffic on port 8000:
```powershell
New-NetFirewallRule -DisplayName "FastAPI Port 8000" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
```

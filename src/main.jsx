import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// #region agent log
const __rootEl = document.getElementById('root')
fetch('http://127.0.0.1:7589/ingest/5a1815ab-4035-4603-b553-7513b5bf8afc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a397c5'},body:JSON.stringify({sessionId:'a397c5',location:'main.jsx:entry',message:'main bootstrap',data:{hasRoot:!!__rootEl},timestamp:Date.now(),hypothesisId:'H2',runId:'pre-fix'})}).catch(()=>{});
// #endregion

createRoot(__rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

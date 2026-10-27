var e=`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { loadBrandStyles } from '@/lib/brandStyles'
import '@/index.css'
import { applyTheme, getThemeChoice } from '@/lib/theme'

loadBrandStyles()
applyTheme(getThemeChoice())

// Live content updates the AI tools' libraries. Those libraries arrive in the later install parts, so it starts
// once they're in the app (and runs in the background, so the first screen isn't held up).
const liveContent = import.meta.glob('./lib/liveContent.js')
liveContent['./lib/liveContent.js']?.().then((m) => m.startLiveContent())

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
`;export{e as default};
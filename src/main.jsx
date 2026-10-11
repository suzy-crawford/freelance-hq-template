import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { applyTheme, getThemeChoice } from '@/lib/theme'

applyTheme(getThemeChoice())

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

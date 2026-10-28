import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { loadBrandStyles, applyTheme, getThemeChoice } from "@/lib/hq";
import '@/index.css'

loadBrandStyles()
applyTheme(getThemeChoice())

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

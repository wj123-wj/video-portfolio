import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/archivo/latin-400.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/archivo/latin-900.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-sc/900.css'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

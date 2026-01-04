import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{padding:40}}>
      <h1>One Hit Wonder</h1>
      <p>Your website is live 🎉</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import App from './App.tsx'
import './index.css'
import '@aws-amplify/ui-react/styles.css'

// Configure Amplify (will be set up with amplify init)
// Amplify.configure(amplifyconfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
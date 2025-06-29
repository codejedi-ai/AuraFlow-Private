import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import App from './App.tsx'
import './index.css'
import '@aws-amplify/ui-react/styles.css'

// Configure Amplify - this will be automatically populated after amplify init
try {
  // Import amplify configuration if it exists
  const amplifyConfig = await import('./amplifyconfiguration.json')
  Amplify.configure(amplifyConfig.default)
} catch (error) {
  console.log('Amplify configuration not found. Please run "amplify init" and "amplify push"')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
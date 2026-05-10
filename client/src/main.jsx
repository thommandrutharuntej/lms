import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key")
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl={'/'}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
)

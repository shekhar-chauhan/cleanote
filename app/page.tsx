"use client"

import { useState, useEffect } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginScreen from "../components/login-screen"
import NoteApp from "../components/note-app"
import { UserProvider, useUser } from "../context/user-context"
import { DriveProvider } from "../context/drive-context"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Just check if we can access localStorage to avoid hydration errors
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-purple-500 text-2xl font-bold animate-pulse">CN</div>
      </div>
    )
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <UserProvider>
        <DriveProvider>
          <AppContent />
        </DriveProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  )
}

function AppContent() {
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Small delay to prevent flickering during initialization
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-purple-500 text-2xl font-bold animate-pulse">CN</div>
      </div>
    )
  }

  return <MainApp />
}

function MainApp() {
  return (
    <UserConsumer>
      {({ user, isLoading }) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center h-screen bg-black">
              <div className="text-purple-500 text-2xl font-bold animate-pulse">CN</div>
            </div>
          )
        }

        return user ? <NoteApp /> : <LoginScreen />
      }}
    </UserConsumer>
  )
}

// Helper component to consume user context
function UserConsumer({ children }) {
  const userContext = useUser()
  return children(userContext)
}

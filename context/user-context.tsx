"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useGoogleLogin } from "@react-oauth/google"

interface User {
  name: string
  email: string
  picture: string
  accessToken: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: () => Promise<void>
  logout: () => void
  refreshAccessToken: () => Promise<string | null>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("cleaNote_user")
        const tokenExpiry = localStorage.getItem("cleaNote_tokenExpiry")

        if (storedUser && tokenExpiry) {
          const parsedUser = JSON.parse(storedUser)
          const expiryTime = Number.parseInt(tokenExpiry, 10)

          // If token is expired, try to refresh it
          if (Date.now() > expiryTime) {
            // For now, just log out if token is expired
            // In a real app, you would use a refresh token here
            localStorage.removeItem("cleaNote_user")
            localStorage.removeItem("cleaNote_tokenExpiry")
            setUser(null)
          } else {
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("cleaNote_user")
        localStorage.removeItem("cleaNote_tokenExpiry")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setIsLoading(true)

        // Get user info using the access token
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })

        if (!userInfoResponse.ok) {
          throw new Error("Failed to get user info")
        }

        const userInfo = await userInfoResponse.json()

        // Create user object with access token
        const userData: User = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          accessToken: response.access_token,
        }

        // Store in localStorage with expiry (1 hour)
        localStorage.setItem("cleaNote_user", JSON.stringify(userData))
        localStorage.setItem("cleaNote_tokenExpiry", (Date.now() + 3600000).toString())

        // Clear any previous session state
        localStorage.removeItem("activeTab")
        localStorage.removeItem("openTabs")

        setUser(userData)
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error("Login failed:", error)
      setIsLoading(false)
    },
    scope: "https://www.googleapis.com/auth/drive.file email profile",
  })

  const login = async () => {
    setIsLoading(true)
    try {
      await googleLogin()
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("cleaNote_user")
    localStorage.removeItem("cleaNote_tokenExpiry")
    setUser(null)
  }

  const refreshAccessToken = async (): Promise<string | null> => {
    // In a real implementation, you would use a refresh token to get a new access token
    // For this demo, we'll just return the current token if it's not expired
    const tokenExpiry = localStorage.getItem("cleaNote_tokenExpiry")

    if (tokenExpiry && Date.now() < Number.parseInt(tokenExpiry, 10) && user) {
      return user.accessToken
    }

    // If token is expired, log out
    logout()
    return null
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, refreshAccessToken }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

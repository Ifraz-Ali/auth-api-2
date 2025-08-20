"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "./lib/auth-context"
import Link from "next/link"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUser, setToken, clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoading(true)
      setError("")

      try {
        const response = await fetch("https://os-project-server.vercel.app/auth/existinguser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || data.error || `HTTP ${response.status}`)
        }

        const { token: authToken } = data

        setToken(authToken)
        setUser({
          username: email.split('@')[0],
          email: email,
        })
        localStorage.setItem("auth_token", authToken)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Login failed. Please try again.")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="space-y-1 text-center p-6 pb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="border border-red-200 bg-red-50 rounded-md p-3">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800 text-xs mt-1"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-slate-700 font-medium text-sm block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-700 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-slate-700 font-medium text-sm block">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-700 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-2 space-y-2">
              <Link href="/reset-password" className="text-sm text-slate-600 hover:text-slate-800 transition-colors block">
                Forgot your password?
              </Link>
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => window.location.href = '/register'}
                  className="text-slate-800 hover:text-slate-600 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register, isLoading, error, clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (username && email && password) {
      await register(username, email, password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="space-y-1 text-center p-6 pb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Create Account</h1>
          <p className="text-slate-600">Sign up to get started</p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="border border-red-200 bg-red-50 rounded-md p-3">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800 text-xs mt-1"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-slate-700 font-medium text-sm block">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-slate-700 font-medium text-sm block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-slate-700 font-medium text-sm block">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-slate-700 font-medium text-sm block">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => window.location.href = '/'}
                  className="text-slate-800 hover:text-slate-600 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function WelcomePage() {
  const { user, logout } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">Welcome back!</h2>
            <p className="text-slate-600">Here's your account information</p>
          </div>

          <div className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="text-center pb-4 p-6">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-700 text-xl font-semibold">
                    {user?.username ? getInitials(user.username) : "U"}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl text-slate-800 font-semibold">{user?.username || "User"}</h2>
              <p className="text-slate-600">{user?.email}</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Username</span>
                  <span className="text-slate-600">{user?.username}</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Email</span>
                  <span className="text-slate-600">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Account Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="p-6 pb-4">
              <h3 className="text-lg text-slate-800 font-semibold">Quick Actions</h3>
              <p className="text-slate-600 text-sm">Manage your account settings</p>
            </div>
            <div className="p-6 pt-0">
              <div className="grid gap-3">
                <button className="w-full text-left px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent rounded-md transition-colors">
                  Update Profile
                </button>
                <button className="w-full text-left px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent rounded-md transition-colors">
                  Change Password
                </button>
                <Link href="/users" className="w-full text-left px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent rounded-md transition-colors block">
                  View All Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
      </div>
    )
  }

  return user ? <WelcomePage /> : <LoginPage />
}

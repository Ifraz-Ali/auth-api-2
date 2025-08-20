"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../lib/auth-context"
import Link from "next/link"

const API_BASE_URL = "https://os-project-server.vercel.app"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (username && email && password) {
      try {
        setIsLoading(true)
        setError("")

        const response = await fetch(`${API_BASE_URL}/auth/newuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || data.error || `HTTP ${response.status}`)
        }

        setSuccess(true)
        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Registration failed. Please try again.")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6">
            <div className="mb-4">
              <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-2">Account Created!</h1>
            <p className="text-slate-600 mb-4">Your account has been successfully created. Redirecting to login...</p>
            <Link href="/" className="text-slate-800 hover:text-slate-600 font-medium">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
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
                  onClick={() => setError("")}
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-700"
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-700"
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
                <Link href="/" className="text-slate-800 hover:text-slate-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

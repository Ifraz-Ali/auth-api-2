"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

const API_BASE_URL = "https://os-project-server.vercel.app"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState<"request" | "otp" | "reset">("request")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`)
      }

      setMessage("OTP sent successfully! Please check your email.")
      setStep("otp")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to send OTP")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) {
      setError("Please enter the OTP")
      return
    }
    setStep("reset")
    setError("")
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`)
      }

      setMessage("Password reset successful! You can now sign in with your new password.")
      // Redirect to login page after successful reset
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to reset password")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case "request":
        return "Reset Password"
      case "otp":
        return "Enter OTP"
      case "reset":
        return "Set New Password"
      default:
        return "Reset Password"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case "request":
        return "Enter your email address and we'll send you an OTP"
      case "otp":
        return "Enter the OTP sent to your email"
      case "reset":
        return "Enter your new password below"
      default:
        return "Reset your password"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="space-y-1 text-center p-6 pb-4">
          <h1 className="text-2xl font-semibold text-slate-800">{getStepTitle()}</h1>
          <p className="text-slate-600">{getStepDescription()}</p>
        </div>
        <div className="p-6 pt-0">
          {step === "request" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {error && (
                <div className="border border-red-200 bg-red-50 rounded-md p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="border border-green-200 bg-green-50 rounded-md p-3">
                  <p className="text-green-700 text-sm">{message}</p>
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
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>

              <div className="text-center pt-2">
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {error && (
                <div className="border border-red-200 bg-red-50 rounded-md p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="border border-green-200 bg-green-50 rounded-md p-3">
                  <p className="text-green-700 text-sm">{message}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="otp" className="text-slate-700 font-medium text-sm block">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
              >
                Verify OTP
              </button>

              <div className="text-center pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setStep("request")}
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors block"
                >
                  Resend OTP
                </button>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-800 transition-colors block">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="border border-red-200 bg-red-50 rounded-md p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="border border-green-200 bg-green-50 rounded-md p-3">
                  <p className="text-green-700 text-sm">{message}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-slate-700 font-medium text-sm block">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  placeholder="Confirm new password"
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
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>

              <div className="text-center pt-2">
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { User } from "../lib/type"
import Link from "next/link"

const API_BASE_URL = "https://os-project-server.vercel.app"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const response = await fetch(`${API_BASE_URL}/auth/users`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`)
      }

      setUsers(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to fetch users")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">Users Directory</h1>
          <Link
            href="/"
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">All Users</h2>
            <p className="text-slate-600">Total registered users: {users.length}</p>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="border border-red-200 bg-red-50 rounded-md p-4">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={fetchUsers}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-slate-700 font-semibold text-sm">
                              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">
                              {user.username || "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-500">
                          {user.createdAt ? formatDate(user.createdAt) : "Unknown"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {users.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-600">There are no registered users yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

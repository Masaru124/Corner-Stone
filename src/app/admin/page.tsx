'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || 'Login failed')
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setErrorMessage('Unable to login right now')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#1F5144' }}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-serif mb-2" style={{ color: '#1F5144' }}>
          Admin Login
        </h1>
        <p className="text-sm mb-6" style={{ color: '#4A4A4A' }}>
          Enter your admin credentials to access the dashboard.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm mb-1" htmlFor="username" style={{ color: '#1F5144' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              style={{ borderColor: '#D0D0D0' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password" style={{ color: '#1F5144' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              style={{ borderColor: '#D0D0D0' }}
              required
            />
          </div>

          {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg py-2.5 font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: '#1F5144' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Keyboard, Key, HelpCircle, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login, recoverToken, resetToken } from "@/lib/auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState<"recover" | "reset" | "success">("recover")
  const [recoveredToken, setRecoveredToken] = useState("")
  const [tokenCopied, setTokenCopied] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const credentials = {
      token: formData.get("token") as string,
    }

    try {
      const result = await login(credentials)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Invalid token")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const recoveryData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const result = recoveryStep === "recover" ? await recoverToken(recoveryData) : await resetToken(recoveryData)

      if (result.success && result.token) {
        setRecoveredToken(result.token)
        setRecoveryStep("success")
      } else {
        setError(result.error || "Recovery failed")
      }
    } catch (err) {
      setError("Recovery failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToken = () => {
    navigator.clipboard.writeText(recoveredToken)
    setTokenCopied(true)
    setTimeout(() => setTokenCopied(false), 2000)
  }

  const backToLogin = () => {
    setShowRecovery(false)
    setRecoveryStep("recover")
    setRecoveredToken("")
    setError("")
  }

  if (showRecovery) {
    if (recoveryStep === "success") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-500/20">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Token Retrieved!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Here's your access token:</p>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-600" />
                    <code className="text-lg font-mono font-bold text-blue-600">{recoveredToken}</code>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyToken} className="ml-2">
                    {tokenCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={backToLogin} variant="outline" className="flex-1">
                  Back to Login
                </Button>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Sign In Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Token Recovery</CardTitle>
            <CardDescription>
              {recoveryStep === "recover"
                ? "Enter your email and password to retrieve your token"
                : "Enter your email and password to generate a new token"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecovery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/20"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : recoveryStep === "recover" ? "Retrieve Token" : "Generate New Token"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              {recoveryStep === "recover" && (
                <Button
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur-sm border-white/20"
                  onClick={() => setRecoveryStep("reset")}
                >
                  Generate New Token Instead
                </Button>
              )}
              <Button variant="ghost" className="w-full" onClick={backToLogin}>
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 relative">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Keyboard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TypingMaster Pro
            </span>
          </CardTitle>
          <CardDescription>Sign in with your unique token to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Access Token</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="token"
                  name="token"
                  type="text"
                  placeholder="Enter your token (e.g., swiftkeys1234)"
                  required
                  className="bg-white/10 backdrop-blur-sm border-white/20 pl-10"
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your token was provided when you created your account
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <Button
              variant="ghost"
              className="text-sm text-blue-600 hover:text-blue-700"
              onClick={() => setShowRecovery(true)}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Forgot your token?
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

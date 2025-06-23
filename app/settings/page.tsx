"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User, Palette, Download, Trash2, Key, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout, updateUserSettings } from "@/lib/auth"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    soundEnabled: true,
    autoSave: true,
    showTips: true,
    keyboardLayout: "qwerty",
  })
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [tokenCopied, setTokenCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const userData = getCurrentUser()
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(userData)
    setProfileData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
    })

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("typing_trainer_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage
    localStorage.setItem("typing_trainer_settings", JSON.stringify(settings))

    // Update user settings
    if (user) {
      updateUserSettings(user.id, settings)
    }

    setSaveMessage("Settings saved successfully!")
    setIsSaving(false)

    setTimeout(() => setSaveMessage(""), 3000)
  }

  const copyToken = () => {
    if (user?.token) {
      navigator.clipboard.writeText(user.token)
      setTokenCopied(true)
      setTimeout(() => setTokenCopied(false), 2000)
    }
  }

  const handleExportData = () => {
    const exportData = {
      user: user,
      settings: settings,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `typing-trainer-data-${user?.username || "user"}.json`
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app, this would call an API to delete the account
      logout()
      router.push("/")
    }
  }

  if (!mounted || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {saveMessage && (
          <Alert className="mb-6">
            <CheckCircle className="w-4 h-4" />
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, username: e.target.value }))}
                    className="bg-white/10 backdrop-blur-sm border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 backdrop-blur-sm border-white/20"
                  />
                </div>

                {/* Access Token */}
                <div>
                  <Label htmlFor="token">Your Access Token</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-blue-600" />
                        <code className="font-mono font-bold text-blue-600">{user.token}</code>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToken}
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    >
                      {tokenCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Keep this token secure. You'll need it to sign in.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* App Settings */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Application Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">Sound Effects</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Enable key press sound effects</p>
                  </div>
                  <Switch
                    id="sound"
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, soundEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Use dark theme</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSave">Auto Save Progress</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Automatically save your progress</p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoSave: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showTips">Show Tips</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Display helpful typing tips</p>
                  </div>
                  <Switch
                    id="showTips"
                    checked={settings.showTips}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showTips: checked }))}
                  />
                </div>

                <Button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur-sm border-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>

                <Link href="/games">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    🎮 Play Games
                  </Button>
                </Link>

                <Link href="/certificates">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    🏆 View Certificates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Member Since:</span>
                  <span className="text-sm font-semibold">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Levels Completed:</span>
                  <span className="text-sm font-semibold">{user.progress.completedLevels.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Current Level:</span>
                  <span className="text-sm font-semibold">{user.progress.currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Lessons:</span>
                  <span className="text-sm font-semibold">{user.progress.stats.lessonsCompleted}</span>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-red-500/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  onClick={handleDeleteAccount}
                  variant="outline"
                  className="w-full bg-red-500/20 border-red-500/20 text-red-600 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

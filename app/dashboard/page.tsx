"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  TrendingUp,
  Play,
  Lock,
  CheckCircle,
  Award,
  BarChart3,
  Gamepad2,
  Settings,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { LEVELS, isLevelUnlocked } from "@/lib/levels"
import { AchievementChart } from "@/components/achievement-chart"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = getCurrentUser()
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(userData)
  }, [router])

  const levels = LEVELS.map((level) => ({
    ...level,
    progress: user?.progress.completedLevels.includes(level.id)
      ? 100
      : level.id === user?.progress.currentLevel
        ? 50
        : 0,
    status: user?.progress.completedLevels.includes(level.id)
      ? "completed"
      : level.id === user?.progress.currentLevel
        ? "current"
        : isLevelUnlocked(level.id, user?.progress.completedLevels || [])
          ? "unlocked"
          : "locked",
    wpm: user?.progress.completedLevels.includes(level.id) ? user.progress.stats.totalWPM : 0,
    accuracy: user?.progress.completedLevels.includes(level.id) ? user.progress.stats.totalAccuracy : 0,
  }))

  const stats = {
    averageWPM: user?.progress.stats.totalWPM || 0,
    averageAccuracy: user?.progress.stats.totalAccuracy || 0,
    totalLessons: user?.progress.stats.lessonsCompleted || 0,
    completedLevels: user?.progress.completedLevels.length || 0,
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TypingMaster Pro
                </span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Welcome back, {user.firstName || user.username}!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to improve your typing skills?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Continue your journey through our 50-level training program, play games, and track your progress!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Average WPM</p>
                  <p className="text-2xl font-bold">{stats.averageWPM}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Accuracy</p>
                  <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Lessons</p>
                  <p className="text-2xl font-bold">{stats.totalLessons}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                  <p className="text-2xl font-bold">{stats.completedLevels}/50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Progress */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Your Progress - Level {user?.progress?.currentLevel || 1}
                </CardTitle>
                <CardDescription>Complete each level to unlock the next one</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {levels.slice(0, 10).map((level) => (
                  <div key={level.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          {level.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {level.status === "current" && <Play className="w-4 h-4 text-blue-500" />}
                          {level.status === "locked" && <Lock className="w-4 h-4 text-gray-400" />}
                          {level.status === "unlocked" && <Target className="w-4 h-4 text-purple-500" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Level {level.id}: {level.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{level.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Required: {level.requiredWPM} WPM • {level.requiredAccuracy}% Accuracy
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            level.status === "completed"
                              ? "default"
                              : level.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            level.status === "completed"
                              ? "bg-green-500/20 text-green-700 dark:text-green-300"
                              : level.status === "current"
                                ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                                : level.status === "unlocked"
                                  ? "bg-purple-500/20 text-purple-700 dark:text-purple-300"
                                  : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                          }
                        >
                          {level.status === "completed"
                            ? "Completed"
                            : level.status === "current"
                              ? "Current"
                              : level.status === "unlocked"
                                ? "Available"
                                : "Locked"}
                        </Badge>
                        {level.status !== "locked" && (
                          <Link href={`/training/${level.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/10 backdrop-blur-sm border-white/20"
                            >
                              {level.status === "current"
                                ? "Continue"
                                : level.status === "completed"
                                  ? "Review"
                                  : "Start"}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                    <Progress value={level.progress} className="h-2" />
                  </div>
                ))}
                {levels.length > 10 && (
                  <div className="text-center pt-4">
                    <Link href="/levels">
                      <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View All {levels.length} Levels
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Feature Showcase */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-blue-600" />
                    Typing Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Make learning fun with our interactive typing games!
                  </p>
                  <Link href="/games">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Play Games
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Earn certificates as you complete levels and showcase your achievements!
                  </p>
                  <Link href="/certificates">
                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                      View Certificates
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/training/${user?.progress?.currentLevel || 1}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Training
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    <Target className="w-4 h-4 mr-2" />
                    Free Practice
                  </Button>
                </Link>
                <Link href="/levels">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Levels
                  </Button>
                </Link>
                <Link href="/games">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Play Games
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/20">
                    <Award className="w-4 h-4 mr-2" />
                    Certificates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Progress Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <h3 className="font-semibold mb-1">Level Completion Progress</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {stats.completedLevels} of 50 levels completed
                  </p>
                </div>
                <AchievementChart
                  completedLevels={user?.progress?.completedLevels || []}
                  currentLevel={user?.progress?.currentLevel || 1}
                />
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round((stats.completedLevels / 50) * 100)}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Overall Progress</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Username:</span>
                  <span className="text-sm font-semibold">{user.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Member Since:</span>
                  <span className="text-sm font-semibold">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Current Level:</span>
                  <span className="text-sm font-semibold">{user.progress.currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Time:</span>
                  <span className="text-sm font-semibold">{Math.round(user.progress.stats.totalTime / 60)} min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

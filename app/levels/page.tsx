"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Target, Play, Lock, CheckCircle, ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { LEVELS, isLevelUnlocked } from "@/lib/levels"

export default function LevelsPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
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

  const filteredLevels = levels.filter((level) => {
    const matchesSearch =
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || level.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-700 dark:text-green-300",
    intermediate: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
    advanced: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    expert: "bg-red-500/20 text-red-700 dark:text-red-300",
  }

  if (!user) {
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
          <h1 className="text-xl font-bold">All Levels</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Filter Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search levels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={difficultyFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter("all")}
                  className={
                    difficultyFilter === "all" ? "bg-blue-600" : "bg-white/10 backdrop-blur-sm border-white/20"
                  }
                >
                  All
                </Button>
                <Button
                  variant={difficultyFilter === "beginner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter("beginner")}
                  className={
                    difficultyFilter === "beginner" ? "bg-green-600" : "bg-white/10 backdrop-blur-sm border-white/20"
                  }
                >
                  Beginner
                </Button>
                <Button
                  variant={difficultyFilter === "intermediate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter("intermediate")}
                  className={
                    difficultyFilter === "intermediate"
                      ? "bg-yellow-600"
                      : "bg-white/10 backdrop-blur-sm border-white/20"
                  }
                >
                  Intermediate
                </Button>
                <Button
                  variant={difficultyFilter === "advanced" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter("advanced")}
                  className={
                    difficultyFilter === "advanced" ? "bg-orange-600" : "bg-white/10 backdrop-blur-sm border-white/20"
                  }
                >
                  Advanced
                </Button>
                <Button
                  variant={difficultyFilter === "expert" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficultyFilter("expert")}
                  className={
                    difficultyFilter === "expert" ? "bg-red-600" : "bg-white/10 backdrop-blur-sm border-white/20"
                  }
                >
                  Expert
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLevels.map((level) => (
            <Card
              key={level.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      {level.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {level.status === "current" && <Play className="w-5 h-5 text-blue-500" />}
                      {level.status === "locked" && <Lock className="w-5 h-5 text-gray-400" />}
                      {level.status === "unlocked" && <Target className="w-5 h-5 text-purple-500" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">Level {level.id}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{level.name}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={difficultyColors[level.difficulty]}>
                    {level.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{level.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Required WPM:</span>
                    <span className="font-semibold">{level.requiredWPM}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Required Accuracy:</span>
                    <span className="font-semibold">{level.requiredAccuracy}%</span>
                  </div>
                  {level.status === "completed" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Your WPM:</span>
                        <span className="font-semibold text-green-600">{level.wpm}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Your Accuracy:</span>
                        <span className="font-semibold text-green-600">{level.accuracy}%</span>
                      </div>
                    </>
                  )}
                </div>

                <Progress value={level.progress} className="h-2 mb-4" />

                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      level.status === "completed" ? "default" : level.status === "current" ? "secondary" : "outline"
                    }
                    className={
                      level.status === "completed"
                        ? "bg-green-500/20 text-green-700 dark:text-green-300"
                        : level.status === "current"
                          ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
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
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {level.status === "current" ? "Continue" : level.status === "completed" ? "Review" : "Start"}
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLevels.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center py-12">
            <CardContent>
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No levels found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

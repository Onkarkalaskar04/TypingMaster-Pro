"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Lock, Play } from "lucide-react"

export function ProgressSection() {
  const levels = [
    { id: 1, name: "Basic Keys", progress: 100, status: "completed", wpm: 25 },
    { id: 2, name: "Home Row", progress: 100, status: "completed", wpm: 32 },
    { id: 3, name: "Top Row", progress: 75, status: "current", wpm: 28 },
    { id: 4, name: "Bottom Row", progress: 0, status: "locked", wpm: 0 },
    { id: 5, name: "Numbers", progress: 0, status: "locked", wpm: 0 },
    { id: 6, name: "Symbols", progress: 0, status: "locked", wpm: 0 },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20">
            Learning Path
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Typing
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Progress through structured levels designed to build your typing skills systematically.
          </p>
        </div>

        <div className="space-y-4">
          {levels.map((level) => (
            <Card
              key={level.id}
              className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    {level.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {level.status === "current" && <Play className="w-5 h-5 text-blue-500" />}
                    {level.status === "locked" && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Level {level.id}: {level.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {level.status === "completed" && `Completed • ${level.wpm} WPM`}
                      {level.status === "current" && `In Progress • ${level.wpm} WPM`}
                      {level.status === "locked" && "Complete previous level to unlock"}
                    </p>
                  </div>
                </div>
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
                  {level.status === "completed" ? "Completed" : level.status === "current" ? "Current" : "Locked"}
                </Badge>
              </div>
              <Progress value={level.progress} className="h-2" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

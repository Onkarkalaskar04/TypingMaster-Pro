"use client"

import { useEffect, useState } from "react"

interface AchievementChartProps {
  completedLevels: number[]
  currentLevel: number
}

export function AchievementChart({ completedLevels, currentLevel }: AchievementChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Create data points for the last 10 levels or all completed levels
  const maxLevel = Math.max(currentLevel, Math.max(...completedLevels, 0))
  const startLevel = Math.max(1, maxLevel - 9)
  const levels = Array.from({ length: 10 }, (_, i) => startLevel + i)

  const chartData = levels.map((level) => ({
    level,
    completed: completedLevels.includes(level),
    isCurrent: level === currentLevel,
  }))

  const maxHeight = 60
  const barWidth = 24

  return (
    <div className="w-full">
      <div className="flex items-end justify-center gap-1 h-16 mb-2">
        {chartData.map((data, index) => {
          const height = data.completed ? maxHeight : data.isCurrent ? maxHeight * 0.6 : maxHeight * 0.2
          const color = data.completed
            ? "bg-green-500"
            : data.isCurrent
              ? "bg-blue-500"
              : "bg-gray-300 dark:bg-gray-600"

          return (
            <div key={data.level} className="flex flex-col items-center">
              <div
                className={`${color} rounded-t transition-all duration-500 ease-out`}
                style={{
                  width: `${barWidth}px`,
                  height: `${height}px`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Level labels */}
      <div className="flex justify-center gap-1">
        {chartData.map((data) => (
          <div
            key={data.level}
            className="text-xs text-center text-gray-600 dark:text-gray-400"
            style={{ width: `${barWidth}px` }}
          >
            {data.level}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
        </div>
      </div>
    </div>
  )
}

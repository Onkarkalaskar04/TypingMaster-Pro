"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Keyboard, Trophy, Target, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
            <Keyboard className="w-4 h-4" />
            Master Touch Typing
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TypingMaster Pro
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Master touch typing with our progressive 50+ level training system. Track your progress, improve your speed,
            play games, and earn certificates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Start Learning
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 px-8 py-3 text-lg"
            >
              Sign In with Token
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <Trophy className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">50+ Progressive Levels</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Unlock new levels as you improve your typing skills
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <Target className="w-8 h-8 text-green-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Get instant feedback on accuracy and speed</p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <Clock className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Games & Certificates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Play typing games and earn certificates</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

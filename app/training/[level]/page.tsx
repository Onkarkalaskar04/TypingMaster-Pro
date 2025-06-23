"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, TrendingUp, Volume2, VolumeX, RotateCcw, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getCurrentUser, updateUserProgress } from "@/lib/auth"
import { getLevel } from "@/lib/levels"
import { AudioManager } from "@/components/audio-manager"

export default function TrainingPage() {
  const params = useParams()
  const router = useRouter()
  const level = Number.parseInt(params.level as string)

  const [currentText, setCurrentText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [shouldPlayCorrect, setShouldPlayCorrect] = useState(false)
  const [shouldPlayError, setShouldPlayError] = useState(false)
  const [currentLevel, setCurrentLevel] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  // Reset all state when level changes
  const resetAllState = useCallback(() => {
    setUserInput("")
    setCurrentIndex(0)
    setStartTime(null)
    setIsActive(false)
    setTimeElapsed(0)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setIsCompleted(false)
    setShouldPlayCorrect(false)
    setShouldPlayError(false)
  }, [])

  useEffect(() => {
    const userData = getCurrentUser()
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(userData)

    const levelData = getLevel(level)
    if (!levelData) {
      router.push("/dashboard")
      return
    }

    // Reset all state when level changes
    resetAllState()

    setCurrentLevel(levelData)
    setCurrentText(levelData.content)

    // Focus input after state reset
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }, [level, router, resetAllState])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setTimeElapsed(elapsed)

        // Calculate WPM
        const wordsTyped = userInput.length / 5
        const minutes = elapsed / 60
        const currentWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0
        setWpm(currentWpm)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isActive, startTime, userInput])

  useEffect(() => {
    // Calculate accuracy
    let correctChars = 0
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++
      }
    }
    const currentAccuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100
    setAccuracy(currentAccuracy)
    setErrors(userInput.length - correctChars)
  }, [userInput, currentText])

  useEffect(() => {
    if (userInput.length === currentText.length && currentLevel && userInput.length > 0) {
      const meetsWPMRequirement = wpm >= currentLevel.requiredWPM
      const meetsAccuracyRequirement = accuracy >= currentLevel.requiredAccuracy

      if (meetsWPMRequirement && meetsAccuracyRequirement) {
        setIsCompleted(true)
        setIsActive(false)

        // Update user progress
        if (user) {
          updateUserProgress(user.id, level, wpm, accuracy, timeElapsed)
        }
      }
    }
  }, [userInput, currentText, accuracy, wpm, currentLevel, user, level, timeElapsed])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Prevent typing beyond text length
    if (value.length > currentText.length) {
      return
    }

    // Start timer on first keystroke
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
      setIsActive(true)
    }

    // Check if the new character is correct or incorrect
    if (value.length > userInput.length) {
      const newCharIndex = value.length - 1
      const isCorrect = value[newCharIndex] === currentText[newCharIndex]

      if (isCorrect) {
        setShouldPlayCorrect(true)
        setTimeout(() => setShouldPlayCorrect(false), 50)
      } else {
        setShouldPlayError(true)
        setTimeout(() => setShouldPlayError(false), 50)
      }
    }

    setUserInput(value)
    setCurrentIndex(value.length)
  }

  const resetTest = () => {
    resetAllState()
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "text-lg font-mono "

      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
        } else {
          className += "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
        }
      } else if (index === currentIndex) {
        className += "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200 animate-pulse"
      } else {
        className += "text-gray-600 dark:text-gray-400"
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      )
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <h1 className="text-xl font-bold">Level {level} Training</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetTest}
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Time</p>
              <p className="text-xl font-bold">{Math.floor(timeElapsed)}s</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600 dark:text-gray-300">WPM</p>
              <p className="text-xl font-bold">{wpm}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Accuracy</p>
              <p className="text-xl font-bold">{accuracy}%</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="w-6 h-6 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">E</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Errors</p>
              <p className="text-xl font-bold">{errors}</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progress</h3>
              <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                {Math.round((userInput.length / currentText.length) * 100)}% Complete
              </Badge>
            </div>
            <Progress value={(userInput.length / currentText.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Typing Area */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Type the text below</CardTitle>
          </CardHeader>
          <CardContent>
            {currentLevel && (
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Requirements: {currentLevel.requiredWPM} WPM • {currentLevel.requiredAccuracy}% Accuracy
                </p>
              </div>
            )}
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 mb-6 min-h-[120px] leading-relaxed overflow-hidden">
              <div className="break-words whitespace-pre-wrap">{renderText()}</div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-full p-4 text-lg font-mono bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start typing here..."
              disabled={isCompleted}
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </CardContent>
        </Card>

        {/* Completion Modal */}
        {isCompleted && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-500/20">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Level Completed!</h2>
              <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
                <div>
                  <p className="text-2xl font-bold text-green-600">{wpm}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">WPM</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{Math.floor(timeElapsed)}s</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Time</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetTest} variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                  Try Again
                </Button>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Back to Dashboard
                  </Button>
                </Link>
                {level < 50 && (
                  <Link href={`/training/${level + 1}`}>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Next Level
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {currentLevel && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Level Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">For This Level:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {currentLevel.tips.map((tip: string, index: number) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">General Tips:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Keep your wrists straight and floating</li>
                    <li>• Use all fingers, not just index fingers</li>
                    <li>• Focus on accuracy over speed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Audio Manager */}
      <AudioManager enabled={soundEnabled} shouldPlayCorrect={shouldPlayCorrect} shouldPlayError={shouldPlayError} />
    </div>
  )
}

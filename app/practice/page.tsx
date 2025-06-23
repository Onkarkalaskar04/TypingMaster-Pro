"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, TrendingUp, Volume2, VolumeX, RotateCcw, ArrowLeft, Shuffle } from "lucide-react"
import Link from "next/link"
import { AudioManager } from "@/components/audio-manager"

const practiceTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "Technology has revolutionized the way we communicate, work, and live our daily lives in the modern world.",
  "Learning to type efficiently is an essential skill that can significantly improve your productivity and career prospects.",
  "Practice makes perfect when it comes to developing muscle memory and achieving consistent typing accuracy.",
  "The art of touch typing involves training your fingers to find the correct keys without looking at the keyboard.",
  "Professional typists can achieve speeds of over 100 words per minute while maintaining high accuracy rates.",
  "Regular practice sessions help build endurance and maintain consistent performance over extended periods of time.",
  "Proper posture and ergonomic setup are crucial for preventing strain and injury during long typing sessions.",
]

export default function PracticePage() {
  const [customText, setCustomText] = useState("")
  const [currentText, setCurrentText] = useState(practiceTexts[0])
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
  const [useCustomText, setUseCustomText] = useState(false)
  const [shouldPlayCorrect, setShouldPlayCorrect] = useState(false)
  const [shouldPlayError, setShouldPlayError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // Reset function
  const resetTest = useCallback(() => {
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

    // Focus input after a short delay to ensure state is reset
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setTimeElapsed(elapsed)

        const wordsTyped = userInput.length / 5
        const minutes = elapsed / 60
        const currentWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0
        setWpm(currentWpm)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isActive, startTime, userInput])

  // Accuracy calculation effect
  useEffect(() => {
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

  // Completion check effect
  useEffect(() => {
    if (userInput.length === currentText.length && userInput.length > 0) {
      setIsCompleted(true)
      setIsActive(false)
    }
  }, [userInput, currentText])

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

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * practiceTexts.length)
    setCurrentText(practiceTexts[randomIndex])
    setUseCustomText(false)
    resetTest()
  }

  const useCustomTextHandler = () => {
    if (customText.trim()) {
      setCurrentText(customText.trim())
      setUseCustomText(true)
      resetTest()
    }
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

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
            <h1 className="text-xl font-bold">Free Practice</h1>
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
              onClick={getRandomText}
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              <Shuffle className="w-4 h-4" />
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
        {/* Custom Text Input */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Custom Text Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your own text to practice typing..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20"
                rows={3}
              />
              <Button
                onClick={useCustomTextHandler}
                disabled={!customText.trim()}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Use Custom Text
              </Button>
            </div>
          </CardContent>
        </Card>

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

        {/* Typing Area */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Practice Text</CardTitle>
              {useCustomText && (
                <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-300">
                  Custom Text
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
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
            />
          </CardContent>
        </Card>

        {/* Completion */}
        {isCompleted && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Practice Complete!</h2>
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
                <Button
                  onClick={getRandomText}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  New Text
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AudioManager enabled={soundEnabled} shouldPlayCorrect={shouldPlayCorrect} shouldPlayError={shouldPlayError} />
    </div>
  )
}

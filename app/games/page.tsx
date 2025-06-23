"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gamepad2, Zap, Target, Trophy, RotateCcw, Play } from "lucide-react"
import Link from "next/link"
import { AudioManager } from "@/components/audio-manager"

const FALLING_WORDS = [
  "cat",
  "dog",
  "run",
  "jump",
  "fast",
  "slow",
  "big",
  "small",
  "red",
  "blue",
  "green",
  "yellow",
  "happy",
  "sad",
  "good",
  "bad",
  "hot",
  "cold",
  "new",
  "old",
  "quick",
  "brown",
  "fox",
  "lazy",
  "over",
  "under",
  "above",
  "below",
  "left",
  "right",
]

interface FallingWord {
  id: number
  word: string
  x: number
  y: number
  speed: number
}

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver">("menu")

  // Falling Words Game State
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [wordsTyped, setWordsTyped] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0)
  const [shouldPlaySound, setShouldPlaySound] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const gameLoopRef = useRef<number>()
  const wordSpawnRef = useRef<number>()
  const timerRef = useRef<number>()

  // Game initialization
  useEffect(() => {
    if (gameState === "playing" && selectedGame === "falling-words") {
      startFallingWordsGame()
    } else {
      stopGame()
    }

    return () => stopGame()
  }, [gameState, selectedGame])

  const startFallingWordsGame = () => {
    // Start game loop
    gameLoopRef.current = window.setInterval(() => {
      setFallingWords((prev) =>
        prev
          .map((word) => ({ ...word, y: word.y + word.speed }))
          .filter((word) => {
            if (word.y > 400) {
              setLives((prev) => Math.max(0, prev - 1))
              return false
            }
            return true
          }),
      )
    }, 50)

    // Spawn words
    wordSpawnRef.current = window.setInterval(
      () => {
        spawnWord()
      },
      2000 - level * 100,
    )

    // Timer
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("gameOver")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    if (wordSpawnRef.current) clearInterval(wordSpawnRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const spawnWord = () => {
    const word = FALLING_WORDS[Math.floor(Math.random() * FALLING_WORDS.length)]
    const newWord: FallingWord = {
      id: Date.now(),
      word,
      x: Math.random() * 80 + 10, // 10% to 90% of width
      y: 0,
      speed: 1 + level * 0.5,
    }
    setFallingWords((prev) => [...prev, newWord])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentInput(value)
    setTotalKeystrokes((prev) => prev + 1)

    // Check if input matches any falling word
    const matchedWord = fallingWords.find((word) => word.word.toLowerCase().startsWith(value.toLowerCase()))

    if (matchedWord && value.toLowerCase() === matchedWord.word.toLowerCase()) {
      // Word completed!
      setFallingWords((prev) => prev.filter((word) => word.id !== matchedWord.id))
      setCurrentInput("")
      setScore((prev) => prev + matchedWord.word.length * 10 * level)
      setWordsTyped((prev) => prev + 1)
      setCorrectKeystrokes((prev) => prev + matchedWord.word.length)

      // Level up every 10 words
      if ((wordsTyped + 1) % 10 === 0) {
        setLevel((prev) => prev + 1)
      }

      // Play sound
      setShouldPlaySound(true)
      setTimeout(() => setShouldPlaySound(false), 50)
    }

    // Update accuracy
    setAccuracy(totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100)
  }

  const resetGame = () => {
    setFallingWords([])
    setCurrentInput("")
    setScore(0)
    setLives(3)
    setLevel(1)
    setTimeLeft(60)
    setWordsTyped(0)
    setAccuracy(100)
    setTotalKeystrokes(0)
    setCorrectKeystrokes(0)
    setGameState("menu")
  }

  const startGame = (game: string) => {
    setSelectedGame(game)
    resetGame()
    setGameState("playing")
  }

  // Check game over conditions
  useEffect(() => {
    if (lives <= 0 || timeLeft <= 0) {
      setGameState("gameOver")
    }
  }, [lives, timeLeft])

  if (selectedGame === "falling-words" && gameState !== "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Header */}
        <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setSelectedGame(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-bold">Falling Words</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Score</p>
                <p className="text-xl font-bold">{score}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="w-6 h-6 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{lives}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lives</p>
                <p className="text-xl font-bold">{lives}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Level</p>
                <p className="text-xl font-bold">{level}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Words</p>
                <p className="text-xl font-bold">{wordsTyped}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="w-6 h-6 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Time</p>
                <p className="text-xl font-bold">{timeLeft}s</p>
              </CardContent>
            </Card>
          </div>

          {/* Game Area */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <CardContent className="p-0">
              <div
                ref={gameAreaRef}
                className="relative h-96 bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800 overflow-hidden rounded-lg"
              >
                {fallingWords.map((word) => (
                  <div
                    key={word.id}
                    className="absolute text-lg font-bold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded shadow-lg"
                    style={{
                      left: `${word.x}%`,
                      top: `${word.y}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {word.word}
                  </div>
                ))}

                {gameState === "gameOver" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Card className="bg-white/90 dark:bg-gray-800/90 p-8 text-center">
                      <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
                      <div className="space-y-2 mb-6">
                        <p>
                          Final Score: <span className="font-bold text-blue-600">{score}</span>
                        </p>
                        <p>
                          Words Typed: <span className="font-bold text-green-600">{wordsTyped}</span>
                        </p>
                        <p>
                          Level Reached: <span className="font-bold text-purple-600">{level}</span>
                        </p>
                        <p>
                          Accuracy: <span className="font-bold text-yellow-600">{accuracy}%</span>
                        </p>
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={() => startGame("falling-words")}
                          className="bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                          Play Again
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedGame(null)}>
                          Back to Games
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Input Area */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-lg font-semibold mb-2">Type the falling words to destroy them!</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Current word: <span className="font-mono font-bold">{currentInput}</span>
                </p>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                className="w-full p-4 text-lg font-mono bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                placeholder="Type here..."
                disabled={gameState !== "playing"}
                autoFocus
              />
            </CardContent>
          </Card>
        </div>

        <AudioManager enabled={soundEnabled} shouldPlay={shouldPlaySound} />
      </div>
    )
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
          <h1 className="text-xl font-bold">Typing Games</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Typing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Games</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Make learning fun with our interactive typing games. Improve your speed and accuracy while having a blast!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Falling Words Game */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
                <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-300">
                  Available
                </Badge>
              </div>
              <CardTitle className="text-xl">Falling Words</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Type falling words before they hit the ground! Test your speed and accuracy in this fast-paced
                arcade-style typing game.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Difficulty:</span>
                  <span className="font-semibold text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Skills:</span>
                  <span className="font-semibold">Speed, Accuracy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span className="font-semibold">60 seconds</span>
                </div>
              </div>
              <Button
                onClick={() => startGame("falling-words")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Play Now
              </Button>
            </CardContent>
          </Card>

          {/* Word Race Game - Coming Soon */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 opacity-75">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Zap className="w-8 h-8 text-yellow-600" />
                <Badge variant="outline" className="bg-gray-500/20 text-gray-600 dark:text-gray-400">
                  Coming Soon
                </Badge>
              </div>
              <CardTitle className="text-xl">Word Race</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Race against time and other players in this competitive typing challenge. See who can type the fastest!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Difficulty:</span>
                  <span className="font-semibold text-red-600">Hard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Skills:</span>
                  <span className="font-semibold">Speed, Competition</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Players:</span>
                  <span className="font-semibold">1-4 players</span>
                </div>
              </div>
              <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Typing Defense Game - Coming Soon */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 opacity-75">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-green-600" />
                <Badge variant="outline" className="bg-gray-500/20 text-gray-600 dark:text-gray-400">
                  Coming Soon
                </Badge>
              </div>
              <CardTitle className="text-xl">Typing Defense</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Defend your base by typing words to destroy incoming enemies. Strategy meets typing skills!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Difficulty:</span>
                  <span className="font-semibold text-green-600">Easy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Skills:</span>
                  <span className="font-semibold">Accuracy, Strategy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Levels:</span>
                  <span className="font-semibold">10 levels</span>
                </div>
              </div>
              <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Game Instructions */}
        <Card className="mt-12 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Falling Words</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Words fall from the top of the screen</li>
                  <li>• Type the complete word to destroy it</li>
                  <li>• Don't let words reach the bottom or you lose a life</li>
                  <li>• Speed increases as you level up</li>
                  <li>• Score points based on word length and level</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">General Tips</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Focus on accuracy first, speed will follow</li>
                  <li>• Use proper finger placement</li>
                  <li>• Don't look at the keyboard</li>
                  <li>• Take breaks to avoid fatigue</li>
                  <li>• Practice regularly for best results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

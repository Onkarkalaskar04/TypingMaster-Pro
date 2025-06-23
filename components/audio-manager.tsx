"use client"

import { useRef, useEffect } from "react"

interface AudioManagerProps {
  enabled: boolean
  shouldPlayCorrect: boolean
  shouldPlayError: boolean
}

export function AudioManager({ enabled, shouldPlayCorrect, shouldPlayError }: AudioManagerProps) {
  const correctAudioRef = useRef<HTMLAudioElement | null>(null)
  const errorAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    if (typeof window !== "undefined") {
      correctAudioRef.current = new Audio("/sounds/keypress.wav")
      correctAudioRef.current.volume = 0.3
      correctAudioRef.current.preload = "auto"

      errorAudioRef.current = new Audio("/sounds/error.wav")
      errorAudioRef.current.volume = 0.4
      errorAudioRef.current.preload = "auto"
    }

    return () => {
      if (correctAudioRef.current) {
        correctAudioRef.current.pause()
        correctAudioRef.current = null
      }
      if (errorAudioRef.current) {
        errorAudioRef.current.pause()
        errorAudioRef.current = null
      }
    }
  }, [])

  const playCorrectSound = () => {
    if (!enabled || !correctAudioRef.current) return

    try {
      correctAudioRef.current.currentTime = 0
      correctAudioRef.current.play().catch((error) => {
        console.log("Correct audio playback failed:", error)
      })
    } catch (error) {
      console.log("Correct audio playback failed:", error)
    }
  }

  const playErrorSound = () => {
    if (!enabled || !errorAudioRef.current) return

    try {
      errorAudioRef.current.currentTime = 0
      errorAudioRef.current.play().catch((error) => {
        console.log("Error audio playback failed:", error)
      })
    } catch (error) {
      console.log("Error audio playback failed:", error)
    }
  }

  useEffect(() => {
    if (shouldPlayCorrect) {
      playCorrectSound()
    }
  }, [shouldPlayCorrect, enabled])

  useEffect(() => {
    if (shouldPlayError) {
      playErrorSound()
    }
  }, [shouldPlayError, enabled])

  return null
}

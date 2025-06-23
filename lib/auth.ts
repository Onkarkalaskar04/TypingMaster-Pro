"use client"

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  token: string
  password: string // Store hashed password for token recovery
  createdAt: string
  progress: {
    currentLevel: number
    completedLevels: number[]
    stats: {
      totalWPM: number
      totalAccuracy: number
      totalTime: number
      lessonsCompleted: number
    }
  }
}

export interface LoginCredentials {
  token: string
}

export interface SignupData {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
}

export interface TokenRecoveryData {
  email: string
  password: string
}

// Simulated user database
const USERS_KEY = "typing_trainer_users"
const CURRENT_USER_KEY = "typing_trainer_current_user"

function generateToken(): string {
  const adjectives = ["swift", "quick", "fast", "rapid", "speedy", "turbo", "flash", "sonic", "jet", "rocket"]
  const nouns = ["typer", "keys", "finger", "dash", "bolt", "zoom", "rush", "speed", "flow", "type"]
  const randomNum = Math.floor(Math.random() * 9999) + 1

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adjective}${noun}${randomNum}`
}

// Simple password hashing (in production, use proper hashing)
function hashPassword(password: string): string {
  return btoa(password + "typing_trainer_salt")
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function storeUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export async function login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const users = getStoredUsers()
  const user = users.find((u) => u.token === credentials.token)

  if (!user) {
    return { success: false, error: "Invalid token. Please check your token and try again." }
  }

  setCurrentUser(user)
  return { success: true, user }
}

export async function signup(
  data: SignupData,
): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const users = getStoredUsers()

  // Check if user already exists
  if (users.find((u) => u.email === data.email)) {
    return { success: false, error: "User with this email already exists" }
  }

  if (users.find((u) => u.username === data.username)) {
    return { success: false, error: "Username already taken" }
  }

  // Validate password
  if (data.password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long" }
  }

  // Generate unique token
  let token = generateToken()
  while (users.find((u) => u.token === token)) {
    token = generateToken()
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: data.email,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    token: token,
    password: hashPassword(data.password),
    createdAt: new Date().toISOString(),
    progress: {
      currentLevel: 1,
      completedLevels: [],
      stats: {
        totalWPM: 0,
        totalAccuracy: 0,
        totalTime: 0,
        lessonsCompleted: 0,
      },
    },
  }

  users.push(newUser)
  storeUsers(users)
  setCurrentUser(newUser)

  return { success: true, user: newUser, token }
}

export async function recoverToken(
  data: TokenRecoveryData,
): Promise<{ success: boolean; token?: string; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const users = getStoredUsers()
  const user = users.find((u) => u.email === data.email)

  if (!user) {
    return { success: false, error: "No account found with this email address" }
  }

  if (!verifyPassword(data.password, user.password)) {
    return { success: false, error: "Invalid password" }
  }

  return { success: true, token: user.token }
}

export async function resetToken(
  data: TokenRecoveryData,
): Promise<{ success: boolean; token?: string; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const users = getStoredUsers()
  const userIndex = users.findIndex((u) => u.email === data.email)

  if (userIndex === -1) {
    return { success: false, error: "No account found with this email address" }
  }

  if (!verifyPassword(data.password, users[userIndex].password)) {
    return { success: false, error: "Invalid password" }
  }

  // Generate new unique token
  let newToken = generateToken()
  while (users.find((u) => u.token === newToken)) {
    newToken = generateToken()
  }

  // Update user's token
  users[userIndex].token = newToken
  storeUsers(users)

  return { success: true, token: newToken }
}

export function logout(): void {
  setCurrentUser(null)
}

export function updateUserProgress(
  userId: string,
  levelId: number,
  wpm: number,
  accuracy: number,
  timeSpent: number,
): void {
  const users = getStoredUsers()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) return

  const user = users[userIndex]

  // Update completed levels
  if (!user.progress.completedLevels.includes(levelId)) {
    user.progress.completedLevels.push(levelId)
  }

  // Update current level
  user.progress.currentLevel = Math.max(user.progress.currentLevel, levelId + 1)

  // Update stats
  user.progress.stats.lessonsCompleted += 1
  user.progress.stats.totalWPM = Math.round((user.progress.stats.totalWPM + wpm) / 2)
  user.progress.stats.totalAccuracy = Math.round((user.progress.stats.totalAccuracy + accuracy) / 2)
  user.progress.stats.totalTime += timeSpent

  users[userIndex] = user
  storeUsers(users)
  setCurrentUser(user)
}

export function updateUserSettings(userId: string, settings: any): void {
  const users = getStoredUsers()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) return

  const user = users[userIndex]
  user.settings = settings

  users[userIndex] = user
  storeUsers(users)
  setCurrentUser(user)
}

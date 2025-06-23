"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, Users, BookOpen, BarChart3, Settings } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("lessons")
  const [isEditing, setIsEditing] = useState(false)
  const [editingLesson, setEditingLesson] = useState<any>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    level: 1,
    content: "",
    difficulty: "beginner",
  })

  const lessons = [
    {
      id: 1,
      title: "Basic Keys",
      level: 1,
      content: "fff jjj fff jjj ddd kkk...",
      difficulty: "beginner",
      students: 45,
    },
    { id: 2, title: "Home Row", level: 2, content: "the quick brown fox...", difficulty: "beginner", students: 32 },
    { id: 3, title: "Top Row", level: 3, content: "The Quick Brown Fox...", difficulty: "intermediate", students: 28 },
  ]

  const stats = {
    totalUsers: 156,
    activeLessons: 6,
    completionRate: 78,
    averageWPM: 32,
  }

  const handleSaveLesson = () => {
    // In a real app, this would save to database
    console.log("Saving lesson:", newLesson)
    setNewLesson({ title: "", level: 1, content: "", difficulty: "beginner" })
    setIsEditing(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setNewLesson((prev) => ({ ...prev, content }))
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage lessons and monitor progress</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Lessons</p>
                  <p className="text-2xl font-bold">{stats.activeLessons}</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</p>
                  <p className="text-2xl font-bold">{stats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Settings className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avg WPM</p>
                  <p className="text-2xl font-bold">{stats.averageWPM}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "lessons" ? "default" : "outline"}
            onClick={() => setActiveTab("lessons")}
            className={
              activeTab === "lessons"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-white/10 backdrop-blur-sm border-white/20"
            }
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Lessons
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            className={
              activeTab === "users"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-white/10 backdrop-blur-sm border-white/20"
            }
          >
            <Users className="w-4 h-4 mr-2" />
            Users
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "outline"}
            onClick={() => setActiveTab("analytics")}
            className={
              activeTab === "analytics"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-white/10 backdrop-blur-sm border-white/20"
            }
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="space-y-6">
            {/* Add New Lesson */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Lesson
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Lesson Title</Label>
                    <Input
                      id="title"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter lesson title"
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      type="number"
                      min="1"
                      max="10"
                      value={newLesson.level}
                      onChange={(e) => setNewLesson((prev) => ({ ...prev, level: Number.parseInt(e.target.value) }))}
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Lesson Content</Label>
                  <Textarea
                    id="content"
                    value={newLesson.content}
                    onChange={(e) => setNewLesson((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter the text for typing practice..."
                    rows={4}
                    className="bg-white/10 backdrop-blur-sm border-white/20"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <Label htmlFor="file-upload">Upload Text File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="bg-white/10 backdrop-blur-sm border-white/20"
                    />
                  </div>
                  <Button
                    onClick={handleSaveLesson}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Lessons */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Existing Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                            Level {lesson.level}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              lesson.difficulty === "beginner"
                                ? "bg-green-500/20 text-green-700 dark:text-green-300"
                                : lesson.difficulty === "intermediate"
                                  ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                                  : "bg-red-500/20 text-red-700 dark:text-red-300"
                            }
                          >
                            {lesson.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {lesson.content.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-gray-500">{lesson.students} students enrolled</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 border-red-500/20 text-red-600 hover:bg-red-500/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  User management features would be implemented here, including user progress tracking, account
                  management, and detailed analytics.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  Detailed analytics including user progress charts, completion rates, and performance metrics would be
                  displayed here.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

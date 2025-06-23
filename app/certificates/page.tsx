"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, ArrowLeft, Calendar, Trophy, Target, Clock } from "lucide-react"
import Link from "next/link"

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const certificateRef = useRef<HTMLDivElement>(null)

  const certificates = [
    {
      id: 1,
      title: "Basic Keys Mastery",
      level: 1,
      completedDate: "2024-01-15",
      wpm: 25,
      accuracy: 95,
      timeSpent: "2 hours",
    },
    {
      id: 2,
      title: "Home Row Expert",
      level: 2,
      completedDate: "2024-01-20",
      wpm: 32,
      accuracy: 92,
      timeSpent: "3 hours",
    },
  ]

  const handleDownload = () => {
    if (certificateRef.current) {
      // In a real app, you'd use a library like html2canvas or jsPDF
      window.print()
    }
  }

  const CertificateTemplate = ({ cert }: { cert: any }) => (
    <div
      ref={certificateRef}
      className="bg-white p-12 rounded-lg shadow-2xl max-w-4xl mx-auto text-black print:shadow-none"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <Award className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate of Achievement</h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 inline-block">John Doe</h2>
        <p className="text-lg text-gray-600 mb-2">has successfully completed</p>
        <h3 className="text-2xl font-semibold text-blue-600 mb-6">{cert.title}</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <div className="p-3 rounded-full bg-blue-100 w-fit mx-auto mb-2">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Words Per Minute</p>
          <p className="text-2xl font-bold text-gray-800">{cert.wpm}</p>
        </div>
        <div className="text-center">
          <div className="p-3 rounded-full bg-green-100 w-fit mx-auto mb-2">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-2xl font-bold text-gray-800">{cert.accuracy}%</p>
        </div>
        <div className="text-center">
          <div className="p-3 rounded-full bg-purple-100 w-fit mx-auto mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Time Invested</p>
          <p className="text-2xl font-bold text-gray-800">{cert.timeSpent}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="text-left">
          <p className="text-sm text-gray-600">Date of Completion</p>
          <p className="text-lg font-semibold text-gray-800">{new Date(cert.completedDate).toLocaleDateString()}</p>
        </div>
        <div className="text-center">
          <div className="w-32 h-px bg-gray-400 mb-2"></div>
          <p className="text-sm text-gray-600">Typing Trainer</p>
          <p className="text-xs text-gray-500">Digital Certificate</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Certificate ID</p>
          <p className="text-lg font-semibold text-gray-800">TT-{cert.id.toString().padStart(4, "0")}</p>
        </div>
      </div>
    </div>
  )

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
            <h1 className="text-xl font-bold">Your Certificates</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedCertificate ? (
          <>
            {/* Certificates Grid */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Your Achievements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCertificate(cert)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Award className="w-8 h-8 text-yellow-500" />
                        <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                          Level {cert.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(cert.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span>{cert.wpm} WPM</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-green-500" />
                            <span>{cert.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {certificates.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center py-12">
                <CardContent>
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Complete training levels to earn your first certificate!
                  </p>
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Training
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Certificate View */}
            <div className="mb-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedCertificate(null)}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Certificates
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <CertificateTemplate cert={selectedCertificate} />
          </>
        )}
      </div>
    </div>
  )
}

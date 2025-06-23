"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Volume2, Award, Moon, Smartphone, BarChart3 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Typing Test",
      description: "Interactive typing interface with live WPM and accuracy tracking",
      color: "text-yellow-500",
    },
    {
      icon: Volume2,
      title: "Audio Feedback",
      description: "Embedded key click sounds with optional sound toggle",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "Certificate Generator",
      description: "Earn printable certificates upon course completion",
      color: "text-purple-500",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Switch between light and dark themes for comfortable typing",
      color: "text-indigo-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Fully responsive design that works on all devices",
      color: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Detailed analytics of your typing improvement journey",
      color: "text-red-500",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Master Typing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive typing trainer includes all the tools and features you need to become a typing expert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProgressSection } from "@/components/progress-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <FeaturesSection />
        <ProgressSection />
      </Suspense>
    </div>
  )
}

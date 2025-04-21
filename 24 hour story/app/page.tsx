"use client"

import StoriesComponent from "@/components/stories-component"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Instagram-like Stories</h1>
        <StoriesComponent />
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useSwipeable } from "react-swipeable"

const MAX_WIDTH = 1080
const MAX_HEIGHT = 1920

function resizeImage(file: File, callback: (dataUrl: string) => void) {
  const img = new Image()
  const reader = new FileReader()
  reader.onload = (e) => {
    img.onload = () => {
      const canvas = document.createElement("canvas")
      let width = img.width
      let height = img.height

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width
        width = MAX_WIDTH
      }
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg")
      callback(dataUrl)
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

interface Story {
  image: string
  timestamp: number
}

export default function StoriesComponent() {
  const [stories, setStories] = useState<Story[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stories") || "[]")
    const valid = stored.filter((s: Story) => Date.now() - s.timestamp < 86400000)
    setStories(valid)
    localStorage.setItem("stories", JSON.stringify(valid))
  }, [])

  const addStory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    resizeImage(file, (base64) => {
      const newStory = { image: base64, timestamp: Date.now() }
      const updated = [...stories, newStory]
      setStories(updated)
      localStorage.setItem("stories", JSON.stringify(updated))
    })
  }

  const playStory = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    if (activeIndex === null || activeIndex >= stories.length) return

    progressRef.current?.classList.remove("animate")
    void progressRef.current?.offsetWidth
    progressRef.current?.classList.add("animate")

    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev !== null && prev + 1 < stories.length ? prev + 1 : null))
    }, 3000)
    return () => clearTimeout(timeout)
  }, [activeIndex, stories.length])

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((i) => (i !== null && i + 1 < stories.length ? i + 1 : i)),
    onSwipedRight: () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    trackMouse: true,
  })

  return (
    <div className="font-sans">
      <div className="flex items-center space-x-2 overflow-x-auto p-2 border rounded">
        <label className="w-12 h-12 flex items-center justify-center border border-dashed rounded-full cursor-pointer">
          <span className="text-2xl">+</span>
          <input type="file" accept="image/*" className="hidden" onChange={addStory} />
        </label>
        {stories.map((story, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-full border cursor-pointer flex-shrink-0"
            onClick={() => playStory(i)}
          >
            <img
              src={story.image || "/placeholder.svg"}
              alt="story preview"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" {...handlers}>
          <div className="absolute top-4 left-4 right-4 flex space-x-1">
            {stories.map((_, i) => (
              <div key={i} className="h-1 bg-white/30 flex-1 overflow-hidden rounded">
                <div
                  ref={i === activeIndex ? progressRef : null}
                  className={`h-full bg-white ${i === activeIndex ? "animate" : i < activeIndex ? "w-full" : "w-0"}`}
                ></div>
              </div>
            ))}
          </div>
          <img
            src={stories[activeIndex].image || "/placeholder.svg"}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            alt="story"
          />
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setActiveIndex(null)}>
            ×
          </button>
        </div>
      )}

      <style jsx>{`
        .animate {
          width: 100%;
          transition: width 3s linear;
        }
      `}</style>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Lane from "./components/Lane"
import AddSubredditModal from "./components/AddSubredditModal"
import "./App.css"

function App() {
  const [subreddits, setSubreddits] = useState(() => {
    const saved = localStorage.getItem("subreddits")
    return saved ? JSON.parse(saved) : ["learnprogramming", "javascript", "gachagaming"]
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    localStorage.setItem("subreddits", JSON.stringify(subreddits))
  }, [subreddits])

  const addSubreddit = (name) => {
    if (!subreddits.includes(name)) {
      setSubreddits([...subreddits, name])
    }
  }

  const deleteSubreddit = (name) => {
    setSubreddits(subreddits.filter((sub) => sub !== name))
  }

  return (
    <div className="App">
      <div className="header">
        <button className="add-button" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      <div className="lane-container">
        {subreddits.map((sub) => (
          <Lane key={sub} subreddit={sub} onDelete={deleteSubreddit} />
        ))}
      </div>

      {showModal && <AddSubredditModal onClose={() => setShowModal(false)} onAdd={addSubreddit} />}
    </div>
  )
}

export default App

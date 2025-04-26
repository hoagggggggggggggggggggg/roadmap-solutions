"use client"

import { useState, useEffect } from "react"
import PostItem from "./PostItem"

function Lane({ subreddit, onDelete }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showControls, setShowControls] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
      if (!res.ok) throw new Error("Subreddit not found")
      const data = await res.json()
      const fetchedPosts = data.data.children.map((item) => ({
        title: item.data.title,
        author: item.data.author,
        ups: item.data.ups,
        url: `https://reddit.com${item.data.permalink}`,
      }))
      setPosts(fetchedPosts)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [subreddit])

  const handleClickOutside = () => {
    if (showControls) {
      setShowControls(false)
    }
  }

  useEffect(() => {
    if (showControls) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showControls])

  const toggleControls = (e) => {
    e.stopPropagation()
    setShowControls(!showControls)
  }

  return (
    <div className="lane">
      <div className="lane-header">
        <h2>/r/{subreddit}</h2>
        <div className="lane-controls">
          <button onClick={toggleControls} className="menu-button">
            ⋮
          </button>
          {showControls && (
            <div className="controls-dropdown">
              <button onClick={fetchPosts}>Refresh</button>
              <button onClick={() => onDelete(subreddit)}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="posts">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Lane

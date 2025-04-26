"use client"

import { useState } from "react"

function AddSubredditModal({ onClose, onAdd }) {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input.trim()) {
      onAdd(input.trim())
      onClose()
    }
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Enter the name of subreddit</h3>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. reactjs" />
        <div className="modal-buttons">
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            Add Subreddit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSubredditModal

import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input)
      setInput('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  )
}

export default TaskForm


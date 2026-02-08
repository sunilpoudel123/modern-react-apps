import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(task.id, editText)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="task-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className="task-text"
          onDoubleClick={handleEdit}
        >
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {!isEditing && (
          <>
            <button
              className="action-button edit-button"
              onClick={handleEdit}
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button
              className="action-button delete-button"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TaskItem


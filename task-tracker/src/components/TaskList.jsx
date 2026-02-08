import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No tasks yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default TaskList


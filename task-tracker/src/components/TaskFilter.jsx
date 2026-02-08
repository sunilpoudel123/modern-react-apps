function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ]

  return (
    <div className="task-filter">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter


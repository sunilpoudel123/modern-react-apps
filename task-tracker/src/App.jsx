import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import TaskStats from './components/TaskStats'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [route, setRoute] = useState('home')

  const getRouteFromHash = () => {
    const hash = window.location.hash || '#/home'
    const next = hash.replace('#/', '').trim()
    return next === '' ? 'home' : next
  }

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Simple hash routing
  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash())
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    if (text.trim() === '') return
    
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    ))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }

  const renderPage = () => {
    if (route === 'home') {
      return (
        <section className="section-card home-hero">
          <p className="home-kicker">Simplify. Organize. Automate.</p>
          <h2 className="home-title">
            Track Tasks, Coordinate Teams, and Monitor Performance - All in One
            Place!
          </h2>
          <p className="home-subtitle">
            Experience the future of business automation with Task Tracker! A
            mobile-first solution powered by AI that digitizes and automates
            every business department, making team collaboration effortless and
            organized. Task Tracker&apos;s user-friendly interface ensures that
            you can say goodbye to complexity and hello to a simpler, more
            efficient way of working together for business growth.
          </p>
          <div className="home-actions" role="group" aria-label="Get started">
            <a className="primary-cta" href="#/demo">
              Request a Demo
            </a>
          </div>
          <div className="home-feature">
            <h3>Versatile Solution for All Industries</h3>
            <p>
              Task Tracker is the perfect tool for business management, designed
              to meet diverse needs across industries and company sizes. Whether
              you&apos;re a small startup or a large enterprise, it provides the
              flexibility and efficiency you need to thrive anywhere in the
              world. Want a better way to manage every department? Task Tracker
              is your go-to solution for that.
            </p>
          </div>
        </section>
      )
    }

    if (route === 'features') {
      return (
        <section className="section-card">
          <h2>Features</h2>

          <h3>Attendance Management</h3>
          <p>Mark attendance</p>
          <p>
            Hassle-free attendance marking with a mobile phone with GPS-based
            geo-location capturing. Making attendance management flexible and
            monitoring better.
          </p>

          <h3>Workflow Management</h3>
          <p>Leave management</p>
          <p>
            Manage the leave cycle effectively from leave request to approval
            easily. No email threads, no tagging number of people for approvals.
            Just raise a request from the app and tag your HR. You would get a
            notification of each step till approval. Simple, easy, and
            effective.
          </p>

          <h3>Collaboration</h3>
          <p>Calendar view</p>
          <p>
            Get a complete view of your tasks on a weekly and monthly basis in
            calendar format.
          </p>

          <h3>Reporting</h3>
          <p>Multiple shift</p>
          <p>
            The multiple shift feature offers a panel that allows you to set
            different shift timings for employees, automatically recording their
            punch-in times to accurately track attendance, including late
            arrivals, present days, holidays, absences, and leave.
          </p>

          <h3>AI/ML</h3>
        </section>
      )
    }

    if (route === 'events') {
      return (
        <section className="section-card">
          <h2>Events</h2>
          <p>Track upcoming milestones and important dates here.</p>
        </section>
      )
    }

    if (route === 'blog') {
      return (
        <section className="section-card">
          <h2>Blog</h2>
          <p>Write reflections, tips, and weekly progress notes.</p>
        </section>
      )
    }

    if (route === 'about') {
      return (
        <section className="about-card" aria-labelledby="about-title">
          <div className="about-header">
            <div className="about-avatar" aria-hidden="true">SP</div>
            <div>
              <h2 id="about-title">About Me</h2>
              <p className="about-role">Frontend Developer · React Enthusiast</p>
            </div>
          </div>
          <p className="about-bio">
            I build clean, responsive interfaces and enjoy turning ideas into
            polished user experiences. Currently focused on React, component
            design, and performance-friendly UI.
          </p>
          <div className="about-tags">
            <span>React</span>
            <span>UI/UX</span>
            <span>TypeScript</span>
            <span>Accessibility</span>
          </div>
        </section>
      )
    }

    return (
      <section className="section-card">
        <h2>My Tasks</h2>
        <p>Organize your work and keep progress visible.</p>
      </section>
    )
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-label">Task Tracker</span>
            <span className="brand-tagline">Plan, track, and finish strong</span>
          </div>
          <nav className="app-nav" aria-label="Primary">
            <a href="#/home">Home</a>
            <a href="#/features">Features</a>
            <a href="#/tasks">My Tasks</a>
            <a href="#/events">Events</a>
            <a href="#/blog">Blog</a>
            <a href="#/about">About Me</a>
          </nav>
        </div>
      </header>

      <div className={`container ${route === 'home' ? 'container-wide' : ''}`}>
        {renderPage()}

        {route === 'tasks' && <TaskForm onAdd={addTask} />}

        {route === 'tasks' && <TaskStats stats={stats} />}

        {route === 'tasks' && (
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        )}

        {route === 'tasks' && (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        )}

        {route === 'tasks' && stats.completed > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            Clear Completed ({stats.completed})
          </button>
        )}

        <div className="footer-spacer" />
      </div>

      <footer className="site-footer" aria-label="Footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-label">Task Tracker</span>
            <span className="brand-tagline">Keep your day on track</span>
          </div>
          <nav className="app-nav" aria-label="Footer">
            <a href="#/home">Home</a>
            <a href="#/features">Features</a>
            <a href="#/tasks">My Tasks</a>
            <a href="#/events">Events</a>
            <a href="#/blog">Blog</a>
            <a href="#/about">About Me</a>
          </nav>
          <p className="footer-copy">© 2026 Task Tracker. Built with care.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

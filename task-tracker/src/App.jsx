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
  const [featureTab, setFeatureTab] = useState('attendance')

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
      const featureTabs = [
        { id: 'attendance', label: 'Attendance Management' },
        { id: 'workflow', label: 'Workflow Management' },
        { id: 'collaboration', label: 'Collaboration' },
        { id: 'reporting', label: 'Reporting' },
        { id: 'aiml', label: 'AI/ML' }
      ]

      return (
        <section className="section-card feature-page">
          <h2>Features</h2>
          <div className="feature-tabs" role="tablist" aria-label="Features">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`feature-tab ${
                  featureTab === tab.id ? 'active' : ''
                }`}
                role="tab"
                aria-selected={featureTab === tab.id}
                onClick={() => setFeatureTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="feature-panel" role="tabpanel">
            {featureTab === 'attendance' && (
              <div className="feature-block">
                <h3>Attendance Management</h3>
                <div className="feature-item">
                  <h4>Daily tasking</h4>
                  <p>
                    Keep track of daily workflow by adding tasks, assigning them
                    to the team, and getting regular updates on them.
                  </p>
                </div>
                <div className="feature-item">
                  <h4>Recurring Task management</h4>
                  <p>
                    Set reminders for recurring tasks and cut out the effort to
                    add a task daily. An automatic update would be sent each for
                    the recurring tasks.
                  </p>
                </div>
              </div>
            )}

            {featureTab === 'workflow' && (
              <div className="feature-block">
                <h3>Workflow Management</h3>
                <div className="feature-item">
                  <h4>Instant messaging</h4>
                  <p>
                    Connect easily with team members, managers, project
                    coordinators, etc via instant messaging. Share remarks,
                    updates, and notifications on the tasks to make
                    communication smooth.
                  </p>
                </div>
              </div>
            )}

            {featureTab === 'collaboration' && (
              <div className="feature-block">
                <h3>Collaboration</h3>
                <div className="feature-item">
                  <h4>Voice notes</h4>
                  <p>
                    Use the power of voice to send instructions, task updates,
                    and any other information. No need to type out everything.
                  </p>
                </div>
              </div>
            )}

            {featureTab === 'reporting' && (
              <div className="feature-block">
                <h3>Reporting</h3>
                <div className="feature-item">
                  <h4>Info graphic Reporting</h4>
                  <p>
                    Use the power of voice to send instructions, task updates,
                    and any other information. No need to type out everything.
                  </p>
                </div>
                <div className="feature-item">
                  <h4>Time sheet</h4>
                  <p>
                    Use the power of voice to send instructions, task updates,
                    and any other information. No need to type out everything.
                  </p>
                </div>
                <div className="feature-item">
                  <h4>Automated Summary</h4>
                  <p>
                    Keep up-to-date on your team&apos;s daily activities by
                    receiving daily automated summary reports on WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {featureTab === 'aiml' && (
              <div className="feature-block">
                <h3>AI/ML</h3>
                <div className="feature-item">
                  <h4>Personalization</h4>
                  <p>
                    Smart algorithms predict user needs and suggest relevant
                    content or services, enhancing engagement and simplifying
                    the experience.
                  </p>
                </div>
                <div className="feature-item">
                  <h4>Resource optimization</h4>
                  <p>
                    Predicts peak usage times to manage resources efficiently,
                    ensuring smooth performance, cost savings, and better system
                    reliability.
                  </p>
                </div>
              </div>
            )}
          </div>
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

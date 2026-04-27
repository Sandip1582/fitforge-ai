import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Machines from './pages/Machines';
import Progress from './pages/Progress';
import Diet from './pages/Diet';
import Chat from './pages/Chat';
import Auth from './pages/Auth';
import WorkoutSession from './pages/WorkoutSession';
import { userData } from './data';

const navItems = [
  { section: 'Main', items: [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/workouts', label: 'Workouts', icon: '🏋️' },
    { path: '/machines', label: 'Machine Guide', icon: '🔧' },
  ]},
  { section: 'Tracking', items: [
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/diet', label: 'Diet Plan', icon: '🥗' },
  ]},
  { section: 'AI', items: [
    { path: '/chat', label: 'AI Trainer', icon: '🤖', badge: 'Live' },
  ]},
];

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your fitness overview.' },
  '/workouts': { title: 'Workouts', subtitle: 'Your personalized training programs.' },
  '/machines': { title: 'Machine Guide', subtitle: 'Learn how to use every gym machine safely.' },
  '/progress': { title: 'Progress', subtitle: 'Track your fitness journey with AI insights.' },
  '/diet': { title: 'Diet Plan', subtitle: 'AI-generated meal plans for your goals.' },
  '/chat': { title: 'AI Trainer Chat', subtitle: 'Ask anything about fitness, diet, or machines.' },
};

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentPage = pageTitles[location.pathname] || pageTitles['/'];

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
      </Routes>
    );
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">⚡</div>
          <div>
            <h1>FitForge AI</h1>
            <span>Virtual Personal Trainer</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((section) => (
            <div className="nav-section" key={section.section}>
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="badge">{item.badge}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user" style={{ marginBottom: 12 }}>
            <div className="user-avatar">{userData.avatar}</div>
            <div className="user-info">
              <div className="user-name">{userData.name}</div>
              <div className="user-plan">{userData.plan} Plan</div>
            </div>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--danger)', color: 'var(--danger)' }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            className="header-btn"
            style={{ display: 'none' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            id="menu-toggle"
          >
            ☰
          </button>
          <div className="header-title">
            <h2>{currentPage.title}</h2>
            <p>{currentPage.subtitle}</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-search">
            <span>🔍</span>
            <input type="text" placeholder="Search exercises, machines..." id="global-search" />
          </div>
          <button className="header-btn" id="notifications-btn">
            🔔
            <span className="notif-dot"></span>
          </button>
          <button className="header-btn" id="settings-btn">⚙️</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/workout-session" element={<WorkoutSession />} />
        </Routes>
      </main>
    </div>
  );
}

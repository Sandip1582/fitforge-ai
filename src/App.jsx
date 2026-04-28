import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Machines from './pages/Machines';
import Progress from './pages/Progress';
import Diet from './pages/Diet';
import Chat from './pages/Chat';
import Auth from './pages/Auth';
import WorkoutSession from './pages/WorkoutSession';
import Subscription from './pages/Subscription';
import { useStore } from './store';
import { exercises } from './data';

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
  { section: 'Account', items: [
    { path: '/subscription', label: 'Subscription', icon: '⭐' },
  ]},
];

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your fitness overview.' },
  '/workouts': { title: 'Workouts', subtitle: 'Your personalized training programs.' },
  '/machines': { title: 'Machine Guide', subtitle: 'Learn how to use every gym machine safely.' },
  '/progress': { title: 'Progress', subtitle: 'Track your fitness journey with AI insights.' },
  '/diet': { title: 'Diet Plan', subtitle: 'AI-generated meal plans for your goals.' },
  '/chat': { title: 'AI Trainer Chat', subtitle: 'Ask anything about fitness, diet, or machines.' },
  '/subscription': { title: 'Subscription', subtitle: 'Manage your FitForge AI plan.' },
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, logout, profile, stats, updateWeight, updateProfile } = useStore();
  const currentPage = pageTitles[location.pathname] || pageTitles['/'];

  const filteredExercises = searchQuery 
    ? exercises.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  if (!profile || !stats) return <div className="loading">Loading FitForge...</div>;

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
            <div className="user-avatar">{profile.avatar || profile.name?.charAt(0) || 'U'}</div>
            <div className="user-info">
              <div className="user-name">{profile.name}</div>
              <div className="user-plan">{profile.plan} Plan</div>
            </div>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={logout}
          >
            🚪 Logout
          </button>
          <div style={{ 
            marginTop: 16, 
            textAlign: 'center', 
            fontSize: '0.65rem', 
            color: 'var(--text-muted)',
            opacity: 0.6,
            letterSpacing: '0.05em'
          }}>
            DEVELOPED BY <br/>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SANDEEP NARNAWARE</span>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            className="header-btn menu-toggle-btn"
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
          <div className="header-search" style={{ position: 'relative' }}>
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Search exercises..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="global-search" 
            />
            {filteredExercises.length > 0 && (
              <div className="card" style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 1000, padding: 8, boxShadow: 'var(--shadow-lg)' }}>
                {filteredExercises.map(ex => (
                  <div 
                    key={ex.id} 
                    className="nav-item" 
                    style={{ margin: 0, cursor: 'pointer' }}
                    onClick={() => {
                      setSearchQuery('');
                      navigate('/workouts'); // In a real app, go to specific exercise
                    }}
                  >
                    {ex.icon} {ex.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              className="header-btn" 
              id="notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              <span className="notif-dot"></span>
            </button>
            
            {showNotifications && (
              <div className="card" style={{ position: 'absolute', top: '110%', right: 0, width: 300, zIndex: 1000, padding: 16, boxShadow: 'var(--shadow-lg)' }}>
                <h4 style={{ marginBottom: 12, fontSize: '0.9rem' }}>Notifications</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: '0.8rem', padding: '8px', background: 'var(--bg-surface)', borderRadius: 8 }}>
                    🎯 Goal Update: You are 2kg away from your target!
                  </div>
                  <div style={{ fontSize: '0.8rem', padding: '8px', background: 'var(--bg-surface)', borderRadius: 8 }}>
                    🔥 3-Day Streak! Keep it up.
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            className="header-btn" 
            id="settings-btn"
            onClick={() => setShowSettings(true)}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: 450, margin: 'auto' }}>
            <div className="section-header">
              <h3 className="section-title">Account Settings</h3>
              <button className="btn-ghost" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  defaultValue={profile.name} 
                  onBlur={(e) => updateProfile({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Goal Weight (kg)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  defaultValue={profile.goalWeight}
                  onBlur={(e) => updateProfile({ goalWeight: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Current Weight: {stats.currentWeight}kg</label>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => setShowSettings(false)}>Close & Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </main>
    </div>
  );
}

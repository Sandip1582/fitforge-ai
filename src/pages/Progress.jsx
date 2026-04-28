import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { weightProgress, strengthProgress, weeklyActivity, progressInsights } from '../data';
import { useStore } from '../store';

const bodyMeasurements = [
  { part: 'Chest', current: '102 cm', change: '+2 cm', trend: 'up' },
  { part: 'Waist', current: '82 cm', change: '-3 cm', trend: 'up' },
  { part: 'Arms', current: '36 cm', change: '+1.5 cm', trend: 'up' },
  { part: 'Thighs', current: '58 cm', change: '+2 cm', trend: 'up' },
];

const consistencyData = [
  { name: 'Completed', value: 80, fill: '#6C5CE7' },
];

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a3e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem' }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function Progress() {
  const [activeTab, setActiveTab] = useState('overview');
  const { profile, stats } = useStore();
  
  const consistencyData = [
    { name: 'Completed', value: Math.round((stats.workoutsCompleted / 60) * 100), fill: '#6C5CE7' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab-btn ${activeTab === 'weight' ? 'active' : ''}`} onClick={() => setActiveTab('weight')}>Weight</button>
        <button className={`tab-btn ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}>Strength</button>
        <button className={`tab-btn ${activeTab === 'body' ? 'active' : ''}`} onClick={() => setActiveTab('body')}>Body</button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Summary Cards */}
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Current Weight', value: `${stats.currentWeight} kg`, sub: `Goal: ${profile.goalWeight} kg`, icon: '⚖️', color: 'cyan' },
              { label: 'Workouts Done', value: `${stats.workoutsCompleted}`, sub: '12 weeks · 4/week avg', icon: '🏋️', color: 'purple' },
              { label: 'Total Volume', value: '142 tons', sub: 'Lifetime weight lifted', icon: '💪', color: 'orange' },
              { label: 'Consistency', value: `${consistencyData[0].value}%`, sub: 'Last 12 weeks', icon: '📅', color: 'green' },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                <div className="stat-info">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-change up">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid-2" style={{ marginBottom: 24 }}>
            <div className="card">
              <h3 className="section-title" style={{ marginBottom: 4 }}>Weight Trend</h3>
              <p className="section-subtitle" style={{ marginBottom: 16 }}>12-week progress</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={stats.weightHistory || weightProgress}>
                  <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00D2FF" stopOpacity={0.3}/><stop offset="100%" stopColor="#00D2FF" stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 11 }} />
                  <YAxis domain={['dataMin-1','dataMax+1']} hide />
                  <Tooltip content={<Tip />} />
                  <Area type="monotone" dataKey="weight" name="Weight (kg)" stroke="#00D2FF" strokeWidth={2} fill="url(#wg)" dot={{ r: 3, fill: '#00D2FF' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="section-title" style={{ marginBottom: 4 }}>Weekly Calories Burned</h3>
              <p className="section-subtitle" style={{ marginBottom: 16 }}>This week</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.weeklyActivity || weeklyActivity} barSize={24}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="calories" name="Calories" fill="#6C5CE7" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card">
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h3 className="section-title">🤖 AI Progress Insights</h3>
              <span className="tag tag-purple">Auto-analyzed</span>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              {progressInsights.map(ins => (
                <div key={ins.id} style={{
                  padding: 16, borderRadius: 'var(--radius-md)',
                  background: ins.type === 'warning' ? 'rgba(255,165,0,0.06)' : ins.type === 'success' ? 'rgba(0,230,118,0.06)' : 'var(--bg-surface)',
                  border: `1px solid ${ins.type === 'warning' ? 'rgba(255,165,0,0.15)' : ins.type === 'success' ? 'rgba(0,230,118,0.15)' : 'var(--border)'}`,
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span>{ins.icon}</span><strong style={{ fontSize: '0.85rem' }}>{ins.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ins.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'weight' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h3 className="section-title" style={{ marginBottom: 4 }}>Weight Progress</h3>
              <p className="section-subtitle">Started: 82 kg → Current: {stats.currentWeight} kg → Target: {profile.goalWeight} kg</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                type="number" 
                id="new-weight-input"
                className="form-input" 
                placeholder="New weight (kg)" 
                style={{ width: 140, padding: '8px 12px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseFloat(e.target.value);
                    if (val > 0) {
                      useStore.getState().updateWeight(val);
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button 
                className="btn btn-outline"
                onClick={() => {
                  const input = document.getElementById('new-weight-input');
                  const val = parseFloat(input.value);
                  if (val > 0) {
                    useStore.getState().updateWeight(val);
                    input.value = '';
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={stats.weightHistory || weightProgress}>
              <defs><linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00D2FF" stopOpacity={0.3}/><stop offset="100%" stopColor="#00D2FF" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <YAxis domain={['dataMin-1','dataMax+1']} axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="weight" name="Weight" stroke="#00D2FF" strokeWidth={2.5} fill="url(#wg2)" dot={{ r: 4, fill: '#00D2FF' }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button className="btn btn-primary" id="log-weight-btn">+ Log Today's Weight</button>
          </div>
        </div>
      )}

      {activeTab === 'strength' && (
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: 4 }}>Strength Progress (Estimated 1RM)</h3>
          <p className="section-subtitle" style={{ marginBottom: 24 }}>Big 3 lifts over 12 weeks</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={strengthProgress}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="bench" name="Bench Press" stroke="#6C5CE7" strokeWidth={2.5} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="squat" name="Squat" stroke="#00D2FF" strokeWidth={2.5} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="deadlift" name="Deadlift" stroke="#00E676" strokeWidth={2.5} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
            {[['Bench Press', '#6C5CE7', '77.5 kg'], ['Squat', '#00D2FF', '100 kg'], ['Deadlift', '#00E676', '130 kg']].map(([name, color, val]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{name}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'body' && (
        <div className="grid-2" style={{ gap: 20 }}>
          <div className="card">
            <h3 className="section-title" style={{ marginBottom: 16 }}>Body Measurements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bodyMeasurements.map(m => (
                <div key={m.part} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{m.part}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>{m.current}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', marginLeft: 8 }}>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} id="log-measurements-btn">+ Update Measurements</button>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 className="section-title" style={{ marginBottom: 8 }}>Consistency Score</h3>
            <p className="section-subtitle" style={{ marginBottom: 16 }}>Workouts completed vs planned</p>
            <ResponsiveContainer width={200} height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={consistencyData} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: -120, fontFamily: 'var(--font-primary)' }}>{consistencyData[0].value}%</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 60 }}>{stats.workoutsCompleted} of 60 workouts completed</p>
          </div>
        </div>
      )}
    </div>
  );
}

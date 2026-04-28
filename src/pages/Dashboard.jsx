import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { workoutPlans, progressInsights } from '../data';
import { useStore } from '../store';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a3e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem' }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}
          {p.name === 'calories' ? ' kcal' : p.name === 'weight' ? ' kg' : ' min'}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const todayPlan = workoutPlans[0];
  const navigate = useNavigate();
  const { profile, stats, updateWeight, updateProtein } = useStore();

  const handleStatClick = (id) => {
    if (id === 3) { // Weight
      const newWeight = prompt(`Enter new weight (Current: ${stats.currentWeight}kg):`);
      if (newWeight && !isNaN(newWeight) && Number(newWeight) > 0) {
        updateWeight(Number(newWeight));
      }
    } else if (id === 4) { // Protein
      const addedProtein = prompt('How many grams of protein did you just eat?');
      if (addedProtein && !isNaN(addedProtein) && Number(addedProtein) > 0) {
        updateProtein(Number(addedProtein));
      }
    } else if (id === 1) { // Workouts
      navigate('/workouts');
    }
  };

  const dashboardStats = [
    { id: 1, label: 'Workouts This Week', value: `${stats.workoutsCompleted}/5`, change: stats.workoutsCompleted > 0 ? '+1 vs last week' : 'Start your week!', trend: stats.workoutsCompleted > 0 ? 'up' : 'neutral', icon: '🏋️', color: 'purple' },
    { id: 2, label: 'Calories Burned', value: stats.caloriesBurned.toLocaleString(), change: stats.caloriesBurned > 0 ? '+12% this week' : 'Ready to burn', trend: stats.caloriesBurned > 0 ? 'up' : 'neutral', icon: '🔥', color: 'orange' },
    { id: 3, label: 'Current Weight', value: `${stats.currentWeight} kg`, change: 'Tap to update', trend: 'neutral', icon: '⚖️', color: 'cyan' },
    { id: 4, label: 'Protein Today', value: `${stats.proteinToday}g`, change: `${Math.round((stats.proteinToday / 160) * 100)}% of target`, trend: stats.proteinToday > 0 ? 'up' : 'neutral', icon: '🥩', color: 'green' },
  ];

  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Welcome Banner */}
      <div className="card-gradient" style={{ marginBottom: 24, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{greeting}, {profile.name}! 💪</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 500 }}>
            You've completed <strong style={{ color: 'var(--accent)' }}>{stats.workoutsCompleted} of 5</strong> workouts this week.
            Your {todayPlan.name} is scheduled for today. Let's crush it!
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-primary" id="start-workout-btn" onClick={() => navigate('/workout-session')}>
              🏋️ Start Today's Workout
            </button>
            <button className="btn btn-outline" id="view-plan-btn" onClick={() => navigate('/workouts')}>
              📋 View Full Plan
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 4 }}>🔥</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--accent)' }}>{stats.streak}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Day Streak</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {dashboardStats.map(stat => (
          <div 
            className="stat-card" 
            key={stat.id} 
            id={`stat-${stat.id}`}
            onClick={() => handleStatClick(stat.id)}
            style={{ cursor: stat.id === 3 || stat.id === 4 || stat.id === 1 ? 'pointer' : 'default', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            onMouseOver={(e) => { if(stat.id === 3 || stat.id === 4 || stat.id === 1) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; } }}
            onMouseOut={(e) => { if(stat.id === 3 || stat.id === 4 || stat.id === 1) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
          >
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : ''} {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Weekly Activity */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 20 }}>
            <div>
              <h3 className="section-title">Weekly Activity</h3>
              <p className="section-subtitle">Calories burned per session</p>
            </div>
            <span className="tag tag-purple">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.weeklyActivity || []} barSize={28}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calories" name="calories" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C5CE7" />
                  <stop offset="100%" stopColor="#a29bfe" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weight Trend */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 20 }}>
            <div>
              <h3 className="section-title">Weight Progress</h3>
              <p className="section-subtitle">12-week trend · Target: {profile.goalWeight}kg</p>
            </div>
            <span className="tag tag-green">
              {(stats.weightHistory?.length || 0) > 1 
                ? `${(stats.weightHistory[stats.weightHistory.length - 1].weight - stats.weightHistory[0].weight).toFixed(1)} kg` 
                : '0 kg'}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.weightHistory || []}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00D2FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b6b8d', fontSize: 12 }} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="weight" name="weight" stroke="#00D2FF" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 3, fill: '#00D2FF' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Today's Workout + Insights */}
      <div className="grid-2">
        {/* Today's Workout */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <h3 className="section-title">Today's Workout</h3>
              <p className="section-subtitle">{todayPlan.name} · {todayPlan.duration}</p>
            </div>
            <span className="tag tag-cyan">{todayPlan.type}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayPlan.exercises.map((ex, i) => (
              <div className="exercise-item" key={i}>
                <div className="exercise-thumb">{ex.icon}</div>
                <div className="exercise-info">
                  <h4>{ex.name}</h4>
                  <p>{ex.muscles.join(', ')}</p>
                </div>
                <div className="exercise-sets">{ex.sets}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <h3 className="section-title">AI Insights</h3>
              <p className="section-subtitle">Smart recommendations from your data</p>
            </div>
            <span className="tag tag-purple">🤖 AI</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {progressInsights.map(insight => (
              <div key={insight.id} style={{
                padding: '14px 16px',
                background: insight.type === 'warning' ? 'rgba(255,165,0,0.06)' : insight.type === 'success' ? 'rgba(0,230,118,0.06)' : 'var(--bg-surface)',
                border: `1px solid ${insight.type === 'warning' ? 'rgba(255,165,0,0.15)' : insight.type === 'success' ? 'rgba(0,230,118,0.15)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span>{insight.icon}</span>
                  <strong style={{ fontSize: '0.85rem' }}>{insight.title}</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

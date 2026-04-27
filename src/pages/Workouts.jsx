import { useState } from 'react';
import { workoutPlans, exercises } from '../data';

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export default function Workouts() {
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [showVideo, setShowVideo] = useState(null);

  const filteredExercises = muscleFilter === 'All'
    ? exercises
    : exercises.filter(e => e.category.toLowerCase() === muscleFilter.toLowerCase() || e.muscles.some(m => m.toLowerCase().includes(muscleFilter.toLowerCase())));

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Tabs */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => { setActiveTab('plans'); setSelectedPlan(null); }} id="tab-plans">My Plans</button>
        <button className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`} onClick={() => { setActiveTab('library'); setSelectedPlan(null); }} id="tab-library">Exercise Library</button>
        <button className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`} onClick={() => { setActiveTab('generate'); setSelectedPlan(null); }} id="tab-generate">🤖 AI Generate</button>
      </div>

      {/* Plans Tab */}
      {activeTab === 'plans' && !selectedPlan && (
        <div>
          <div className="section-header" style={{ marginBottom: 20 }}>
            <div>
              <h3 className="section-title">Your Workout Plans</h3>
              <p className="section-subtitle">Push / Pull / Legs split · 5 days/week</p>
            </div>
            <button className="btn btn-primary btn-sm" id="new-plan-btn">+ New Plan</button>
          </div>
          <div className="grid-3">
            {workoutPlans.map(plan => (
              <div className="workout-card" key={plan.id} onClick={() => setSelectedPlan(plan)} style={{ cursor: 'pointer' }}>
                <div className="workout-card-img" style={{
                  background: plan.type === 'Push' ? 'linear-gradient(135deg, #6C5CE7, #a29bfe)' :
                    plan.type === 'Pull' ? 'linear-gradient(135deg, #00D2FF, #6C5CE7)' :
                    'linear-gradient(135deg, #00E676, #00D2FF)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'
                }}>
                  {plan.type === 'Push' ? '🏋️' : plan.type === 'Pull' ? '🧗' : '🦵'}
                </div>
                <div className="workout-card-body">
                  <h3>{plan.name}</h3>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span className="tag tag-purple">{plan.type}</span>
                    <span className="tag tag-cyan">{plan.difficulty}</span>
                  </div>
                  <div className="workout-card-meta">
                    <span>⏱️ {plan.duration}</span>
                    <span>🔥 {plan.calories} kcal</span>
                    <span>💪 {plan.exercises.length} exercises</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Plan Detail */}
      {activeTab === 'plans' && selectedPlan && (
        <div>
          <button className="btn btn-ghost" onClick={() => setSelectedPlan(null)} style={{ marginBottom: 16 }}>← Back to Plans</button>
          <div className="card-gradient" style={{ marginBottom: 24, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: 8 }}>{selectedPlan.name}</h2>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>⏱️ {selectedPlan.duration}</span>
                  <span>🔥 {selectedPlan.calories} kcal</span>
                  <span>📊 {selectedPlan.difficulty}</span>
                </div>
              </div>
              <button className="btn btn-primary" id="start-plan-btn">▶️ Start Workout</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selectedPlan.exercises.map((ex, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                    background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0
                  }}>{i + 1}</div>
                  <div className="exercise-thumb">{ex.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: 4 }}>{ex.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ex.muscles.join(' · ')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)' }}>{ex.sets}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rest: {ex.rest}</div>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => setShowVideo(showVideo === ex.id ? null : ex.id)}>
                    {showVideo === ex.id ? '✕ Close' : '▶ Video'}
                  </button>
                </div>
                {showVideo === ex.id && (
                  <div style={{ padding: '0 20px 20px' }}>
                    <div className="video-container" style={{ marginBottom: 16 }}>
                      <iframe src={`https://www.youtube-nocookie.com/embed/${ex.videoId}`} title={ex.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className="grid-2" style={{ gap: 16 }}>
                      <div>
                        <h5 style={{ fontSize: '0.82rem', marginBottom: 8, color: 'var(--accent)' }}>📋 Instructions</h5>
                        <ol style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {ex.instructions.map((step, j) => (
                            <li key={j} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.82rem', marginBottom: 8, color: 'var(--success)' }}>💡 Pro Tips</h5>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {ex.tips.map((tip, j) => (
                            <li key={j} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>✓ {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Library Tab */}
      {activeTab === 'library' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {muscleGroups.map(g => (
              <button key={g} className={`btn btn-sm ${muscleFilter === g ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMuscleFilter(g)} id={`filter-${g.toLowerCase()}`}>
                {g}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredExercises.map(ex => (
              <div key={ex.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="exercise-item" style={{ border: 'none', cursor: 'pointer' }}
                  onClick={() => setShowVideo(showVideo === ex.id ? null : ex.id)}>
                  <div className="exercise-thumb">{ex.icon}</div>
                  <div className="exercise-info">
                    <h4>{ex.name}</h4>
                    <p>{ex.muscles.join(' · ')} · {ex.equipment}</p>
                  </div>
                  <span className={`tag ${ex.difficulty === 'beginner' ? 'tag-green' : ex.difficulty === 'intermediate' ? 'tag-cyan' : 'tag-orange'}`}>
                    {ex.difficulty}
                  </span>
                  <div className="exercise-sets">{ex.sets}</div>
                </div>
                {showVideo === ex.id && (
                  <div style={{ padding: '0 20px 20px' }}>
                    <div className="video-container" style={{ marginBottom: 12 }}>
                      <iframe src={`https://www.youtube-nocookie.com/embed/${ex.videoId}`} title={ex.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className="grid-2" style={{ gap: 16 }}>
                      <div>
                        <h5 style={{ fontSize: '0.82rem', marginBottom: 8, color: 'var(--accent)' }}>📋 How to Perform</h5>
                        <ol style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {ex.instructions.map((s, i) => <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s}</li>)}
                        </ol>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.82rem', marginBottom: 8, color: 'var(--success)' }}>💡 Tips</h5>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {ex.tips.map((t, i) => <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>✓ {t}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Generate Tab */}
      {activeTab === 'generate' && (
        <div className="card" style={{ maxWidth: 600 }}>
          <h3 className="section-title" style={{ marginBottom: 4 }}>🤖 AI Workout Generator</h3>
          <p className="section-subtitle" style={{ marginBottom: 24 }}>Tell us your preferences and our AI will create the perfect workout.</p>

          <div className="form-group">
            <label className="form-label">Workout Focus</label>
            <select className="form-input" id="gen-focus">
              <option>Upper Body - Push</option>
              <option>Upper Body - Pull</option>
              <option>Legs & Glutes</option>
              <option>Full Body</option>
              <option>Core & Abs</option>
            </select>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Duration</label>
              <select className="form-input" id="gen-duration">
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>75 minutes</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="form-input" id="gen-difficulty">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Available Equipment</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Barbell', 'Dumbbells', 'Cable Machine', 'Bodyweight', 'Machines'].map(eq => (
                <button key={eq} className="btn btn-outline btn-sm" style={{ borderRadius: 20 }}>{eq}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Special Instructions (optional)</label>
            <input type="text" className="form-input" placeholder="e.g., avoid overhead pressing (shoulder injury)" id="gen-notes" />
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} id="generate-workout-btn">
            ⚡ Generate AI Workout
          </button>
        </div>
      )}
    </div>
  );
}

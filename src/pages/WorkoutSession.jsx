import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutPlans } from '../data';
import { useStore } from '../store';

export default function WorkoutSession() {
  const navigate = useNavigate();
  const plan = workoutPlans[0]; // "Today's workout"
  const { completeWorkout } = useStore();
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);

  const currentExercise = plan.exercises[currentExerciseIdx];
  const isFinished = currentExerciseIdx >= plan.exercises.length;

  const handleFinish = () => {
    completeWorkout(plan.calories);
    navigate('/');
  };

  // Main workout timer
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  // Rest timer
  useEffect(() => {
    let timer;
    if (isResting && restTimeLeft > 0) {
      timer = setInterval(() => setRestTimeLeft(prev => prev - 1), 1000);
    } else if (isResting && restTimeLeft <= 0) {
      setIsResting(false);
    }
    return () => clearInterval(timer);
  }, [isResting, restTimeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNextExercise = () => {
    if (currentExerciseIdx < plan.exercises.length - 1) {
      // Start rest timer based on the current exercise's recommended rest
      const restSecs = parseInt(currentExercise.rest.replace('s', '')) || 60;
      setRestTimeLeft(restSecs);
      setIsResting(true);
      setCurrentExerciseIdx(prev => prev + 1);
    } else {
      setCurrentExerciseIdx(prev => prev + 1); // Triggers finished state
    }
  };

  if (isFinished) {
    return (
      <div style={{ animation: 'fadeIn 0.5s ease', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>Workout Complete!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          You crushed <strong>{plan.name}</strong> in {formatTime(timeElapsed)}. Awesome job!
        </p>
        <div className="grid-3" style={{ maxWidth: 600, margin: '0 auto 32px' }}>
          <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label">Duration</div>
            <div className="stat-value">{formatTime(timeElapsed)}</div>
          </div>
          <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label">Volume</div>
            <div className="stat-value">5,240 kg</div>
          </div>
          <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label">Est. Burn</div>
            <div className="stat-value">{plan.calories} kcal</div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleFinish}>
          Finish & Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ padding: 0, marginBottom: 8 }}>
            ← End Workout Early
          </button>
          <h2 style={{ fontSize: '1.5rem' }}>{plan.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Exercise {currentExerciseIdx + 1} of {plan.exercises.length}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Time Elapsed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--accent)' }}>
            {formatTime(timeElapsed)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ marginBottom: 32 }}>
        <div className="progress-fill purple" style={{ width: `${((currentExerciseIdx) / plan.exercises.length) * 100}%` }} />
      </div>

      {/* Main Content */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
        
        {/* Rest Overlay */}
        {isResting && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(10,10,26,0.9)', backdropFilter: 'blur(8px)',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: 16 }}>Rest Period</h3>
            <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--success)', marginBottom: 24 }}>
              {formatTime(restTimeLeft)}
            </div>
            <button className="btn btn-outline" onClick={() => setIsResting(false)}>Skip Rest</button>
          </div>
        )}

        <div style={{ padding: '24px 32px', display: 'flex', gap: 24, alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '3rem' }}>{currentExercise.icon}</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{currentExercise.name}</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <span className="tag tag-purple">{currentExercise.category}</span>
              <span className="tag tag-cyan">{currentExercise.equipment}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>{currentExercise.sets}</div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 0 }}>
          {/* Video */}
          <div style={{ padding: 24, borderRight: '1px solid var(--border)' }}>
            <div className="video-container" style={{ borderRadius: 'var(--radius-sm)' }}>
              <iframe src={`https://www.youtube-nocookie.com/embed/${currentExercise.videoId}?autoplay=1&mute=1`} title={currentExercise.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>

          {/* Tips */}
          <div style={{ padding: 24 }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: 12, color: 'var(--success)' }}>💡 Pro Tips</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentExercise.tips.map((tip, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> {tip}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 32 }}>
              <button 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleNextExercise}
              >
                {currentExerciseIdx === plan.exercises.length - 1 ? 'Finish Workout 🏆' : 'Mark Complete & Rest ⏳'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { machines } from '../data';

const categories = ['All', 'Back', 'Chest', 'Legs', 'Multi'];

export default function Machines() {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [catFilter, setCatFilter] = useState('All');

  const filtered = catFilter === 'All' ? machines : machines.filter(m => m.category === catFilter);

  if (selectedMachine) {
    const m = selectedMachine;
    return (
      <div style={{ animation: 'fadeIn 0.4s ease' }}>
        <button className="btn btn-ghost" onClick={() => setSelectedMachine(null)} style={{ marginBottom: 16 }}>← Back to Machines</button>

        <div className="grid-2" style={{ gap: 24, marginBottom: 24 }}>
          <div>
            <div className="video-container">
              <iframe src={`https://www.youtube-nocookie.com/embed/${m.videoId}`} title={m.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span className="tag tag-purple">{m.category}</span>
              <span className={`tag ${m.difficulty === 'Beginner' ? 'tag-green' : 'tag-cyan'}`}>{m.difficulty}</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{m.icon} {m.name}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>{m.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {m.muscles.map(muscle => (
                <span key={muscle} className="tag tag-cyan">{muscle}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 20, marginBottom: 24 }}>
          {/* Setup */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(0,210,255,0.15)', padding: '6px 10px', borderRadius: 8, fontSize: '0.85rem' }}>⚙️</span>
              Setup Steps
            </h3>
            <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {m.setup.map((step, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Execution */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(108,92,231,0.15)', padding: '6px 10px', borderRadius: 8, fontSize: '0.85rem' }}>🎯</span>
              How to Execute
            </h3>
            <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {m.execution.map((step, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 20 }}>
          {/* Safety */}
          <div className="card" style={{ borderColor: 'rgba(0,230,118,0.2)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(0,230,118,0.15)', padding: '6px 10px', borderRadius: 8, fontSize: '0.85rem' }}>✅</span>
              Safety Tips
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {m.safety.map((tip, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>{tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="card" style={{ borderColor: 'rgba(255,107,107,0.2)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(255,107,107,0.15)', padding: '6px 10px', borderRadius: 8, fontSize: '0.85rem' }}>⚠️</span>
              Common Mistakes
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {m.mistakes.map((mistake, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--danger)', flexShrink: 0 }}>✗</span>{mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {categories.map(c => (
          <button key={c} className={`btn btn-sm ${catFilter === c ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCatFilter(c)} id={`machine-cat-${c.toLowerCase()}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map(machine => (
          <div className="machine-card" key={machine.id} onClick={() => setSelectedMachine(machine)}>
            <div className="machine-card-img">{machine.icon}</div>
            <div className="machine-card-body">
              <h3>{machine.name}</h3>
              <p>{machine.muscles.join(' · ')}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <span className="tag tag-purple">{machine.category}</span>
                <span className={`tag ${machine.difficulty === 'Beginner' ? 'tag-green' : 'tag-cyan'}`}>{machine.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

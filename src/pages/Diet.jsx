import { useState } from 'react';
import { mealPlans, vegMealPlans, userData } from '../data';

export default function Diet() {
  const [dietType, setDietType] = useState('non-veg');
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  
  const basePlan = dietType === 'veg' ? vegMealPlans : mealPlans;
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayIndex = days.indexOf(selectedDay);
  
  // Dynamically generate a slightly different plan for each day
  const plan = {
    ...basePlan,
    calories: basePlan.calories + (dayIndex * 25) - 75,
    protein: basePlan.protein + (dayIndex * 3) - 9,
    carbs: basePlan.carbs + (dayIndex * 5) - 15,
    meals: basePlan.meals.map((meal, i) => {
      // Simulate different meals by changing names or calories slightly on different days
      let newName = meal.name;
      if (dayIndex % 2 !== 0 && dietType === 'non-veg' && i === 2) newName = 'Tuna & Quinoa Bowl';
      if (dayIndex % 2 !== 0 && dietType === 'veg' && i === 2) newName = 'Chickpea & Spinach Curry';
      if (dayIndex === 6 && i === 4) newName = 'Cheat Meal / Free Choice';

      return {
        ...meal,
        name: newName,
        calories: meal.calories + (dayIndex * 5) - 15,
      };
    })
  };

  const proteinPct = Math.round((plan.protein * 4 / plan.calories) * 100);
  const carbsPct = Math.round((plan.carbs * 4 / plan.calories) * 100);
  const fatsPct = Math.round((plan.fats * 9 / plan.calories) * 100);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Diet Type Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={`tab-btn ${dietType === 'non-veg' ? 'active' : ''}`} onClick={() => setDietType('non-veg')}>🍗 Non-Veg</button>
          <button className={`tab-btn ${dietType === 'veg' ? 'active' : ''}`} onClick={() => setDietType('veg')}>🥬 Vegetarian</button>
        </div>
        <button className="btn btn-primary btn-sm" id="regenerate-diet-btn">🤖 Regenerate Week</button>
      </div>

      {/* Day Selector */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 16, scrollbarWidth: 'none' }}>
        {days.map(day => (
          <button 
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: 20, 
              border: `1px solid ${selectedDay === day ? 'var(--primary)' : 'var(--border)'}`,
              background: selectedDay === day ? 'rgba(108,92,231,0.15)' : 'var(--bg-card)',
              color: selectedDay === day ? 'var(--primary-light)' : 'var(--text-secondary)',
              fontWeight: selectedDay === day ? 600 : 400,
              cursor: 'pointer',
              minWidth: 'fit-content'
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Macro Summary */}
      <div className="card-gradient" style={{ marginBottom: 24, padding: '24px 28px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>📊 Daily Macro Targets</h3>
        <div className="grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--accent)' }}>{plan.calories}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Calories</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--danger)' }}>{plan.protein}g</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Protein ({proteinPct}%)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--warning)' }}>{plan.carbs}g</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Carbs ({carbsPct}%)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--success)' }}>{plan.fats}g</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fats ({fatsPct}%)</div>
          </div>
        </div>

        {/* Macro Bar */}
        <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 20, gap: 2 }}>
          <div style={{ width: `${proteinPct}%`, background: 'var(--danger)' }} />
          <div style={{ width: `${carbsPct}%`, background: 'var(--warning)' }} />
          <div style={{ width: `${fatsPct}%`, background: 'var(--success)' }} />
        </div>
      </div>

      {/* Goal Info */}
      <div className="card" style={{ marginBottom: 24, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Goal:</span>
          <strong style={{ marginLeft: 8, color: 'var(--accent)' }}>Fat Loss</strong>
          <span style={{ margin: '0 12px', color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TDEE:</span>
          <strong style={{ marginLeft: 8 }}>2,500 kcal</strong>
          <span style={{ margin: '0 12px', color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Deficit:</span>
          <strong style={{ marginLeft: 8, color: 'var(--danger)' }}>-300 kcal</strong>
        </div>
        <span className="tag tag-purple">🤖 AI Calculated</span>
      </div>

      {/* Meals */}
      <div className="section-header" style={{ marginBottom: 16 }}>
        <h3 className="section-title">{selectedDay}'s Meal Plan</h3>
        <button className="btn btn-outline btn-sm" id="grocery-list-btn">🛒 Grocery List</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {plan.meals.map(meal => (
          <div className="meal-card" key={meal.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="meal-time">{meal.time}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: '1.8rem' }}>{meal.icon}</span>
                  <div>
                    <h3 className="meal-name">{meal.name}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{meal.calories} kcal</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {meal.items.map((item, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem',
                      background: 'var(--bg-surface)', color: 'var(--text-secondary)',
                      border: '1px solid var(--border)'
                    }}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="meal-macros" style={{ flexDirection: 'column', gap: 8, minWidth: 130 }}>
                {[
                  { label: 'Protein', val: `${meal.protein}g`, color: 'var(--danger)' },
                  { label: 'Carbs', val: `${meal.carbs}g`, color: 'var(--warning)' },
                  { label: 'Fats', val: `${meal.fats}g`, color: 'var(--success)' },
                ].map(m => (
                  <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.label}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: m.color }}>{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

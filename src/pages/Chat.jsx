import { useState, useRef, useEffect } from 'react';
import { chatSuggestions } from '../data';
import { useStore } from '../store';

const aiResponses = {
  'push': `Here's a **Push Day** workout tailored for you:\n\n**Warm-up:** 5 min treadmill + arm circles\n\n1. **Barbell Bench Press** — 4 × 8-10 (90s rest)\n2. **Overhead Press** — 4 × 8-10 (90s rest)\n3. **Incline Dumbbell Press** — 3 × 10-12 (60s rest)\n4. **Cable Flyes** — 3 × 12-15 (60s rest)\n5. **Lateral Raises** — 3 × 15 (45s rest)\n6. **Tricep Pushdowns** — 3 × 12-15 (45s rest)\n\n**Estimated Duration:** 55 minutes\n**Estimated Calories:** 480 kcal\n\n💡 Focus on controlled eccentric (3 sec lowering). Progressive overload is key!`,

  'lat pulldown': `## Lat Pulldown Machine Guide 🔧\n\n**Target Muscles:** Latissimus Dorsi, Biceps, Rhomboids\n\n**Setup:**\n1. Adjust thigh pad to secure your legs\n2. Select appropriate weight\n3. Use a wide overhand grip\n\n**Execution:**\n1. Pull bar to upper chest\n2. Squeeze shoulder blades together\n3. Hold 1 second, then release slowly\n\n**⚠️ Safety Tips:**\n- Never pull behind the neck\n- Don't lean too far back\n- Control the weight — don't let it slam\n\n**Common Mistakes:**\n- Using momentum instead of muscles\n- Gripping too tight — use a hook grip\n\n🎥 [Watch demo video in Machine Guide section]`,

  'protein': `## Your Protein Analysis 🥩\n\n**Current intake:** ~142g/day\n**Target:** 160g/day (2g per kg bodyweight)\n**Status:** You're at **89%** of your target\n\n**Recommendations:**\n- Add one extra protein shake post-workout (+25g)\n- Include Greek yogurt as a snack (+15g)\n- Consider cottage cheese before bed (+20g)\n\n**High-protein food ideas:**\n🍗 Chicken breast — 31g per 100g\n🥚 Eggs — 13g per 2 eggs\n🐟 Salmon — 25g per 100g\n🥛 Whey protein — 25g per scoop\n\nYou're close! Just a small adjustment will get you to your target. 💪`,

  'squat': `## Squat Plateau Analysis 📊\n\nI've analyzed your training data and here's why your squat may have stalled at **100kg**:\n\n**Possible causes:**\n1. **Volume fatigue** — You've been doing 4×6 for 4 weeks straight\n2. **Recovery** — Your sleep has been inconsistent\n3. **Nutrition** — Slight calorie deficit may limit strength gains\n\n**Recommendations:**\n1. 🔄 **Deload week** — Drop to 80kg for 3×5 next week\n2. 📈 **Change rep scheme** — Try 5×3 at 95kg after deload\n3. 🏋️ **Add accessories** — Pause squats, leg press, Bulgarian splits\n4. 😴 **Sleep 7-8 hours** — Critical for recovery\n5. 🥩 **Increase protein** to 2.2g/kg during plateau\n\nPlateaus are normal — it means you've adapted! Time to change the stimulus. 🔥`,

  'vegetarian': `## 🌱 Vegetarian Meal Plan\n\n**Daily Targets:** 2,100 kcal | 140g protein\n\n**Breakfast (8 AM):** Paneer Paratha + Curd\n- 450 kcal | 25g protein\n- 2 whole wheat parathas, 80g paneer, 100g curd\n\n**Mid-Morning (11 AM):** Sprouts Chaat\n- 250 kcal | 18g protein\n\n**Lunch (1 PM):** Rajma Chawal + Salad\n- 550 kcal | 30g protein\n- 200g rajma curry, 150g brown rice, buttermilk\n\n**Pre-Workout (4:30 PM):** Banana Peanut Smoothie\n- 340 kcal | 25g protein\n\n**Dinner (8 PM):** Tofu Stir-Fry + Roti\n- 510 kcal | 35g protein\n- 200g tofu, mixed vegetables, 2 rotis\n\n💡 **Tip:** Combine legumes + grains for complete amino acid profiles!`,

  'rear delts': `## Rear Delt Exercises 🎯\n\nHere are the best exercises for targeting your rear deltoids:\n\n1. **Face Pulls** (Cable) — 4 × 15-20\n   Best overall rear delt exercise\n\n2. **Reverse Pec Deck** — 3 × 12-15\n   Great for isolation\n\n3. **Bent-Over Reverse Flyes** — 3 × 12-15\n   Dumbbell variation\n\n4. **Band Pull-Aparts** — 3 × 20\n   Perfect warm-up exercise\n\n5. **Wide-Grip Rows** — 3 × 10-12\n   Compound movement\n\n**Pro Tips:**\n- Rear delts respond well to higher reps (15-20)\n- Train them 2-3x per week for best results\n- Focus on the squeeze, not the weight\n- Include them in both push AND pull days`,
};

function getAIResponse(msg, profile) {
  const lower = msg.toLowerCase();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return response;
  }
  return `Great question! Based on your profile (${profile.fitnessLevel} level, ${profile.goal.replace('_',' ')} goal), here's my recommendation:\n\n${msg.length > 20 ? 'I\'ve analyzed your query and ' : ''}Let me break this down for you:\n\n1. **Current Status:** You're making good progress with your training\n2. **Suggestion:** Continue with your current PPL split while focusing on progressive overload\n3. **Nutrition:** Maintain your current caloric deficit of 300 kcal\n\nWould you like me to:\n- 🏋️ Generate a specific workout?\n- 🥗 Create a meal plan?\n- 📊 Analyze your progress data?\n- 🔧 Explain a machine?\n\nJust ask! I'm here to help you reach your goals. 💪`;
}

export default function Chat() {
  const { profile } = useStore();
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: `Hey ${profile.name}! 👋 I'm your AI Fitness Trainer. I can help you with:\n\n🏋️ **Workout Plans** — Custom routines for your goals\n🔧 **Machine Guides** — How to use any gym equipment\n📊 **Progress Analysis** — Insights from your data\n🥗 **Diet Plans** — Personalized meal recommendations\n\nWhat would you like help with today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: getAIResponse(text, profile) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatText = (text) => {
    return text
      .replace(/## (.*)/g, '<h3 style="font-size:1rem;margin:8px 0">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n- (.*)/g, '<br/>• $1')
      .replace(/\n(\d+)\. (.*)/g, '<br/>$1. $2')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="chat-container">
      {/* Suggestion chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {chatSuggestions.map((s, i) => (
          <button key={i} className="btn btn-outline btn-sm" style={{ borderRadius: 20, fontSize: '0.75rem' }}
            onClick={() => sendMessage(s)} id={`chat-suggest-${i}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-msg ${msg.role}`}>
            <div className="chat-avatar">
              {msg.role === 'ai' ? '🤖' : (profile.avatar || profile.name?.charAt(0) || 'U')}
            </div>
            <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
          </div>
        ))}

        {isTyping && (
          <div className="chat-msg ai">
            <div className="chat-avatar">🤖</div>
            <div className="chat-bubble">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>📎</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI trainer anything..."
          id="chat-input"
        />
        <button className="chat-send" onClick={() => sendMessage(input)} id="chat-send-btn">
          ➤
        </button>
      </div>
    </div>
  );
}

import { useStore } from '../store';

export default function Subscription() {
  const { profile, upgradePlan } = useStore();

  const handleUpgrade = (planName) => {
    if (profile.plan === planName) return;
    
    // In a real app, this would redirect to Stripe Checkout
    alert(`Redirecting to payment gateway for the ${planName} plan...`);
    upgradePlan(planName);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 20 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 12 }}>Choose Your Fitness Journey</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          Upgrade to unlock advanced AI coaching, unlimited workout generations, and detailed macronutrient tracking.
        </p>
      </div>

      <div className="grid-3" style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Free Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: profile.plan === 'Free' ? 'var(--primary)' : 'var(--border)' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Free</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-primary)' }}>$0<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          </div>
          
          <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <li>✔️ Basic workout logging</li>
            <li>✔️ Standard exercise library</li>
            <li>✔️ Global progress tracking</li>
            <li style={{ color: 'var(--text-muted)' }}>❌ AI workout generation</li>
            <li style={{ color: 'var(--text-muted)' }}>❌ Advanced diet planning</li>
          </ul>

          <button 
            className="btn btn-outline" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={profile.plan === 'Free'}
          >
            {profile.plan === 'Free' ? 'Current Plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="card-gradient" style={{ display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', zIndex: 10, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--accent)' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--gradient-accent)', padding: '4px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
            Most Popular
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Pro</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-primary)', color: 'var(--accent)' }}>$9.99<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          </div>
          
          <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
            <li>✔️ Everything in Free</li>
            <li>✔️ <b>AI workout generation</b></li>
            <li>✔️ Video tutorials for all exercises</li>
            <li>✔️ Weekly diet planning</li>
            <li style={{ color: 'var(--text-muted)' }}>❌ 1-on-1 human coaching</li>
          </ul>

          <button 
            className={`btn ${profile.plan === 'Pro' ? 'btn-outline' : 'btn-primary'}`}
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => handleUpgrade('Pro')}
            disabled={profile.plan === 'Pro'}
          >
            {profile.plan === 'Pro' ? 'Current Plan' : 'Upgrade to Pro'}
          </button>
        </div>

        {/* Elite Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: profile.plan === 'Elite' ? 'var(--primary)' : 'var(--border)' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Elite</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-primary)' }}>$24.99<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          </div>
          
          <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <li>✔️ Everything in Pro</li>
            <li>✔️ <b>Real-time posture tracking AI</b></li>
            <li>✔️ Advanced biomechanics breakdown</li>
            <li>✔️ Sync with Apple Health & Garmin</li>
            <li>✔️ Priority AI chat support</li>
          </ul>

          <button 
            className={`btn ${profile.plan === 'Elite' ? 'btn-outline' : 'btn-primary'}`}
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => handleUpgrade('Elite')}
            disabled={profile.plan === 'Elite'}
          >
            {profile.plan === 'Elite' ? 'Current Plan' : 'Upgrade to Elite'}
          </button>
        </div>
      </div>
    </div>
  );
}

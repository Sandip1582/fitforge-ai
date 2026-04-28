import { useState } from 'react';
import { useStore } from '../store';

export default function Subscription() {
  const { profile, upgradePlan } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form', 'processing', 'success'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi'
  const [upiId, setUpiId] = useState('7620863033@ybl');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    name: profile.name?.toUpperCase() || 'USER NAME',
    expiry: '12/28',
    cvc: '123'
  });

  const handleUpgradeClick = (planName) => {
    if (profile.plan === planName) return;
    setSelectedPlan(planName);
    setPaymentStep('form');
    setShowModal(true);
  };

  const handleProcessPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      upgradePlan(selectedPlan);
    }, 2500);
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
            onClick={() => handleUpgradeClick('Pro')}
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
            onClick={() => handleUpgradeClick('Elite')}
            disabled={profile.plan === 'Elite'}
          >
            {profile.plan === 'Elite' ? 'Current Plan' : 'Upgrade to Elite'}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: 450, padding: 32, position: 'relative', overflow: 'hidden' }}>
            {paymentStep !== 'success' && (
              <button 
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            )}

            {paymentStep === 'form' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Complete Payment</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>You are upgrading to <strong>{selectedPlan} Plan</strong></p>

                {/* Payment Method Toggle */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    style={{ 
                      flex: 1, padding: '12px', borderRadius: 12, border: '1px solid', 
                      borderColor: paymentMethod === 'card' ? 'var(--primary)' : 'var(--border)',
                      background: paymentMethod === 'card' ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
                      color: paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--text-muted)',
                      cursor: 'pointer', transition: 'all 0.3s ease'
                    }}
                  >
                    💳 Card
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    style={{ 
                      flex: 1, padding: '12px', borderRadius: 12, border: '1px solid', 
                      borderColor: paymentMethod === 'upi' ? 'var(--primary)' : 'var(--border)',
                      background: paymentMethod === 'upi' ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
                      color: paymentMethod === 'upi' ? 'var(--primary-light)' : 'var(--text-muted)',
                      cursor: 'pointer', transition: 'all 0.3s ease'
                    }}
                  >
                    📱 UPI
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <>
                    <div style={{ marginBottom: 16, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>💳 Add New Card</div>
                    {/* Mock Credit Card Preview */}
                    <div style={{ 
                      background: 'linear-gradient(135deg, #6C5CE7, #a29bfe)', 
                      borderRadius: 16, 
                      padding: 24, 
                      marginBottom: 24, 
                      color: 'white',
                      boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>FITFORGE</div>
                        <div style={{ fontSize: '1.5rem' }}>VISA</div>
                      </div>
                      <div style={{ fontSize: '1.2rem', letterSpacing: 4, marginBottom: 20 }}>
                        {cardDetails.number || '•••• •••• •••• ••••'}
                      </div>
                      <div style={{ display: 'flex', gap: 32 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.6rem', opacity: 0.8, textTransform: 'uppercase' }}>Card Holder</div>
                          <div style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {cardDetails.name || 'YOUR NAME'}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.6rem', opacity: 0.8, textTransform: 'uppercase' }}>Expires</div>
                          <div style={{ fontSize: '0.85rem' }}>{cardDetails.expiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="4242 4242 4242 4242"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)})}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Card Holder Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="FULL NAME"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value.toUpperCase()})}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVC</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="•••"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value.slice(0, 3)})}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ paddingBottom: 24 }}>
                    <div style={{ background: 'var(--bg-surface)', padding: 20, borderRadius: 16, border: '1px solid var(--border)', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 40, height: 40, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                          🇮🇳
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>UPI Payment</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPay, PhonePe, Paytm, etc.</div>
                        </div>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">UPI ID</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="username@bank" 
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                      {['@okaxis', '@okicici', '@paytm', '@ybl'].map(suffix => (
                        <span 
                          key={suffix} 
                          onClick={() => setUpiId(upiId.split('@')[0] + suffix)}
                          style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 20, cursor: 'pointer' }}
                        >
                          {suffix}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: 8, height: 48, justifyContent: 'center', fontSize: '1rem' }}
                  onClick={handleProcessPayment}
                >
                  {paymentMethod === 'card' ? `Pay $${selectedPlan === 'Pro' ? '9.99' : '24.99'}` : 'Verify & Pay'}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 16 }}>
                  🛡️ Secure encrypted payment via {paymentMethod === 'card' ? 'Stripe' : 'UPI'} Mock
                </p>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.3s ease' }}>
                <div className="loading-spinner" style={{ margin: '0 auto 24px', width: 50, height: 50, border: '4px solid rgba(108, 92, 231, 0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <h3>{paymentMethod === 'upi' ? 'Waiting for Approval...' : 'Processing Payment...'}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                  {paymentMethod === 'upi' ? 'Check your UPI app to approve the request' : 'Please do not refresh the page'}
                </p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                <div style={{ width: 80, height: 80, background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.5rem', color: 'white', boxShadow: '0 0 20px rgba(0, 230, 118, 0.4)' }}>
                  ✓
                </div>
                <h2 style={{ marginBottom: 12 }}>Payment Successful!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
                  Welcome to <strong>FitForge {selectedPlan}</strong>. Your premium features are now unlocked.
                </p>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowModal(false)}
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

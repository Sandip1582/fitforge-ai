import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (email) {
      const users = JSON.parse(localStorage.getItem('fitforge_users') || '{}');
      if (users[email]) {
        setSuccess(`A password reset link has been sent to ${email}.`);
        // In this simulated app, we'll auto-return to login after a few seconds
        setTimeout(() => {
          setIsForgotPassword(false);
          setSuccess('');
        }, 3000);
      } else {
        setError('No account found with that email address.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin) {
      // Handle Sign Up
      if (email && password && name) {
        // Save to local storage to simulate a database
        const users = JSON.parse(localStorage.getItem('fitforge_users') || '{}');
        if (users[email]) {
          setError('An account with this email already exists.');
          return;
        }
        users[email] = { password, name };
        localStorage.setItem('fitforge_users', JSON.stringify(users));
        
        // Auto-login after signup
        onLogin();
        navigate('/');
      }
    } else {
      // Handle Sign In
      if (email && password) {
        const users = JSON.parse(localStorage.getItem('fitforge_users') || '{}');
        const user = users[email];
        
        if (user && user.password === password) {
          // Success
          onLogin();
          navigate('/');
        } else {
          // Failure
          setError('Invalid email or password. Please try again or create an account.');
        }
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'var(--bg-dark)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0
      }} />

      <div className="card-glass" style={{
        width: '100%',
        maxWidth: 420,
        zIndex: 1,
        animation: 'fadeInUp 0.5s ease',
        padding: '40px 32px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px',
            boxShadow: 'var(--shadow-glow)'
          }}>⚡</div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 8, fontFamily: 'var(--font-primary)' }}>FitForge AI</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isForgotPassword 
              ? 'Enter your email to reset your password.' 
              : isLogin ? 'Welcome back! Ready to crush your goals?' : 'Join the fitness revolution today.'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.15)',
            border: '1px solid rgba(255,107,107,0.3)',
            color: 'var(--danger)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0,230,118,0.15)',
            border: '1px solid rgba(0,230,118,0.3)',
            color: 'var(--success)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        {isForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Reset Password
            </button>
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                type="button"
                onClick={() => { setIsForgotPassword(false); setError(''); setSuccess(''); }}
                style={{ color: 'var(--text-secondary)', background: 'none', padding: 0, fontSize: '0.85rem' }}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              {isLogin && (
                <button 
                  type="button"
                  onClick={() => { setIsForgotPassword(true); setError(''); }}
                  style={{ fontSize: '0.75rem', color: 'var(--accent)', background: 'none', padding: 0 }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        )}

        {!isForgotPassword && (
          <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{ color: 'var(--primary-light)', fontWeight: 600, background: 'none', padding: 0 }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

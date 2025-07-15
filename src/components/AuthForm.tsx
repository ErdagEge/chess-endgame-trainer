import React, { useState } from 'react';
import { login, register } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await register(email, password);
        navigate('/trainer');
      } else {
        await login(email, password);
        navigate('/trainer');
      }
      // You can redirect to the dashboard here if needed
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {isRegistering ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
          {isRegistering ? 'Log In' : 'Sign Up'}
        </button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthForm;

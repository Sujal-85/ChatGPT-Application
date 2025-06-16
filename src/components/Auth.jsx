import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '../components/css files/Auth.css';

function Auth({ setUser }) {
  const [authLoading, setAuthLoading] = useState(false);
  const [loaded, setLoaded] = useState(false); // State for auth content transition

  // Trigger loaded state after component mounts
  useEffect(() => {
    if (!authLoading) {
      setTimeout(() => setLoaded(true), 100); // Slight delay for transition
    }
  }, [authLoading]);

  // Google authentication handlers
  const googleResponse = (response) => {
    setAuthLoading(true);
    try {
      const userData = jwtDecode(response.credential);
      const user = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        provider: 'google',
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error decoding Google credential:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const googleError = (error) => {
    console.error('Google authentication error:', error);
    alert('Google authentication failed. Please try again.');
    setAuthLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="inner">
        {authLoading ? (
          <div className="loader-container exiting">
            <div
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
              aria-label="Loading"
            ></div>
          </div>
        ) : (
          <div className={`auth-wrapper ${loaded ? 'loaded' : ''}`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="ChatGPT Logo"
              className="auth-logo"
            />
            <div className="auth-card">
              <h1 className="auth-title">Welcome to ChatGPT</h1>
              <p className="auth-subtitle">Sign in with Google to get started</p>

              <div className="social-buttons">
                <GoogleOAuthProvider
                  clientId={
                    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
                    '1007779600580-7gfll1ici5ms1s0sugft8edphmocm4l9.apps.googleusercontent.com'
                  }
                >
                  <GoogleLogin
                    onSuccess={googleResponse}
                    onError={googleError}
                    render={({ onClick }) => (
                      <button
                        className="social-button google"
                        onClick={() => {
                          setAuthLoading(true);
                          onClick();
                        }}
                      >
                        <svg className="social-icon" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Sign in with Google
                      </button>
                    )}
                  />
                </GoogleOAuthProvider>
              </div>

              <p className="auth-footer">
                By continuing, you agree to our{' '}
                <a href="https://openai.com/policies/row-terms-of-use/">Terms of Service</a> and{' '}
                <a href="https://openai.com/policies/privacy-policy/">Privacy Policy</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
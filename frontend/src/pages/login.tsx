import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';
import RotatingText from '../components/RotatingText';
import motivationalQuotes from '../utils/motivationalQuotes';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      router.push('/tasks'); // Redirect to tasks page after login
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <AnimatedGradientBackground>
      {/* Theme Toggle positioned in top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-md w-full bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-white drop-shadow-lg">
              Sign in to your account
            </h2>

            <div className="mt-4">
              <RotatingText
                texts={motivationalQuotes}
                interval={7000}
                className="text-white text-opacity-80 text-base min-h-[2rem] text-center"
              />
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-100 p-4 bg-opacity-90 backdrop-filter backdrop-blur-sm dark:bg-red-900 dark:bg-opacity-30 dark:text-red-200">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-transparent placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:z-10 sm:text-sm bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-transparent placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:z-10 sm:text-sm bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-opacity-50 shadow-md"
              >
                Sign in
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-white drop-shadow-sm">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="font-medium text-white hover:text-indigo-100 underline"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
};

export default LoginPage;
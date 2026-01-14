import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';
import RotatingText from '../components/RotatingText';
import motivationalQuotes from '../utils/motivationalQuotes';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(username, email, password);
      router.push('/tasks'); // Redirect to tasks page after registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
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
              Create your account
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
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-transparent placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:z-10 sm:text-sm bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-transparent placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:z-10 sm:text-sm bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-transparent placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:z-10 sm:text-sm bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-opacity-50 shadow-md"
              >
                Register
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-white drop-shadow-sm">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-white hover:text-indigo-100 underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
};

export default RegisterPage;
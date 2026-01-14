import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';
import RotatingText from '../components/RotatingText';
import motivationalQuotes from '../utils/motivationalQuotes';

const HomePage: React.FC = () => {
  return (
    <AnimatedGradientBackground>
      {/* Theme Toggle positioned in top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        <div className="max-w-2xl w-full bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Your Personal Task Manager
          </h1>

          <div className="mb-6">
            <RotatingText
              texts={motivationalQuotes}
              interval={6000}
              className="text-white text-opacity-90 text-lg min-h-[3rem]"
            />
          </div>

          <div className="mb-8">
            <p className="text-white text-lg mb-4 max-w-lg mx-auto">
              Organize your life, boost productivity, and achieve your goals with our intuitive task management system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white bg-opacity-30 dark:bg-gray-700 dark:bg-opacity-40 p-4 rounded-lg">
                <div className="text-cyan-400 text-2xl mb-2">✓</div>
                <h3 className="text-white font-semibold">Easy Organization</h3>
              </div>
              <div className="bg-white bg-opacity-30 dark:bg-gray-700 dark:bg-opacity-40 p-4 rounded-lg">
                <div className="text-cyan-400 text-2xl mb-2">✓</div>
                <h3 className="text-white font-semibold">Secure Storage</h3>
              </div>
              <div className="bg-white bg-opacity-30 dark:bg-gray-700 dark:bg-opacity-40 p-4 rounded-lg">
                <div className="text-cyan-400 text-2xl mb-2">✓</div>
                <h3 className="text-white font-semibold">Cross Device</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                Create Account
              </button>
            </Link>
          </div>

          <div className="mt-10 text-white opacity-80">
            <p className="mb-2">Already have an account?</p>
            <Link href="/tasks" className="inline-block underline hover:text-indigo-200 transition-colors">
              Go to your tasks
            </Link>
          </div>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
};

export default HomePage;
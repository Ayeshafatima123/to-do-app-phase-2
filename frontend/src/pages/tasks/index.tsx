import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import TaskService from '../../services/task';
import { Task } from '../../types/task';
import TaskForm from '../../components/TaskForm';
import TaskToggle from '../../components/TaskToggle';
import TaskEditor from '../../components/TaskEditor';
import DeleteTaskModal from '../../components/DeleteTaskModal';
import ProtectedRoute from '../../components/ProtectedRoute';
import ThemeToggle from '../../components/ThemeToggle';
import AnimatedGradientBackground from '../../components/AnimatedGradientBackground';
import RotatingText from '../../components/RotatingText';
import motivationalQuotes from '../../utils/motivationalQuotes';

const TaskListPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [deletingTask, setDeletingTask] = useState<{ id: number; title: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userTasks = await TaskService.getUserTasks(user.id);
      setTasks(userTasks);
      setError('');
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    fetchTasks(); // Refresh the task list
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTaskId(null);
  };

  const handleTaskDeleted = (deletedId: number) => {
    setTasks(tasks.filter(task => task.id !== deletedId));
  };

  const handleTaskToggle = (taskId: number, completed: boolean) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 gradient-bg relative">
        {/* Theme Toggle positioned in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-white mb-2">Loading Your Tasks</h1>
          <p className="text-white text-opacity-90">Authenticating your session...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AnimatedGradientBackground>
        {/* Theme Toggle positioned in top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">My Tasks</h1>

            <div className="mb-6 text-center">
              <RotatingText
                texts={motivationalQuotes}
                interval={8000}
                className="text-white text-opacity-90 text-lg min-h-[2.5rem]"
              />
            </div>

            {error && (
              <div className="bg-red-100 bg-opacity-80 backdrop-filter backdrop-blur-sm border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-200 dark:border-red-700">
                {error}
              </div>
            )}

            <div className="bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
              <TaskForm userId={user.id} onTaskCreated={handleTaskCreated} />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
                <p className="text-white text-xl drop-shadow font-medium">Loading your tasks...</p>
                <p className="text-white text-opacity-80 mt-2">Just a moment while we fetch your data</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white mx-auto mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-white text-lg drop-shadow">No tasks yet. Add your first task above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl p-4 shadow-md ${
                      task.completed ? 'bg-green-50 dark:bg-green-900 dark:bg-opacity-30' : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    {editingTaskId === task.id ? (
                      <TaskEditor
                        userId={user.id}
                        taskId={task.id}
                        currentTitle={task.title}
                        currentDescription={task.description || ''}
                        currentCompleted={task.completed}
                        onSave={handleTaskUpdated}
                        onCancel={() => setEditingTaskId(null)}
                      />
                    ) : (
                      <div>
                        <div className="flex items-start">
                          <TaskToggle
                            userId={user.id}
                            taskId={task.id}
                            completed={task.completed}
                            onToggle={(completed) => handleTaskToggle(task.id, completed)}
                          />
                          <div className="ml-3 flex-1">
                            <h3 className={`text-lg font-medium ${
                              task.completed
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className={`mt-1 ${
                                task.completed
                                  ? 'text-gray-400 dark:text-gray-500'
                                  : 'text-gray-600 dark:text-gray-300'
                              }`}>
                                {task.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              Created: {new Date(task.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-2">
                            <button
                              onClick={() => setEditingTaskId(task.id)}
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeletingTask({ id: task.id, title: task.title })}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {deletingTask && (
              <DeleteTaskModal
                userId={user.id}
                taskId={deletingTask.id}
                taskTitle={deletingTask.title}
                isOpen={!!deletingTask}
                onClose={() => setDeletingTask(null)}
                onDelete={handleTaskDeleted}
              />
            )}
          </div>
        </div>
      </AnimatedGradientBackground>
    </ProtectedRoute>
  );
};

export default TaskListPage;
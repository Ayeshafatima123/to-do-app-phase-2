import React from 'react';
import TaskService from '../services/task';

interface TaskToggleProps {
  userId: string;
  taskId: number;
  completed: boolean;
  onToggle: (completed: boolean) => void;
}

const TaskToggle: React.FC<TaskToggleProps> = ({ userId, taskId, completed, onToggle }) => {
  const handleToggle = async () => {
    try {
      await TaskService.toggleTaskCompletion(userId, taskId, !completed);
      onToggle(!completed);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
      }`}
      aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
    >
      {completed && (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )}
    </button>
  );
};

export default TaskToggle;
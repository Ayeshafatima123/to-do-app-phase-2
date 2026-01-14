import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import TaskService from '../services/task';

interface TaskFormProps {
  onTaskCreated?: () => void;
  userId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await TaskService.createTask(userId, {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        user_id: userId
      });

      setTitle('');
      setDescription('');
      setError('');

      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (err) {
      setError('Failed to create task');
      console.error('Create task error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={255}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          maxLength={1000}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
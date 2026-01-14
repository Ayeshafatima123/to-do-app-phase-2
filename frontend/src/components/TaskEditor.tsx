import React, { useState } from 'react';
import TaskService from '../services/task';

interface TaskEditorProps {
  userId: string;
  taskId: number;
  currentTitle: string;
  currentDescription: string;
  currentCompleted: boolean;
  onSave: (updatedTask: any) => void;
  onCancel: () => void;
}

const TaskEditor: React.FC<TaskEditorProps> = ({
  userId,
  taskId,
  currentTitle,
  currentDescription,
  currentCompleted,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription || '');
  const [completed, setCompleted] = useState(currentCompleted);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const updatedTask = await TaskService.updateTask(userId, taskId, {
        title: title.trim(),
        description: description.trim(),
        completed
      });

      onSave(updatedTask);
    } catch (err) {
      setError('Failed to update task');
      console.error('Update task error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-md">
      <div className="mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={255}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        maxLength={1000}
      />
      <div className="flex items-center mb-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          <span>Completed</span>
        </label>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskEditor;
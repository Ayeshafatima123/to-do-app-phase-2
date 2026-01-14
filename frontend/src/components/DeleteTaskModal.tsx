import React from 'react';
import TaskService from '../services/task';

interface DeleteTaskModalProps {
  userId: string;
  taskId: number;
  taskTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (deletedId: number) => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  userId,
  taskId,
  taskTitle,
  isOpen,
  onClose,
  onDelete
}) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await TaskService.deleteTask(userId, taskId);
      onDelete(taskId);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Task</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the task "{taskTitle}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
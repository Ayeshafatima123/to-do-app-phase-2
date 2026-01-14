import { Task, NewTask } from '../types/task';

class TaskService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  }

  /**
   * Get all tasks for a user
   */
  async getUserTasks(userId: string): Promise<Task[]> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch tasks');
      }

      const data = await response.json();
      return data.map((item: any) => item.task); // Adjust based on API response format
    } catch (error) {
      console.error('Get tasks error:', error);
      throw error;
    }
  }

  /**
   * Create a new task for a user
   */
  async createTask(userId: string, task: NewTask): Promise<Task> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create task');
      }

      const data = await response.json();
      return data.task; // Adjust based on API response format
    } catch (error) {
      console.error('Create task error:', error);
      throw error;
    }
  }

  /**
   * Get a specific task by ID
   */
  async getTaskById(userId: string, taskId: number): Promise<Task> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch task');
      }

      const data = await response.json();
      return data.task; // Adjust based on API response format
    } catch (error) {
      console.error('Get task error:', error);
      throw error;
    }
  }

  /**
   * Update a task
   */
  async updateTask(userId: string, taskId: number, task: Partial<Task>): Promise<Task> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update task');
      }

      const data = await response.json();
      return data.task; // Adjust based on API response format
    } catch (error) {
      console.error('Update task error:', error);
      throw error;
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(userId: string, taskId: number): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete task');
      }

      return true;
    } catch (error) {
      console.error('Delete task error:', error);
      throw error;
    }
  }

  /**
   * Toggle task completion status
   */
  async toggleTaskCompletion(userId: string, taskId: number, completed: boolean): Promise<Task> {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${this.baseUrl}/api/${userId}/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update task completion');
      }

      const data = await response.json();
      return data.task; // Adjust based on API response format
    } catch (error) {
      console.error('Toggle task completion error:', error);
      throw error;
    }
  }
}

export default new TaskService();
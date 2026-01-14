// Define the Task interface for tasks that have been saved to the database
export interface Task {
  id: number;           // Assigned by the backend after creation
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;   // Timestamp assigned by the backend
}

// Define a type for creating new tasks (before they're saved to the database)
export type NewTask = Omit<Task, 'id' | 'created_at'>;

// Define a type for updating tasks (some fields might be optional during updates)
export type UpdatedTask = Partial<Omit<Task, 'id' | 'user_id'>>;
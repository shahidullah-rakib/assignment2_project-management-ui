export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  priority?: string;
  dueDate?: Date | string;
  assignedUser?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed';
  progress: number;
  dueDate: string;
  tasks: Task[];
}

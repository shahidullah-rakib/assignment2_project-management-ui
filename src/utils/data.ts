// src/utils/data.ts
import { Project } from '../types/index';

export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website for better UX',
    status: 'active',
    progress: 60,
    dueDate: '2024-12-01',
    tasks: [
      {
        id: '1',
        name: 'Design Mockups',
        description: 'Create mockups for main pages',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-11-10',
        assignedUser: 'Alice',
      },
      {
        id: '2',
        name: 'Implement Layout',
        description: 'Develop responsive layouts based on mockups',
        status: 'not-started',
        priority: 'medium',
        dueDate: '2024-11-15',
        assignedUser: 'Bob',
      },
    ],
  },
  {
    id: '2',
    name: 'Multiple Auth',
    description: 'Assign the multiple user for multiple autonation',
    status: 'active',
    progress: 60,
    dueDate: '2024-12-01',
    tasks: [
      {
        id: '1',
        name: 'Create Admin',
        description: 'Create a user called admin',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-11-10',
        assignedUser: 'Mike',
      },
      {
        id: '2',
        name: 'Design the admin dashboard',
        description: 'Develop responsive dashboard for the admin',
        status: 'not-started',
        priority: 'high',
        dueDate: '2024-11-15',
        assignedUser: 'Bob',
      },
    ],
  },
  // Add more projects as needed
];

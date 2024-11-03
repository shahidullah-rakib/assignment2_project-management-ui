// src/App.tsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/TaskList/TaskList';
import { projects as initialProjects } from './utils/data';
import { Project } from './types/index';
import { Task } from './types/index';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Project Management
      </h1>
      {selectedProject ? (
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      ) : (
        <Dashboard
          projects={initialProjects}
          onSelectProject={handleSelectProject}
        />
      )}
    </div>
  );
};

export default App;

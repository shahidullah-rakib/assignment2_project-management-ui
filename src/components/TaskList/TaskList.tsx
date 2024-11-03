// src/components/TaskList.tsx
import React, { useState } from 'react';
import { Task } from '../../types/index';
import TaskDetail from '../TaskDetail/TaskDetail';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'in-progress',
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      description: newTask.description,
      status: 'in-progress', // Default status
      priority: 'normal', // Default priority
      dueDate: new Date(), // Or any default value you prefer
      assignedUser: 'Unassigned', // Default user if needed
    };

    onAddTask(task);
    setNewTask({ name: '', description: '', status: 'in-progress' });
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h2>

      {/* Task Addition */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task name"
          className="p-2 border rounded w-full mb-2"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          className="p-2 border rounded w-full mb-2"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded-lg shadow-md flex justify-between"
          >
            <div
              onClick={() => handleTaskClick(task)}
              className="cursor-pointer"
            >
              <h3 className="font-semibold text-gray-800">{task.name}</h3>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Task Details for Editing */}
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onSave={(updatedTask) => onUpdateTask(updatedTask)}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;

import React, { useState, useEffect } from 'react';
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
  const [errors, setErrors] = useState<string[]>([]); // State for validation errors

  // Function to generate a random ID
  const generateRandomId = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000);

  // Initial newTask state with a random id
  const [newTask, setNewTask] = useState({
    id: generateRandomId(),
    name: '',
    description: '',
    status: 'in-progress',
    priority: 'normal',
    dueDate: '',
    assignedUser: '',
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];
    if (!newTask.name) validationErrors.push('Task name is required.');
    if (!newTask.description)
      validationErrors.push('Task description is required.');
    if (!newTask.dueDate) validationErrors.push('Due date is required.');
    if (!newTask.assignedUser)
      validationErrors.push('Assigned user is required.');

    setErrors(validationErrors);
    return validationErrors.length === 0; // Return true if no errors
  };

  const handleAddTask = () => {
    if (!validateForm()) return; // Validate form before proceeding

    const task: Task = { ...newTask };

    onAddTask(task);
    setNewTask({
      id: generateRandomId(), // Generate a new random id for the next task
      name: '',
      description: '',
      status: 'in-progress',
      priority: 'normal',
      dueDate: '',
      assignedUser: '',
    });
    setErrors([]); // Clear errors after adding task
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  return (
    <div className="pb-44 pe-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h2>

      {/* Task Addition */}
      <div className="mb-4">
        <input
          type="text"
          value={newTask.id}
          readOnly
          className="p-2 border rounded w-full mb-2 hidden"
        />
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
        <select
          name="status"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
        <select
          name="priority"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          placeholder="Due date"
          className="p-2 border rounded w-full mb-2"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assigned user"
          className="p-2 border rounded w-full mb-2"
          value={newTask.assignedUser}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedUser: e.target.value })
          }
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Display validation errors */}
      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4 ">
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

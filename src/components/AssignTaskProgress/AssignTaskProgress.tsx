import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task } from '../../types/index';

interface AssignTaskProgressProps {
  tasks: Task[];
  onUpdateTaskStatus: (updatedTask: Task) => void;
}

const AssignTaskProgress: React.FC<AssignTaskProgressProps> = ({
  tasks,
  onUpdateTaskStatus,
}) => {
  // Group tasks by their status
  const taskColumns = {
    'not-started': tasks.filter((task) => task.status === 'not-started'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    complete: tasks.filter((task) => task.status === 'complete'),
  };

  // Task Card component with drag functionality
  const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'TASK',
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`p-3 mb-2 bg-white rounded-lg shadow-md ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <h4 className="font-semibold">{task.name}</h4>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-sm text-blue-500">
          Due:{' '}
          {task.dueDate instanceof Date
            ? task.dueDate.toLocaleDateString()
            : task.dueDate}
        </p>
      </div>
    );
  };

  // Column component with drop functionality
  const TaskColumn: React.FC<{ status: string; children: React.ReactNode }> = ({
    status,
    children,
  }) => {
    const [, drop] = useDrop({
      accept: 'TASK',
      drop: (draggedTask: Task) =>
        onUpdateTaskStatus({ ...draggedTask, status }),
    });

    return (
      <div
        ref={drop}
        className="flex-1 p-4 bg-gray-100 rounded-lg shadow-lg overflow-y-auto"
      >
        <h3 className="font-bold text-lg text-gray-700 capitalize mb-4">
          {status.replace('-', ' ')}
        </h3>
        {children}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4">
        {Object.entries(taskColumns).map(([status, tasks]) => (
          <TaskColumn key={status} status={status}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TaskColumn>
        ))}
      </div>
    </DndProvider>
  );
};

export default AssignTaskProgress;

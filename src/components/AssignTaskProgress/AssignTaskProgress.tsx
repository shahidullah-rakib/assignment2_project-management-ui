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

  // Task Card component with drag functionality and color
  const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'TASK',
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    // Set color based on task status
    const cardColor =
      task.status === 'not-started'
        ? 'bg-red-100'
        : task.status === 'in-progress'
        ? 'bg-yellow-100'
        : 'bg-green-100';

    return (
      <div
        ref={drag}
        className={`p-3 mb-2 rounded-lg shadow-md ${cardColor} ${
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
        {/* Display priority */}
        <p className="text-sm text-gray-700">
          Priority: <span className="font-bold">{task.priority}</span>
        </p>
        {/* Display assigned user */}
        <p className="text-sm text-gray-700">
          Assigned to: <span className="font-bold">{task.assignedUser}</span>
        </p>
      </div>
    );
  };

  // Column component with drop functionality and background color
  const TaskColumn: React.FC<{ status: string; children: React.ReactNode }> = ({
    status,
    children,
  }) => {
    const [, drop] = useDrop({
      accept: 'TASK',
      drop: (draggedTask: Task) =>
        onUpdateTaskStatus({ ...draggedTask, status }),
    });

    // Set background color based on column status
    const columnColor =
      status === 'not-started'
        ? 'bg-red-200'
        : status === 'in-progress'
        ? 'bg-yellow-200'
        : 'bg-green-200';

    return (
      <div
        ref={drop}
        className={`flex-1 p-4 ${columnColor} rounded-lg shadow-lg overflow-y-auto w-full md:w-1/3 lg:w-48`}
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
      <div className="flex flex-col md:flex-row gap-4 w-full">
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

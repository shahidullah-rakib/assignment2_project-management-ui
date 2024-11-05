import React, { useEffect, useState } from 'react';
import { Project } from '../../types/index';
import Modal from '../Modal/Modal';
import TaskList from '../TaskList/TaskList';
import { Task } from '../../types/index';
import TaskViewModal from '../TaskViewModal/TaskViewModal';
import AssignTaskProgress from '../AssignTaskProgress/AssignTaskProgress';

interface ProjectCardProps {
  project: Project;
  onClickAssign: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClickAssign,
}) => {
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize tasks from project when component mounts
  useEffect(() => {
    setTasks(project.tasks);
  }, [project.tasks]);

  const handleAssignTaskOpen = () => setIsAssignTaskOpen(true);
  const handleAssignTaskClose = () => setIsAssignTaskOpen(false);

  const handleViewTaskOpen = () => setIsViewTaskOpen(true);
  const handleViewTaskClose = () => setIsViewTaskOpen(false);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:bg-gray-100">
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p>Status: {project.status}</p>
      <p>Progress: {project.progress}%</p>
      <p>Due: {project.dueDate}</p>
      <div className="flex gap-4 justify-start mt-5">
        <button
          onClick={handleAssignTaskOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
        >
          Assign New Task
        </button>
        <button
          onClick={handleViewTaskOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
        >
          View Assigned Tasks
        </button>
      </div>

      {/* Assign New Task Modal */}
      <Modal isOpen={isAssignTaskOpen} onClose={handleAssignTaskClose}>
        <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
        <div className="h-full overflow-y-auto">
          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isViewTaskOpen}
        onClose={handleViewTaskClose}
        customClass="h-full mx-10"
      >
        <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
        <div className="overflow-auto">
          <AssignTaskProgress
            tasks={tasks}
            onUpdateTaskStatus={handleUpdateTask}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;

// src/components/ProjectCard.tsx
import React from 'react';
import { Project } from '../../types/index';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 shadow hover:bg-gray-100 cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p>Status: {project.status}</p>
      <p>Progress: {project.progress}%</p>
      <p>Due: {project.dueDate}</p>
      <div className="flex gap-4 justify-start mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2  rounded-lg">
          Assign New Task
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg">
          View Assign Task
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

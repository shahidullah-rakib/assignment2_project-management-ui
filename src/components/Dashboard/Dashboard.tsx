import React from 'react';
import { Project } from '../../types/index';
import ProjectCard from '../ProjectCard/ProjectCard';

interface DashboardProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClickAssign={() => onSelectProject(project)}
        />
      ))}
    </div>
  );
};

export default Dashboard;

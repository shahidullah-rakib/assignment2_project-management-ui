// src/App.tsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { Project } from './types/index';
import { projects as initialProjects } from './utils/data';
import AddProject from './components/AddProject/AddProject';
import SearchAndFilter from './components/SearchAndFilter/SearchAndFilter';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      setFilteredProjects(updatedProjects);
      return updatedProjects;
    });
  };

  const handleSearch = (searchText: string) => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleFilter = (progress: string, dueDate: string) => {
    let filtered = [...projects];

    if (progress) {
      filtered = filtered.filter(
        (project) => project.progress.toString() === progress
      );
    }

    if (dueDate) {
      filtered = filtered.filter((project) => project.dueDate === dueDate);
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-r from-gray-50 to-gray-100">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8 text-gray-700">
        Project Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <AddProject onAddProject={handleAddProject} />
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      <Dashboard
        projects={filteredProjects}
        onSelectProject={handleSelectProject}
      />
    </div>
  );
};

export default App;

// src/App.tsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { Project } from './types/index';
import { projects as initialProjects } from './utils/data';
import AddProject from './components/AddProject/AddProject';
import SearchAndFilter from './components/SearchAndFilter/SearchAndFilter';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects); // Initialize state with initialProjects
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects); // State for filtered projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      setFilteredProjects(updatedProjects); // Update filtered projects when adding new project
      return updatedProjects;
    }); // Add new project to projects array
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
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Project Management
      </h1>
      <div className="flex justify-between mb-4">
        <AddProject onAddProject={handleAddProject} />
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      <Dashboard
        projects={filteredProjects} // Use filtered projects
        onSelectProject={handleSelectProject}
      />
    </div>
  );
};

export default App;

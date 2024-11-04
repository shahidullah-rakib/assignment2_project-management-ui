// src/components/AddProject/AddProject.tsx
import React, { useState } from 'react';
import { Project } from '../../types/index';

interface AddProjectProps {
  onAddProject: (project: Project) => void;
}

const AddProject: React.FC<AddProjectProps> = ({ onAddProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    status: 'Not Started',
    progress: 0,
    dueDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectDetails.name,
      description: projectDetails.description,
      status: 'active', // Set to a valid status value
      progress: 0,
      dueDate: projectDetails.dueDate,
      tasks: [], // Initialize with an empty tasks array
    };

    onAddProject(newProject);
    setProjectDetails({
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      dueDate: '',
    });
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">New Project Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={projectDetails.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="description"
              placeholder="Project Description"
              value={projectDetails.description}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <select
              name="status"
              value={projectDetails.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="number"
              name="progress"
              placeholder="Progress (%)"
              value={projectDetails.progress}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
              min="0"
              max="100"
            />
            <input
              type="date"
              name="dueDate"
              value={projectDetails.dueDate}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <button
              onClick={handleAddNewProject}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2"
            >
              Add Project
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;

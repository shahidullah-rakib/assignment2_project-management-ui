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
      status: 'active',
      progress: 0,
      dueDate: projectDetails.dueDate,
      tasks: [],
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-0">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              New Project Details
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={projectDetails.name}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="description"
              placeholder="Project Description"
              value={projectDetails.description}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="status"
              value={projectDetails.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
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
              className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
            />
            <input
              type="date"
              name="dueDate"
              value={projectDetails.dueDate}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddNewProject}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition-colors mr-2"
              >
                Add Project
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;

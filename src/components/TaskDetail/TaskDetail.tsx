// src/components/TaskDetail.tsx
import React, { useState } from 'react';
import { Task } from '../../types/index';

interface TaskDetailProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <input
        className="block p-2 border rounded w-full mb-2"
        type="text"
        value={editedTask.name}
        onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
      />
      <textarea
        className="block p-2 border rounded w-full mb-2"
        value={editedTask.description}
        onChange={(e) =>
          setEditedTask({ ...editedTask, description: e.target.value })
        }
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TaskDetail;

import React, { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import Modal from '../Modal/Modal';
import { Task } from '../../types/index';

interface TaskColumns {
  [key: string]: Task[];
}

interface TaskViewModalProps {
  tasks: Task[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateTaskStatus: (taskId: string, newStatus: string) => void;
}

const TaskViewModal: React.FC<TaskViewModalProps> = ({
  tasks,
  isOpen,
  onClose,
  onUpdateTaskStatus,
}) => {
  const [taskColumns, setTaskColumns] = useState<TaskColumns | null>(null);

  // Initialize columns based on task status
  useEffect(() => {
    if (tasks.length > 0) {
      const columns: TaskColumns = {
        'not-started': tasks.filter((task) => task.status === 'not-started'),
        'in-progress': tasks.filter((task) => task.status === 'in-progress'),
        complete: tasks.filter((task) => task.status === 'complete'),
      };
      setTaskColumns(columns);
    }
  }, [tasks]);

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    if (!taskColumns) return;
    const { source, destination } = result;
    if (!destination) return; // If dropped outside any droppable

    // Skip if the item is dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = [...taskColumns[source.droppableId]];
    const destColumn = [...taskColumns[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // Update the status of the task based on the destination column
    movedTask.status = destination.droppableId as Task['status'];
    destColumn.splice(destination.index, 0, movedTask);

    // Update state and call the parent callback to update the task status
    setTaskColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    }));

    onUpdateTaskStatus(movedTask.id, movedTask.status);
  };

  if (!isOpen || !taskColumns) return null; // Avoid rendering if modal is closed or taskColumns is null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {['not-started', 'in-progress', 'complete'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold capitalize mb-2">
                    {status.replace('-', ' ')}
                  </h3>
                  {taskColumns[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border p-3 mb-2 bg-white rounded shadow cursor-pointer"
                        >
                          <h4 className="font-semibold">{task.name}</h4>
                          <p className="text-gray-500">Status: {task.status}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </Modal>
  );
};

export default TaskViewModal;

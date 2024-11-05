import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Modal from '../Modal/Modal';
import DroppableColumn from '../DroppableColumn/DroppableColumn';
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

  const onDragEnd = (result: DropResult) => {
    if (!taskColumns) return;
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = [...taskColumns[source.droppableId]];
    const destColumn = [...taskColumns[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    movedTask.status = destination.droppableId as Task['status'];
    destColumn.splice(destination.index, 0, movedTask);

    setTaskColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    }));

    onUpdateTaskStatus(movedTask.id, movedTask.status);
  };

  if (!isOpen || !taskColumns) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {['not-started', 'in-progress', 'complete'].map((status) => (
            <DroppableColumn
              key={status}
              droppableId={status}
              tasks={taskColumns[status]}
              title={status.replace('-', ' ')}
            />
          ))}
        </div>
      </DragDropContext>
    </Modal>
  );
};

export default TaskViewModal;

import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types/index';

interface DroppableColumnProps {
  droppableId: string;
  tasks?: Task[];
  title?: string;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  droppableId,
  tasks = [],
  title = 'Tasks',
}) => (
  <Droppable droppableId={droppableId}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold capitalize mb-2">{title}</h3>
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
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
);

export default DroppableColumn;

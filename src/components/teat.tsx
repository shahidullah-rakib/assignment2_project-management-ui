import React from 'react';

const TaskKanbanBoard = () => {
  // const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === taskId ? { ...task, status: newStatus } : task
  //     )
  //   );
  // };
  return (
    <div>
      {/* View Assigned Tasks Modal */}
      {/* <Modal isOpen={isViewTaskOpen} onClose={handleViewTaskClose}>
        <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
        <div>
          {tasks.map((task) => (
            <div key={task.id} className="border-b py-2">
              <h3 className="font-semibold">{task.name}</h3>
              <p className="text-gray-500">Status: {task.status}</p>
            </div>
          ))}
        </div>
      </Modal> */}
      {/* <Modal isOpen={isViewTaskOpen} onClose={handleViewTaskClose}>
        <TaskViewModal
          tasks={tasks}
          isOpen={isViewTaskOpen}
          onClose={handleViewTaskClose}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </Modal> */}
    </div>
  );
};

export default TaskKanbanBoard;

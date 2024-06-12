import { DraggbleTasks } from './draggble-tasks';
import { EditTaskForm } from './edit-task-form';

import { ITask, Task } from '@/src/entities/task';

export const TasksList = ({ tasks, isDraggble }: { tasks: ITask[]; isDraggble?: boolean }) => {
  return isDraggble ? (
    <DraggbleTasks tasks={tasks} />
  ) : (
    <>
      {tasks.map((task) => (
        <Task {...task} key={task.id} modalContent={<EditTaskForm {...task} />} />
      ))}
    </>
  );
};

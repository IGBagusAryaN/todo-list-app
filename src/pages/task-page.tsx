import TaskForm from "../components/task-add";
import TaskList from "../components/task-list";

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-3 md:px-0">To-Do</h1>
      <div className="block lg:grid grid-cols-[1fr_2fr]">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default TaskPage;

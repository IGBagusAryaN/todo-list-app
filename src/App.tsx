import TaskForm from "./pages/task-add";
import TaskList from "./pages/task-list";

function App() {
  return (
    <>
      <div className="min-h-screen p-2 md:p-6 max-w-7xl mx-auto pt-10 lg:pt-20 ">
        <h1 className="text-2xl font-bold mb-4 px-3 md:px-0">To-Do</h1>
        <div className="block lg:grid grid-cols-[1fr_2fr]">
        <TaskForm />
        <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/config-store";
import { fetchTasks, updateStatus, updateTask, deleteTask, setPage } from "../store/tasks-slice";
import LoadingAssets from "../lottie/loading";
import toast from "react-hot-toast";
import SearchBar from "./search-bar";
import TaskRow from "./task-row";
import Pagination from "./pagination";
import { confirmDelete } from "./confirm-delete";

import type { TaskStatus } from "../types/task-status-type";
import { useTaskEditing } from "../hooks/use-task-editing";
import { useFilteredTasks } from "../hooks/use-filtered-task";
import TaskTableHeader from "./task-table-header";
import EmptyState from "./empty-state";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, currentPage } = useSelector((state: RootState) => state.tasks);

  const [openDropdown, setOpenDropdown] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");

  const {
    editingTaskId,
    editedTask,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleChange,
    isEdited,
  } = useTaskEditing((task) => {
    dispatch(updateTask(task));
    toast.success("Task successfully updated");
  });

  const { paginatedTasks, totalPages } = useFilteredTasks(list, searchTerm, currentPage, 4);

  const handleStatusChange = (id: string, status: TaskStatus) => {
    dispatch(updateStatus({ id, status }));
  };

  const handleToggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? "" : id));
  };

  const handleDelete = (id: string) => {
    confirmDelete(() => dispatch(deleteTask(id)), "Are you sure you want to delete this task?");
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <LoadingAssets />
      </div>
    );

  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 rounded">
      <h2 className="text-lg font-medium mb-2">List Task</h2>
      <SearchBar
        pendingSearchTerm={pendingSearchTerm}
        setPendingSearchTerm={setPendingSearchTerm}
        setSearchTerm={setSearchTerm}
        dispatch={dispatch}
      />

      <div className="overflow-x-scroll md:overflow-x-hidden">
        <table className="min-w-full md:w-full border border-gray-300 text-sm table-fixed border-collapse">
          <TaskTableHeader />
          <tbody className="text-gray-600">
            {paginatedTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                editingTaskId={editingTaskId}
                editedTask={editedTask}
                openDropdown={openDropdown}
                handleEditClick={handleEditClick}
                handleCancelClick={handleCancelClick}
                handleSaveClick={handleSaveClick}
                handleStatusChange={handleStatusChange}
                handleChange={handleChange}
                handleToggleDropdown={handleToggleDropdown}
                handleDelete={handleDelete}
                isEdited={isEdited}
              />
            ))}
            {paginatedTasks.length === 0 && <EmptyState message="Tasks not found" />}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setPage(page))}
      />
    </div>
  );
};

export default TaskList;

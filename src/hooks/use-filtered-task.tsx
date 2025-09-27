import { useMemo } from "react";
import type { Task } from "../store/tasks-slice";

export const useFilteredTasks = (
  list: Task[],
  searchTerm: string,
  currentPage: number,
  tasksPerPage: number
) => { 
  const reversedList = useMemo(() => [...list].reverse(), [list]);

  const filteredList = useMemo(() => {
    const keyword = searchTerm.toLowerCase();
    return reversedList.filter((task) =>
      [task.title, task.owner, task.assignee, task.status]
        .some((field) => (field || "").toLowerCase().includes(keyword))
    );
  }, [reversedList, searchTerm]);

  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = useMemo(
    () => filteredList.slice(startIndex, startIndex + tasksPerPage),
    [filteredList, startIndex, tasksPerPage]
  );

  const totalPages = Math.ceil(filteredList.length / tasksPerPage);

  return { paginatedTasks, totalPages };
};

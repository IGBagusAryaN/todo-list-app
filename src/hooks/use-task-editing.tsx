import { useState } from "react";
import type { Task } from "../store/tasks-slice";

export const useTaskEditing = (onUpdate: (task: Task) => void) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [originalTask, setOriginalTask] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
    setOriginalTask(task); 
  };

  const handleCancelClick = () => {
    setEditingTaskId(null);
    setEditedTask({});
    setOriginalTask(null);
  };

  const handleSaveClick = (id: string) => {
    if (!originalTask) return;
    const updatedTask: Task = { ...originalTask, ...editedTask, id };
    onUpdate(updatedTask);
    handleCancelClick();
  };

  const isEdited = (task: Task): boolean => {
    return (
      editedTask.title !== task.title ||
      editedTask.owner !== task.owner ||
      editedTask.assignee !== task.assignee ||
      editedTask.status !== task.status
    );
  };

  const handleChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  return {
    editingTaskId,
    editedTask,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleChange,
    isEdited,
  };
};

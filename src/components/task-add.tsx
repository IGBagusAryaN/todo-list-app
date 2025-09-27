import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/config-store";
import { addTask } from "../store/tasks-slice";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  owner: z.string().min(1, "Owner is required"),
  assignee: z.string().min(1, "Assignee is required"),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      owner: "",
      assignee: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    const promise = new Promise<void>((resolve) => {
      dispatch(
        addTask({
          id: uuidv4(),
          ...data,
          status: "todo",
        })
      );
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    toast.promise(promise, {
      loading: "Adding task...",
      success: "Task added successfully!",
      error: "Failed to add task",
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 mb-4">
      <h2 className="text-lg font-medium mb-2">Add Task</h2>
      <div className="flex flex-col gap-2">
        <div>
          <input
            type="text"
            placeholder="Title..."
            {...register("title")}
            className="border border-gray-300 rounded p-2 focus:outline-blue-300 w-full" 
          />
          {errors.title && (
            <p className="text-red-500 text-sm pt-2 pl-2">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex lg:block gap-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="Owner..."
              {...register("owner")}
              className="border border-gray-300 rounded p-2 focus:outline-blue-300 w-full outline-blue-300"
            />
            {errors.owner && (
              <p className="text-red-500 text-sm pt-2 pl-2">
                {errors.owner.message}
              </p>
            )}
          </div>

          <div className="w-full lg:mt-[8px]">
            <input
              type="text"
              placeholder="Assignee..."
              {...register("assignee")}
              className="border border-gray-300 rounded p-2 focus:outline-blue-300 w-full"
            />
            {errors.assignee && (
              <p className="text-red-500 text-sm pt-2 pl-2">
                {errors.assignee.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-400 text-white rounded py-2 hover:bg-blue-500 cursor-pointer"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
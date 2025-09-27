import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Task = {
  id: string;
  title: string;
  owner: string;
  assignee: string;
  status: "todo" | "in_progress" | "done";
};

type TasksState = {
  list: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number;
};

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TasksState = {
  list: loadTasks(),
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get<Task[]>(
    "https://68d612ffc2a1754b4269669b.mockapi.io/tasks"
  );
  return res.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload);
      saveTasks(state.list);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) => {
      const task = state.list.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        saveTasks(state.list);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
        saveTasks(state.list);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      saveTasks(state.list);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => { 
        state.loading = false;
        const apiTasks = action.payload;
        const localIds = new Set(state.list.map((t) => t.id));
        const merged = [
          ...state.list,
          ...apiTasks.filter((t) => !localIds.has(t.id)),
        ];

        state.list = merged;
        saveTasks(state.list);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const { addTask, updateStatus, updateTask, deleteTask, setPage } =
  tasksSlice.actions;
export default tasksSlice.reducer;

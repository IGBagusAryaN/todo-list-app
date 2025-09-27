import { motion, AnimatePresence } from "framer-motion";
import type { TaskStatus } from "../types/task-status-type";

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function StatusDropdown({
  task,
  open, 
  onToggle,
  handleStatusChange,
}: {
  task: { id: string; status: TaskStatus };
  open: boolean;
  onToggle: (id: string) => void;
  handleStatusChange: (id: string, status: TaskStatus) => void;
}) {
  return (
    <div className="relative w-full">
      <button
        onClick={() => onToggle(task.id)}
        className="border border-gray-200 rounded p-2 w-full text-left bg-white cursor-pointer"
      >
        {statusOptions.find((s) => s.value === task.status)?.label ??
          "Select Status"}
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-[100px] lg:w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            {statusOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  handleStatusChange(task.id, option.value);
                  onToggle("");
                }}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

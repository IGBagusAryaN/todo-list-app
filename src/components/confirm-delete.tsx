import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmToastProps = {
  t: any;
  message: string;
  onConfirm: () => void;
};

function ConfirmToast({ t, message, onConfirm }: ConfirmToastProps) {
  const [clicked, setClicked] = useState(false);

  const handleCancel = () => {
    if (clicked) return;
    setClicked(true);
    toast.dismiss(t.id);
  };

  const handleConfirm = () => {
    if (clicked) return;
    setClicked(true);
    try {
      onConfirm();
      toast.dismiss(t.id);
      toast.success("Successfully deleted");
    } catch (err) {
      toast.dismiss(t.id);
      toast.error("Failed to delete");
    }
  };

  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 w-80"
        >
          <p className="text-sm text-gray-800">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              disabled={clicked}
              className={`px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-300 text-white text-sm cursor-pointer ${
                clicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={clicked}
              className={`px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm outline-none cursor-pointer ${
                clicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function confirmDelete(
  onConfirm: () => void,
  message: string = "Are you sure you want to delete this task?",
  toastId: string = "confirm-delete"
) {
  toast.custom(
    (t) => <ConfirmToast t={t} message={message} onConfirm={onConfirm} />,
    {
      id: toastId,
      position: "top-center",
      duration: Infinity,
    }
  );
}

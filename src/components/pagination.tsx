interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}  

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 gap-2 text-gray-600">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border border-gray-300 outline-none rounded disabled:opacity-50 hover:text-white hover:bg-blue-200"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const isNear =
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2);

        if (isNear) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border border-gray-300 outline-none rounded cursor-pointer hover:text-white hover:bg-blue-200 ${
                currentPage === page ? "bg-blue-400 text-white" : ""
              }`}
            >
              {page}
            </button>
          );
        }

        if (
          (page === currentPage - 3 && currentPage > 4) ||
          (page === currentPage + 3 && currentPage < totalPages - 3)
        ) {
          return (
            <span key={page} className="px-2">
              ...
            </span>
          );
        }

        return null;
      })}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border border-gray-300 outline-none rounded disabled:opacity-50 hover:text-white hover:bg-blue-200 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

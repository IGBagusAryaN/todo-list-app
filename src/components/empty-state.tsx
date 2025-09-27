import NotFoundAssets from "../lottie/not-found";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <tr>
      <td colSpan={5} className="p-4 text-gray-500 text-center">
        <div className="flex flex-col items-center justify-center">
          <NotFoundAssets />
          <p>{message}</p>
        </div>
      </td>
    </tr>
  );
};

export default EmptyState;

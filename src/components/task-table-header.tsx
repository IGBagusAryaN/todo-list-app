const TaskTableHeader = () => {
  return (
    <thead className="bg-gray-100 text-gray-900">
      <tr>
        <th className="border border-gray-300 p-2">Title</th>
        <th className="border border-gray-300 p-2">Owner</th>
        <th className="border border-gray-300 p-2">Assignee</th>
        <th className="border border-gray-300 p-2">Status</th>
        <th className="border border-gray-300 p-2">Action</th>
      </tr>
    </thead>
  );
};

export default TaskTableHeader;

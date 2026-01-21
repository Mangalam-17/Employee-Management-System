export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table className="min-w-full border rounded-lg mt-4">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Department</th>
          <th className="p-2 border">Salary</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id} className="hover:bg-gray-50">
            <td className="p-2 border">{emp.name}</td>
            <td className="p-2 border">{emp.email}</td>
            <td className="p-2 border">{emp.department}</td>
            <td className="p-2 border">{emp.salary}</td>
            <td className="p-2 border space-x-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
                onClick={() => onEdit(emp)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white text-sm rounded"
                onClick={() => onDelete(emp)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

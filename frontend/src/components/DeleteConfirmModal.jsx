import { useState } from "react";
import { deleteEmployee } from "../services/EmployeeService";

export default function DeleteConfirmModal({ employee, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteEmployee(employee._id);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-3">Delete Employee</h2>
        <p className="text-sm mb-4">
          Are you sure you want to delete
          <span className="font-semibold"> {employee.name}</span>?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

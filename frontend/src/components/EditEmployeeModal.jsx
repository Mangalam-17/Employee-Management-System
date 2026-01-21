import { useState } from "react";
import { updateEmployee } from "../services/employeeService";

export default function EditEmployeeModal({ employee, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    salary: employee.salary,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "salary" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.department || !form.salary) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateEmployee(employee._id, form);
      onSuccess();
      onClose();
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError("Email already exists");
      } else if (status === 400) {
        setError(err.response?.data?.message || "Invalid input");
      } else {
        setError("Internal Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>

        <input
          name="name"
          className="border w-full p-2 mb-2 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          className="border w-full p-2 mb-2 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="department"
          className="border w-full p-2 mb-2 rounded"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          className="border w-full p-2 mb-2 rounded"
          value={form.salary}
          onChange={handleChange}
        />

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

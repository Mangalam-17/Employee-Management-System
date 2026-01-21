import { useState, useCallback } from "react";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function EmployeesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const query = {};

  const { employees, loading, error, refetch } = useEmployees(query);

  const reloadEmployees = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div className="p-4">Loading employees...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setShowAddModal(true)}
        >
          + Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <div>No active employees found.</div>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={(emp) => setEditEmployee(emp)}
          onDelete={(emp) => setDeleteEmployee(emp)}
        />
      )}

      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSuccess={reloadEmployees}
        />
      )}

      {editEmployee && (
        <EditEmployeeModal
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
          onSuccess={reloadEmployees}
        />
      )}

      {deleteEmployee && (
        <DeleteConfirmModal
          employee={deleteEmployee}
          onClose={() => setDeleteEmployee(null)}
          onSuccess={reloadEmployees}
        />
      )}
    </div>
  );
}

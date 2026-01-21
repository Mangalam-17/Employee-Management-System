import { useEffect, useState, useMemo, useCallback } from "react";
import { fetchEmployees } from "../services/employeeService";

export const useEmployees = (query = {}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serializedQuery = useMemo(() => JSON.stringify(query), [query]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees(query);
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [serializedQuery]);

  useEffect(() => {
    load();
  }, [load]);

  return { employees, loading, error, refetch: load };
};

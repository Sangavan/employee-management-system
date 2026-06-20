import { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api/employeeApi";
import EmployeeModal from "./components/EmployeeModal";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to load employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee._id, data);
      } else {
        await createEmployee(data);
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to save employee:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Employee Management</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>
          + Add Employee
        </button>
      </div>

      {loading ? (
        <p className="message">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="message">
          No employees yet. Click "+ Add Employee" to create one.
        </p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.empNo}</td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary.toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEditClick(emp)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}

export default App;
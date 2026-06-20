import { useState, useEffect } from "react";

function EmployeeModal({ isOpen, onClose, onSave, editingEmployee }) {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setDesignation(editingEmployee.designation);
      setSalary(editingEmployee.salary);
    } else {
      setName("");
      setDesignation("");
      setSalary("");
    }
    setError("");
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim() || !designation.trim() || salary === "") {
      setError("All fields are required.");
      return;
    }
    if (Number(salary) <= 0) {
      setError("Salary must be a positive number.");
      return;
    }
    onSave({
      name: name.trim(),
      designation: designation.trim(),
      salary: Number(salary),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

        <label>Employee Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. John Doe"
        />

        <label>Designation</label>
        <input
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="e.g. Software Engineer"
        />

        <label>Salary</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="e.g. 50000"
        />

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editingEmployee ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;
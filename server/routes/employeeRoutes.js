import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// READ — get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ empNo: 1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE — add a new employee (empNo auto-increments)
router.post("/", async (req, res) => {
  try {
    const { name, designation, salary } = req.body;
    if (!name || !designation || salary === undefined || salary === null) {
      return res
        .status(400)
        .json({ message: "Name, designation, and salary are required" });
    }

    // Find the highest existing empNo, then add 1 (start at 1 if none)
    const lastEmployee = await Employee.findOne().sort({ empNo: -1 });
    const empNo = lastEmployee ? lastEmployee.empNo + 1 : 1;

    const employee = new Employee({ empNo, name, designation, salary });
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE — edit name, designation, salary by id
router.put("/:id", async (req, res) => {
  try {
    const { name, designation, salary } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, designation, salary },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE — remove an employee by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
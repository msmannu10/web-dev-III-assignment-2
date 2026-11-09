const express = require("express");
const router = express.Router();

const students = require("../data/students");

// 1. GET - Get all students
router.get("/", (req, res) => {
    res.status(200).json({
        message: "All students fetched successfully",
        students: students
    });
});

// 2. GET - Get student by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student found",
        student: student
    });
});

// 3. POST - Add new student
router.post("/", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        email,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// 4. PUT - Update student
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.email = email;
    student.course = course;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});

// 5. DELETE - Delete student
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;
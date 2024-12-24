const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents(req.body);
  if (!students.length) {
    return res.status(404).json({ message: "No students found" });
  }
  res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ message: "No payload provided" });
  }
  const result = await addNewStudent(payload);
  if (!result) {
    return res.status(400).json({ message: "Failed to add student" });
  }
  res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ message: "No payload provided" });
  }
  const result = await updateStudent(payload);
  if (!result) {
    return res.status(400).json({ message: "Failed to update student" });
  }
  res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No id provided" });
  }
  const student = await getStudentDetail(id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No id provided" });
  }
  const { reviewerId, status } = req.body;
  if (!reviewerId || !status) {
    return res.status(400).json({ message: "Missing reviewerId or status" });
  }
  const result = await setStudentStatus({ userId: id, reviewerId, status });
  res.status(200).json({ message: result });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};

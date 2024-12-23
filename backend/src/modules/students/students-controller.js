const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res, next) => {
  //write your code
  try {
    const students = await getAllStudents(req.body);
    if (!students.length)
      return res.status(404).json({ message: "No students found" });

    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

const handleAddStudent = asyncHandler(async (req, res, next) => {
  //write your code
  try {
    const payload = req.body;
    if (!payload)
      return res.status(400).json({ message: "No payload provided" });

    const result = await addNewStudent(payload);
    if (!result)
      return res.status(400).json({ message: "Failed to add student" });

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
});

const handleUpdateStudent = asyncHandler(async (req, res, next) => {
  //write your code
  try {
    const payload = req.body;
    if (!payload)
      return res.status(400).json({ message: "No payload provided" });

    const result = await updateStudent(payload);
    if (!result)
      return res.status(400).json({ message: "Failed to update student" });

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

const handleGetStudentDetail = asyncHandler(async (req, res, next) => {
  //write your code
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id provided" });

    const student = await getStudentDetail(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

const handleStudentStatus = asyncHandler(async (req, res, next) => {
  //write your code
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "No id provided" });

    const { reviewerId, status } = req.body;
    if (!reviewerId || !status)
      return res.status(400).json({ message: "Missing reviewerId or status" });

    const result = await setStudentStatus({ userId: id, reviewerId, status });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};

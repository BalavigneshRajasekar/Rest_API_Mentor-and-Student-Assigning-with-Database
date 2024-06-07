const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true,
  },
  currentMentor: {
    type: String,
    default: null,
  },
  previousMentor: {
    type: String,
    default: null,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

const express = require("express");
const Student = require("../models/students");
const Mentor = require("../models/mentors");

const router = express.Router();

//Api which is going to create a student
router.post("/addStudent", async (req, res) => {
  const { studentName, studentEmail, currentMentor } = req.body;
  try {
    const emailCheck = await Student.findOne({ studentEmail });
    console.log(studentEmail);
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newStudent = new Student({
      studentName: studentName,
      studentEmail: studentEmail,
    });
    await newStudent.save();
    res.status(200).json({ msg: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/addMentor", async (req, res) => {
  const { mentorName, mentorEmail } = req.body;
  try {
    const emailCheck = await Mentor.findOne({ mentorEmail });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const newMentor = new Mentor({
      mentorName: mentorName,
      mentorEmail: mentorEmail,
    });
    await newMentor.save();

    res.status(200).json({ msg: "Mentor added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//This endpoint going to assign a student to a particular Mentor
//If the student already has one cannot assign to another mentor
router.post("/studentToMentor", async (req, res) => {
  const { studentName, studentEmail, mentorName, mentorEmail } = req.body;
  try {
    const checkStudent = await Student.findOne({ studentEmail });
    console.log(checkStudent);
    if (!checkStudent) {
      return res.status(400).json({ msg: "Student not found" });
    }
    if (checkStudent.currentMentor !== null) {
      return res.status(400).json({ msg: "Student already assigned" });
    }
    const checkMentor = await Mentor.findOne({ mentorEmail });
    if (!checkMentor) {
      return res.status(400).json({ msg: "Mentor not found" });
    }

    checkMentor.students.push(studentName);
    checkStudent.currentMentor = mentorName;

    await checkMentor.save();
    await checkStudent.save();
    console.log(checkMentor);
    res.status(200).json({ msg: "Student assigned successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: "server error" });
  }
});

router.put("/changeMentor/:student", async (req, res) => {
  const { mentorName, mentorEmail } = req.body;
  try {
    const checkMentor = await Mentor.findOne({ mentorEmail });
    if (!checkMentor) {
      //This will check the mentor exist or not
      return res.status(400).json({ msg: "Mentor not found" });
    }
    if (checkMentor) {
      // this wil check when mentor exist and check the mentor Name
      if (checkMentor.mentorName !== mentorName) {
        return res.status(400).json({ msg: "Mentor name misMatched" });
      }
    }
    const checkStudent = await Student.findOne({
      studentName: req.params.student,
    });
    if (!checkStudent) {
      // This will check student exist or not
      return res.status(400).json({ msg: "Student not found" });
    }
    //This will handle If student has currentMentor
    if (checkStudent.currentMentor !== null) {
      //This will check if the student is already assigned to the same mentor or not
      if (checkMentor.students.includes(req.params.student)) {
        return res
          .status(400)
          .json({ msg: "Student already assigned to you " });
      }
      const mentor = checkStudent.currentMentor;

      const pastMentor = await Mentor.findOne({ mentorName: mentor });
      console.log(pastMentor);
      if (pastMentor.students.includes(checkStudent.studentName)) {
        //This will remove the student from mentors who are not assigned to them
        const removeStudent = pastMentor.students.filter((student) => {
          return student !== checkStudent.studentName;
        });
        console.log(removeStudent);
        pastMentor.students = removeStudent;
        await pastMentor.save();
      }
      checkStudent.previousMentor = checkStudent.currentMentor;
      checkStudent.currentMentor = mentorName;
      checkMentor.students.push(checkStudent.studentName);
      await checkMentor.save();
      await checkStudent.save();
      return res.status(200).json({ msg: "mentor changed successfully" });
    }
    //This will take care of the student who doens't have mentors
    checkStudent.currentMentor = mentorName;
    checkMentor.students.push(checkStudent.studentName);
    await checkMentor.save();
    await checkStudent.save();
    res.status(200).json({ msg: "Mentor assigned successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: "server error" });
  }
});

//This endpoint going to get all  students for the particular mentor

router.get("/getStudents/:mentorId", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ _id: req.params.mentorId });
    if (!mentor) {
      return res.status(400).json({ msg: "Mentor not found" });
    }
    if (mentor) {
      if (mentor.students.length === 0) {
        return res.status(400).json({ msg: "Mentor has no students" });
      }
    }
    res.status(200).json({ msg: mentor.students });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: "server error" });
  }
});

// This endpoint going to get all previous Mentor for a particular student
router.get("/getPreviousMentor/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.studentId });
    if (!student) {
      return res.status(400).json({ msg: "Student not found" });
    }
    if (student) {
      if (student.previousMentor === null) {
        return res.status(400).json({ msg: "No Previous Mentor" });
      }
    }
    res.status(200).json({ msg: student.previousMentor });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: "server error" });
  }
});

module.exports = router;

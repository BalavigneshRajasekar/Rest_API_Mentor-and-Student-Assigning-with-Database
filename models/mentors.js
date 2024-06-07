const mongoose = require("mongoose");
const { type } = require("os");

const mentorSchema = new mongoose.Schema({
  mentorName: {
    type: String,
    required: true,
  },
  mentorEmail: {
    type: String,
    required: true,
    unique: true,
  },
  students: {
    type: Array,
    required: true,
    default: [],
  },
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;

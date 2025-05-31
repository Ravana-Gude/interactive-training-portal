const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctOption: Number, // index of correct answer
});

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // markdown or HTML content
  questions: [QuestionSchema], // quiz questions
});

module.exports = mongoose.model('Module', ModuleSchema);

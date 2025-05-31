const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const authMiddleware = require('../middleware/authMiddleware');

// Get all modules without questions (for preview)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const modules = await Module.find({}, 'title content');
    res.json(modules);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get module with quiz questions
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ msg: 'Module not found' });
    res.json(module);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

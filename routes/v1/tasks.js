import express from 'express';
import Task from '../../models/Task.js';
import { verifyToken, authorizeRoles } from '../../middleware/auth.js';

const router = express.Router();

// @route   POST /api/v1/tasks
// @desc    Create a new task
router.post('/', verifyToken, async (req, res) => {
    try {
        const task = new Task({ 
            title: req.body.title, 
            description: req.body.description,
            user: req.user.id 
        });
        await task.save();
        res.status(201).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// @route   GET /api/v1/tasks
// @desc    Get tasks (Users see their own, Admins see all)
router.get('/', verifyToken, async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };
        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   PUT /api/v1/tasks/:id
// @desc    Update a task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        // Ensure user owns task, unless they are an admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json({ success: true, data: task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        // Ensure user owns task, unless they are an admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Task successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
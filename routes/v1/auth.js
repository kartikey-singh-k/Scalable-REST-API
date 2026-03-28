import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../../models/User.js';

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
router.post('/register', [
    body('username', 'Username must be at least 3 characters').isLength({ min: 3 }).trim().escape(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const { username, password, role } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   POST /api/v1/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({ success: true, token, role: user.role });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
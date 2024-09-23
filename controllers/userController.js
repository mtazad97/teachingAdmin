const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.signup = async (req, res) => {
    const {email, password, mobile, fname, lname,role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({email, password: hashedPassword, mobile, fname, lname, role }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: `${role} registered successfully!` });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const {email, mobile, fname, lname } = req.body;
    User.updateById(id, {email, mobile, fname, lname}, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated successfully' });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
};

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

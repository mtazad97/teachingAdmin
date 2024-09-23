const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signup); // Provide role: 'admin' or 'user' in the request body
router.post('/login', userController.login);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers); // Only admins should access this, so protect it later

module.exports = router;
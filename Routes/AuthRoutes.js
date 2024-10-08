const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// เส้นทาง API สำหรับ Authentication

// ลงทะเบียนผู้ใช้ใหม่
router.post('/register', authController.register);

// เข้าสู่ระบบผู้ใช้
router.post('/login', authController.login);

module.exports = router;

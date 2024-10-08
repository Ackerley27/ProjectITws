const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// เส้นทาง API สำหรับผู้ใช้

// อ่านข้อมูลไอศกรีมทั้งหมด
router.get('/icecreams', userController.getAllIceCreams);

// สร้างไอศกรีมใหม่
router.post('/icecreams', userController.createIceCream);

// สั่งซื้อไอศกรีม
router.post('/icecreams/order', userController.orderIceCream);

module.exports = router;

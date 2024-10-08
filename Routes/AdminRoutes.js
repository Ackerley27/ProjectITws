const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// เส้นทาง API สำหรับ Admin

// สร้างไอศกรีมใหม่
router.post('/icecreams', adminController.createIceCream);

// อ่านข้อมูลไอศกรีมทั้งหมด
router.get('/icecreams', adminController.getAllIceCreams);

// อัปเดตข้อมูลไอศกรีมโดยใช้ ID
router.put('/icecreams/:id', adminController.updateIceCreamById);

// ลบไอศกรีมโดยใช้ ID
router.delete('/icecreams/:id', adminController.deleteIceCreamById);

module.exports = router;

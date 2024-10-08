const express = require('express');
const router = express.Router();
const IceCream = require('../Models/icecreamModel'); // นำเข้าโมเดล IceCream



// เส้นทาง API สำหรับ User
// อ่านข้อมูลไอศกรีมทั้งหมด
router.get('/icecreams', async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.json(iceCreams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// สร้างไอศกรีมใหม่
router.post('/icecreams', async (req, res) => {
    try {
        const newIceCream = new IceCream(req.body);
        await newIceCream.save();
        res.status(201).json(newIceCream);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// อัปเดตข้อมูลไอศกรีม
router.put('/icecreams/:id', async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!iceCream) {
            return res.status(404).json({ message: 'Ice cream not found' });
        }
        res.json(iceCream);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ลบไอศกรีม
router.delete('/icecreams/:id', async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndDelete(req.params.id);
        if (!iceCream) {
            return res.status(404).json({ message: 'Ice cream not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// เส้นทาง API สำหรับ Admin
router.post('/icecreams', adminController.addIceCream);
router.put('/icecreams/:id', adminController.updateIceCream);
router.delete('/icecreams/:id', adminController.deleteIceCream);

// Create
router.post('/', async (req, res) => {
    try {
        const newIceCream = new IceCream(req.body);
        await newIceCream.save();
        res.status(201).json(newIceCream);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.json(iceCreams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(iceCream);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await IceCream.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


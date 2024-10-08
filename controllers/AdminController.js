const IceCream = require('../Models/icecreamModel');

// Create
exports.createIceCream = async (req, res) => {
    try {
        const newIceCream = new IceCream(req.body);
        await newIceCream.save();
        res.status(201).json({ message: 'เพิ่มไอติมสำเร็จ', data: newIceCream });
    } catch (error) {
        res.status(400).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มไอติม', error: error.message });
    }
};

// Read
exports.getAllIceCreams = async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.status(200).json({ message: 'เรียกข้อมูลไอติมสำเร็จ', data: iceCreams });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเรียกข้อมูลไอติม', error: error.message });
    }
};

// Update
exports.updateIceCreamById = async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!iceCream) {
            return res.status(404).json({ message: 'ไม่พบไอติมที่ต้องการอัปเดต' });
        }
        res.status(200).json({ message: 'แก้ไขไอติมสำเร็จ', data: iceCream });
    } catch (error) {
        res.status(400).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขไอติม', error: error.message });
    }
};

// Delete
exports.deleteIceCreamById = async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndDelete(req.params.id);
        if (!iceCream) {
            return res.status(404).json({ message: 'ไม่พบไอติมที่ต้องการลบ' });
        }
        res.status(204).send(); // เปลี่ยนเป็น .send() แทนการส่ง JSON
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบไอติม', error: error.message });
    }
};

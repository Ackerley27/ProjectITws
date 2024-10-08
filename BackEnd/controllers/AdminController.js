const IceCream = require('../Models/icecreamModel');

// เพิ่มไอติมใหม่
exports.addIceCream = async (req, res) => {
    try {
        const icecream = new IceCream(req.body);
        await icecream.save();
        res.status(201).json({ message: 'เพิ่มไอติมสำเร็จ', data: icecream });
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มไอติม', error: err });
    }
};

// แก้ไขข้อมูลไอติม
exports.updateIceCream = async (req, res) => {
    try {
        const icecream = await IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!icecream) return res.status(404).json({ message: 'ไม่พบไอติม' });
        res.status(200).json({ message: 'แก้ไขไอติมสำเร็จ', data: icecream });
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขไอติม', error: err });
    }
};

// ลบไอติม
exports.deleteIceCream = async (req, res) => {
    try {
        const icecream = await IceCream.findByIdAndDelete(req.params.id);
        if (!icecream) return res.status(404).json({ message: 'ไม่พบไอติม' });
        res.status(200).json({ message: 'ลบไอติมสำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบไอติม', error: err });
    }
};

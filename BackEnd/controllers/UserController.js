const IceCream = require('../Models/icecreamModel'); // นำเข้าโมเดล IceCream

// อ่านข้อมูลไอศกรีมทั้งหมด
exports.getAllIceCreams = async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.json(iceCreams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// สร้างไอศกรีมใหม่
exports.createIceCream = async (req, res) => {
    try {
        const newIceCream = new IceCream(req.body);
        await newIceCream.save();
        res.status(201).json(newIceCream);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// สั่งซื้อไอติม (โค้ดนี้ต้องมีตามที่คุณต้องการ)
exports.orderIceCream = (req, res) => {
    // รหัสสำหรับสั่งซื้อไอติม
};

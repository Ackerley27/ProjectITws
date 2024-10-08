const IceCream = require('../Models/icecreamModel'); // เชื่อมต่อกับไฟล์ icecreamModel.js

// อ่านข้อมูลไอศกรีมทั้งหมด
exports.getAllIceCreams = async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.status(200).json({ message: 'เรียกข้อมูลไอติมสำเร็จ', data: iceCreams });
    } catch (error) {
        console.error('Error in getAllIceCreams:', error.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลไอติม', error: error.message });
    }
};

// สร้างไอศกรีมใหม่
exports.createIceCream = async (req, res) => {
    try {
        // ตรวจสอบข้อมูลก่อนบันทึก
        if (!req.body.name || !req.body.price || !req.body.description) {
            return res.status(400).json({ message: 'กรุณาใส่ข้อมูลที่จำเป็นให้ครบถ้วน' });
        }

        const newIceCream = new IceCream(req.body);
        await newIceCream.save();

        res.status(201).json({ message: 'สร้างไอศกรีมสำเร็จ', data: newIceCream });
    } catch (error) {
        console.error('Error in createIceCream:', error.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างไอติม', error: error.message });
    }
};

// ฟังก์ชันสำหรับสั่งซื้อไอติม
exports.orderIceCream = async (req, res) => {
    try {
        const { iceCreamId, quantity } = req.body;

        // ตรวจสอบว่ามีการส่งข้อมูลที่จำเป็นมาหรือไม่
        if (!iceCreamId || !quantity) {
            return res.status(400).json({ message: 'กรุณาใส่รหัสไอติมและจำนวนที่ต้องการสั่งซื้อ' });
        }

        const iceCream = await IceCream.findById(iceCreamId);
        if (!iceCream) {
            return res.status(404).json({ message: 'ไม่พบไอติมที่ต้องการสั่งซื้อ' });
        }

        // สมมุติว่ามีการจัดการสต๊อกและการสั่งซื้อ
        // ที่นี่คุณอาจเพิ่มโค้ดสำหรับการตรวจสอบสต๊อกหรือระบบการชำระเงิน

        res.status(200).json({ message: `สั่งซื้อไอติม ${iceCream.name} จำนวน ${quantity} สำเร็จ` });
    } catch (error) {
        console.error('Error in orderIceCream:', error.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสั่งซื้อไอติม', error: error.message });
    }
};

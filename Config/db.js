const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:', error.message);
        process.exit(1); // ออกจากโปรแกรมเมื่อไม่สามารถเชื่อมต่อได้
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

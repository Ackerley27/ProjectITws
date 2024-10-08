const express = require('express');
const connectDB = require('./Config/db');
const adminRoutes = require('./Routes/AdminRoutes');
const userRoutes = require('./Routes/UserRoutes');
const authRoutes = require('./Routes/AuthRoutes'); // เพิ่มเส้นทาง Auth
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // ใช้ express.json() แทน body-parser
app.use(cors()); // ใช้ cors เพื่อจัดการการเชื่อมต่อจากโดเมนอื่น
app.use(helmet()); // เพิ่มความปลอดภัยด้วย helmet
app.use(morgan('dev')); // ใช้ morgan ในโหมด dev สำหรับการบันทึกข้อมูล request

// เชื่อมต่อกับ MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // เส้นทางสำหรับการจัดการการเข้าสู่ระบบและการลงทะเบียน
app.use('/api/icecreams', userRoutes); // เส้นทางสำหรับผู้ใช้
app.use('/api/admin/icecreams', adminRoutes); // เส้นทางสำหรับผู้ดูแลระบบ

// 404 Handling
app.use((req, res) => {
    res.status(404).json({ message: 'ไม่พบหน้าที่คุณต้องการ' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server ทำงานที่ http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./Config/db');
const adminRoutes = require('./Routes/AdminRoutes');
const userRoutes = require('./Routes/UserRoutes');

require('dotenv').config(); // ตรวจสอบว่าได้เพิ่มบรรทัดนี้

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// เชื่อมต่อกับ MongoDB
connectDB();

// Routes
app.use('/api/icecreams', userRoutes); // เส้นทางสำหรับผู้ใช้
app.use('/api/admin/icecreams', adminRoutes); // เส้นทางสำหรับผู้ดูแลระบบ

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server ทำงานที่ http://localhost:${port}`);
});

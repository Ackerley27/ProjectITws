const jwt = require('jsonwebtoken'); // นำเข้า JWT เพื่อสร้างและตรวจสอบ token
const bcrypt = require('bcrypt'); // นำเข้า bcrypt สำหรับการแฮช password


// Middleware สำหรับตรวจสอบ token ในคำขอ (request)
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // ผ่านการตรวจสอบและไปยังส่วนถัดไป
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบว่าผู้ใช้อยู่ในระบบหรือไม่
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ตรวจสอบ password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    // สร้าง JWT token และส่งกลับ
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('Authorization', token).json({ token });
};

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้ใหม่
exports.register = async (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // แฮช password และบันทึกผู้ใช้
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

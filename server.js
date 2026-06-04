import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dns from 'dns';

dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();
app.use(express.json());
app.use(cors());

const ProductSchema = new mongoose.Schema({
    Name_of_Product: String,
    Quantity: String,
    Drug_or_Content: String,
    How_to_Use: String,
    Special_Features: String,
    Diseases_Used_For: String,
    photo_link: String,
    Category_sub: String,
    category: String
}, { collection: 'Product_List' });

const ProductList = mongoose.model('Product', ProductSchema);

// Connect to your Database (Modified to use Dermasis database specifically)
const url = "mongodb+srv://Dev_letwala_Softcap:Dev_mongodb0716@softcapdev.puzklaw.mongodb.net/Dermasis?appName=SoftcapDev"

mongoose.connect(url)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => {
        console.error("❌ Database Connection Error Details:");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        console.error("Full Error:", err);
    });

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dev.lethwala@gmail.com',
        pass: 'hezzcvkofixwxofa'
    }
});

// Memory Store for OTPs
const otpStore = {};

// Schemas & Models
const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    userId: String,
    registeredAt: { type: Date, default: Date.now }
});
// Using exact collection name 'Registration data'
const Registration = mongoose.model('Registration', RegistrationSchema, 'Registration_Application_data');

const LoginLogSchema = new mongoose.Schema({
    email: String,
    userId: String,
    loginTime: { type: Date, default: Date.now },
    status: String
});
// Using exact collection name 'login_data'
const LoginLog = mongoose.model('LoginLog', LoginLogSchema, 'login_data');

const ConsultSchema = new mongoose.Schema({
    doctorName: String,
    specialty: String,
    patientName: String,
    clinicAddress: String,
    notes: String,
    date: { type: Date, default: Date.now }
});
// Using exact collection name 'Doctor_Consultation'
const Consult = mongoose.model('Consult', ConsultSchema, 'Doctor_Consultation');

const StockSchema = new mongoose.Schema({
    productName: String,
    stockQty: Number,
    distributorName: String,
    batchNumber: String,
    expiryDate: String,
    date: { type: Date, default: Date.now }
});
// Using exact collection name 'sales_stock'
const Stock = mongoose.model('Stock', StockSchema, 'sales_stock');

// HTML Email Template Function
const getEmailTemplate = (otp, type) => `
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #020205; color: #ffffff; padding: 20px;">
        <div style="border: 1px solid #00d4ff; padding: 20px; border-radius: 10px; text-align: center;">
            <div style="display: inline-block; width: 150px; height: 150px; 
                        background-image: url('https://drive.google.com/uc?export=view&id=1Oun2ldKALz72KqoADgnMVyj_dzOW_apD'); 
                        background-size: contain; background-repeat: no-repeat; background-position: center;">
            </div>
            <h1 style="color: #00d4ff;">Softcapphyjas Pvt. Ltd.</h1>
            <p style="font-size: 16px;">Secure Access Terminal</p>
            <hr style="border: 0; border-top: 1px solid #333;">
            <p>Your One-Time Password (OTP) for ${type} is:</p>
            <h2 style="background: #111; padding: 10px; letter-spacing: 5px; color: #00d4ff; display: inline-block;">
                ${otp}
            </h2>
            <p style="font-size: 15px; color: #00d4ff;">Thank you, From Team Softcapphyjas.</p>
            <div style="display: inline-block; width: 100px; height: 40px; 
                        background-image: url('https://drive.google.com/uc?export=view&id=1XIPqEBjWXv6rlkeMb8h47E-bppzbo8Wm'); 
                        background-size: contain; background-repeat: no-repeat; background-position: center;">
            </div>
        </div>
    </body>
    </html>
`;

// API Routes

app.post('/api/send-registration-otp', async (req, res) => {
    const { name, email } = req.body;
    try {
        const existingInfo = await Registration.findOne({ email });
        if (existingInfo) {
            return res.status(400).json({ error: "Email already registered. Please sign in." });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { otp, type: 'register', name };
        
        await transporter.sendMail({
            from: 'dev.lethwala@gmail.com',
            to: email,
            subject: 'Softcapphyjas Pvt. Ltd. Service OTP',
            html: getEmailTemplate(otp, "Sign Up")
        });
        
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (e) {
        console.error("Mail Error:", e);
        res.status(500).json({ error: "Failed to send email OTP" });
    }
});

app.post('/api/verify-registration', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const record = otpStore[email];
        if (!record || record.otp !== otp || record.type !== 'register') {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        
        const userId = "SOFTCAP-EMP-" + Math.floor(1000 + Math.random() * 9000);
        const newReg = new Registration({ name: record.name, email, userId });
        await newReg.save();
        
        delete otpStore[email];
        
        await transporter.sendMail({
            from: 'dev.lethwala@gmail.com',
            to: email,
            subject: 'Welcome to Softcapphyjas',
            text: `Welcome ${record.name}!\n\nYour Registration is complete.\nYour generated User ID is: ${userId}\n\nYou can now log in.`
        });

        res.status(201).json({ message: "Registration successful", user: { name: record.name, email, userId } });
    } catch(e) {
        console.error("Verify Reg Error:", e);
        res.status(500).json({ error: "Registration failed" });
    }
});

app.post('/api/send-login-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not registered. Please register first." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { otp, type: 'login' };
        
        await transporter.sendMail({
            from: 'dev.lethwala@gmail.com',
            to: email,
            subject: 'Softcapphyjas Pvt. Ltd. Login OTP',
            html: getEmailTemplate(otp, "Login")
        });
        
        res.status(200).json({ message: "OTP sent successfully" });
    } catch(e) {
        console.error("Send Login Mail Error:", e);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

app.post('/api/verify-login', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const record = otpStore[email];
        if (!record || record.otp !== otp || record.type !== 'login') {
            await new LoginLog({ email, status: "Failed - Invalid OTP" }).save();
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        
        const user = await Registration.findOne({ email });
        await new LoginLog({ email, userId: user.userId, status: "Success" }).save();
        
        delete otpStore[email];
        
        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email, userId: user.userId, role: 'Employee' } });
    } catch(e) {
        console.error("Login Verify Error:", e);
        res.status(500).json({ error: "Login failed" });
    }
});

app.post('/api/log-consult', async (req, res) => {
    try {
        const newConsult = new Consult(req.body);
        await newConsult.save();
        res.status(201).send({ message: "Consultation saved to database!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/api/log-stock', async (req, res) => {
    try {
        const newStock = new Stock(req.body);
        await newStock.save();
        res.status(201).send({ message: "Stock saved to database!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const { category, subCategory } = req.query;
        let query = {};
        if (category) query.category = category;
        if (subCategory) query.Category_sub = subCategory;
        const products = await ProductList.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
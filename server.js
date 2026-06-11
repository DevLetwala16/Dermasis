import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dns from 'dns';
import crypto from 'crypto';

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
const PendingEmployeeSchema = new mongoose.Schema({
    _id: String, // userId
    Password: { type: String, required: true },
    Name: String,
    Address: String,
    DOB: String,
    Age: Number,
    Email: String,
    phone: String,
    Post: String,
    Application_id: String,
    approval_token: String,
    request_time: String
});
const PendingEmployee = mongoose.model('PendingEmployee', PendingEmployeeSchema, 'Pending_Employee_Data');

const EmployeeSchema = new mongoose.Schema({
    _id: String,
    userId: { type: String },
    name: String,
    email: { type: String },
    password: { type: String },
    post: String,
    registeredAt: { type: Date },
    Password: { type: String },
    Name: String,
    Email: String,
    Post: String,
    Address: String,
    DOB: String,
    Age: Number,
    phone: String,
    Application_id: String,
    request_time: String,
    approval_token: String
}, { strict: false }); 
// strict: false allows Mongoose to return fields not explicitly defined
// Using exact collection name 'Verified_Employee'
const Employee = mongoose.model('Employee', EmployeeSchema, 'Registration_Application_data');

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

// Python logic translations
const generateApplicationId = (userId) => {
    const now = new Date();
    const year = now.getFullYear();
    const company = "Softcapphyjas";
    const nameLen = userId.length % 10;
    
    let totalOfName = 0;
    for (let i = 0; i < userId.length; i++) {
        totalOfName += userId.charCodeAt(i);
    }
    totalOfName = totalOfName % 1000;
    
    let companyCode = 0;
    for (let i = 0; i < company.length; i++) {
        companyCode += company.charCodeAt(i);
    } // Usually 1375
    
    return `${year}${companyCode}${nameLen}${totalOfName}`;
};

const calculateAge = (dobString) => {
    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};

// API Routes

app.post('/api/v2/send-registration-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }
    try {
        const existingInfo = await Employee.findOne({
            $or: [{ email: email }, { Email: email }]
        });
        if (existingInfo) {
            return res.status(400).json({ error: "Email already registered in the system." });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { otp, type: 'register' };
        
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

app.post('/api/v2/register', async (req, res) => {
    const { name, address, dob, email, phone, post, password, otp } = req.body;
    
    if (!name || !email || !phone || !dob || !password || !otp) {
        return res.status(400).json({ error: "All required fields must be provided (name, email, phone, dob, password, otp)." });
    }
    
    try {
        const record = otpStore[email];
        if (!record || record.otp !== otp || record.type !== 'register') {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Logic to generate User ID
        // name[:4] + dob[:2] + phone[:3] + @dermasisremedies.com (capitalized initially)
        const namePart = name.substring(0, 4);
        const dobPart = dob.replace(/[\/-]/g, '').substring(0, 2); // Get year or whatever first 2 chars
        // From python: dob[:2] means first two chars. Usually YYYY/MM/DD, so dob[:2] is '20' for 2006
        const phonePart = phone.substring(0, 3);
        let generatedUserId = `${namePart}${dobPart}${phonePart}@dermasisremedies.com`.replace(/\s/g, '');
        generatedUserId = generatedUserId.charAt(0).toUpperCase() + generatedUserId.slice(1).toLowerCase();

        const existingPending = await PendingEmployee.findOne({_id: generatedUserId});
        if (existingPending) {
             return res.status(400).json({ error: "This application is already pending approval!" });
        }

        const applicationCode = generateApplicationId(generatedUserId);
        const age = calculateAge(dob);
        const approvalToken = crypto.randomBytes(24).toString('base64url');

        const newPending = new PendingEmployee({
            _id: generatedUserId,
            Password: password,
            Name: name,
            Address: address,
            DOB: dob,
            Age: age,
            Email: email,
            phone: phone,
            Post: post,
            Application_id: applicationCode,
            approval_token: approvalToken,
            request_time: new Date().toLocaleString()
        });

        await newPending.save();
        delete otpStore[email];

        // Send Manager Approval Email
        const managerEmail = ['dev.lethwala@gmail.com','letwala.anil@gmail.com'];
        const baseUrl = "https://company-approvals-softcapphyjas.streamlit.app";
        const approveUrl = `${baseUrl}/?action=approve&token=${approvalToken}`;
        const rejectUrl = `${baseUrl}/?action=reject&token=${approvalToken}`;
        const managerHtml = `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: 'Segoe UI', sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e8ed;">
                    <div style="background-color: #0e4682; padding: 25px 40px; color: white;">
                        <h2>New Employee Registration</h2>
                        <p>Action Required: Manual Authentication Request</p>
                    </div>
                    <div style="padding: 40px;">
                        <p>A new user has submitted a registration request. Details:</p>
                        <table width="100%" cellspacing="0" cellpadding="0" style="margin: 25px 0; text-align: left;">
                            <tr><th style="padding: 10px; background: #f8fafc;">Name</th><td style="padding: 10px; background: #f8fafc;">${name}</td></tr>
                            <tr><th style="padding: 10px;">User ID</th><td style="padding: 10px;">${generatedUserId}</td></tr>
                            <tr><th style="padding: 10px; background: #f8fafc;">Email</th><td style="padding: 10px; background: #f8fafc;">${email}</td></tr>
                            <tr><th style="padding: 10px;">Phone</th><td style="padding: 10px;">${phone}</td></tr>
                            <tr><th style="padding: 10px; background: #f8fafc;">DOB</th><td style="padding: 10px; background: #f8fafc;">${dob} (Age: ${age})</td></tr>
                            <tr><th style="padding: 10px;">Post</th><td style="padding: 10px;">${post}</td></tr>
                        </table>
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="${approveUrl}" style="background-color: #28a745; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">APPROVE</a>
                            <a href="${rejectUrl}" style="background-color: #dc3545; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">REJECT</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: 'dev.lethwala@gmail.com',
            to: managerEmail,
            subject: `Action Required: New Employee Registration - ${name} ( ${address} )`,
            html: managerHtml
        });

        res.status(201).json({ message: "Registration submitted! Awaiting Manager Approval." });
    } catch(e) {
        console.error("Verify Reg Error:", e);
        res.status(500).json({ error: "Registration failed or already exists" });
    }
});

app.post('/api/v2/login-step1', async (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ error: "User ID and Password are required." });
    }
    try {
        // Find the user safely using all possible ID fields to handle schema mismatches
        const user = await Employee.findOne({
            $or: [
                { userId: userId },
                { _id: userId },
                { email: userId },
                { Email: userId }
            ]
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid User ID or Password." });
        }

        const dbPassword = user.password || user.Password;
        if (dbPassword !== password) {
            return res.status(401).json({ error: "Invalid User ID or Password." });
        }

        const userEmail = user.email || user.Email;
        if (!userEmail) {
            return res.status(400).json({ error: "User email not found in database." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[userEmail] = { otp, type: 'login', userId: user.userId || user._id };
        
        await transporter.sendMail({
            from: 'dev.lethwala@gmail.com',
            to: userEmail,
            subject: 'Softcapphyjas Pvt. Ltd. Login OTP',
            html: getEmailTemplate(otp, "Login")
        });
        
        res.status(200).json({ message: "OTP sent to your registered email successfully", email: userEmail });
    } catch(e) {
        console.error("Send Login Mail Error:", e);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

app.post('/api/v2/verify-login', async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required." });
    }
    try {
        const record = otpStore[email];
        if (!record || record.otp !== otp || record.type !== 'login') {
            await new LoginLog({ email, status: "Failed - Invalid OTP" }).save();
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        
        const user = await Employee.findOne({
            $or: [
                { email: email },
                { Email: email }
            ]
        });

        if (!user) {
            return res.status(404).json({ error: "User profile no longer found." });
        }

        // 2. Extract identifiers safely using fallbacks to avoid reading undefined properties
        const finalUserId = user.userId || user._id || "Unknown ID";
        const finalName = user.name || user.Name || "Employee";
        const finalEmail = user.email || user.Email || email;
        const finalRole = user.post || user.Post || 'Employee';

        // 3.Use the validated string fallback here so LoginLog won't crash
        await new LoginLog({ 
            email: finalEmail, 
            userId: finalUserId, 
            status: "Success" 
        }).save();
        
        delete otpStore[email];
        
        // 4. Return the safe structural data back to your client application
        res.status(200).json({ 
            message: "Login successful", 
            user: { 
                name: finalName, 
                email: finalEmail, 
                id: finalUserId, 
                role: finalRole 
            } 
        });
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

app.use('/api', (req, res) => {
    res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.originalUrl}` });
});

app.listen(5000, () => console.log("Server running on port 5000"));

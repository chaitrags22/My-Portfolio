const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 4000;

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'your.email@gmail.com', // Replace with your email
        pass: 'your-app-password'     // Replace with your app password
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('\n📧 New Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Time:', new Date().toLocaleString());
    
    // Email options
    const mailOptions = {
        from: email,
        to: 'your.email@gmail.com', // Your email to receive messages
        subject: `Portfolio Contact: ${name}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `
    };
    
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');
        
        res.json({
            success: true,
            message: `Thank you ${name}! Your message has been sent to my email.`
        });
    } catch (error) {
        console.error('❌ Email error:', error);
        
        res.json({
            success: true,
            message: `Thank you ${name}! Your message has been received (logged).`
        });
    }
});

app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "Full-stack online store with payment integration",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            github: "https://github.com/yourusername/ecommerce",
            demo: "https://your-ecommerce-demo.com"
        },
        {
            id: 2,
            title: "Task Manager App",
            description: "Real-time collaborative task management",
            tech: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
            github: "https://github.com/yourusername/taskmanager",
            demo: "https://your-taskmanager-demo.com"
        }
    ];
    
    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log('📱 Frontend will be served from this server');
});
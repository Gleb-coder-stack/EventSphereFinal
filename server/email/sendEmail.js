// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru', // или smtp.gmail.com / smtp.mail.ru и т.д.
    port: 465,
    secure: true, // true для порта 465, false для 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"Event Sphere" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
    });
};

module.exports = { sendMail };

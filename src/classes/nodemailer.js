const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'matyashtodojs@gmail.com',
        pass: 'myToDojs',
    },
});

module.exports = transporter;
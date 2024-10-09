const nodemailer = require('nodemailer');

// Gmail SMTP transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'avishkapiyumal16@gmail.com', 
    pass: 'jbfn hqps okae hwhu', 
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'avishkapiyumal16@gmail.com',
    to: 'piyumalkandy2020@gmail.com',
    subject: "Order Conformation", 
    text: "Your order has been Confirmed. Our Officials will contact you shortly, Thank You..", 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendEmail; 
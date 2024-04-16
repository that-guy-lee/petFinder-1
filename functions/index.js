//TODO: FIND A WAY TO KEEP THE SECURE INFO SAFE

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "petfinder@lnkcommunications.co.za",
      pass: "L0gMeiN007",
    },
  });


// Define Cloud Function to send emails
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  try {

    const toEmail = req.query.to;
    const subject = req.query.subject;
    const body = req.query.body;

    if (!toEmail || !subject || !body) {
        return res.status(400).send('Missing information.');
    }
  
    // Define email options
    const mailOptions = {
      from: 'petfinder@lnkcommunications.co.za',
      to: toEmail,
      subject: subject,
      text: body,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});

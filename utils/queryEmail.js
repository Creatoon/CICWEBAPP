const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');
const pug = require('pug');
const htmlToText = require('html-to-text');

exports.email = catchAsync(async (userMessage) => {
  const mailTransporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  // Send the actual email

  // 2) Define email options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM}`,
    to: 'yasharyan1099@gmail.com',
    subject: 'Query Email',
    text: userMessage
  };

  // 3) Create a transport and send email
  await mailTransporter.sendMail(mailOptions);
});

exports.emailToMailingList = catchAsync(
  async (mailingList, userMessage, url) => {
    const mailTransporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
      }
    });

    const html = pug.renderFile(`${__dirname}/../views/email/blogMail.pug`, {
      url: url,
      subject: userMessage
    });

    // 2) Define email options
    const mailOptions = {
      from: `CIC PICTURES ${process.env.EMAIL_FROM}`,
      to: mailingList,
      subject: 'New Announcement! Hurry up',
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await mailTransporter.sendMail(mailOptions);
  }
);

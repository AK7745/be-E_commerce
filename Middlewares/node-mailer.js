import nodemailer from 'nodemailer'
import { NODE_MAILER_SERVICE,USER_EMAIL_NODE_MAILER,USER_PASS_NODE_MAILER } from '../constants/constants.js';

const transporter = nodemailer.createTransport({
  service: NODE_MAILER_SERVICE,
  auth: {
    user: USER_EMAIL_NODE_MAILER,
    pass: USER_PASS_NODE_MAILER
  }
});

export const sendTokenEmail = async (email,resetToken) => {
  try {
    const message = {
      from: USER_EMAIL_NODE_MAILER,
      to: email,
      subject: 'FORGET PASSWORD EMAIL',
      text: `Please use the following token to reset your password: ${resetToken}`
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


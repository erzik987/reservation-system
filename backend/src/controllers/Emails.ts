import { NextFunction, Request, Response } from 'express';
import nodeMailer from 'nodemailer';
import { IResponseMessage } from '../models/ResponseMessage';

const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  const reqBody = req.body;
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_SERVER_HOSTNAME,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `${reqBody.senderName} <${process.env.SENDER_EMAIL}>`,
      to: reqBody.recipientEmail,
      subject: reqBody.subject,
      html: reqBody.htmlMessage
    });

    console.log('Email sent: ' + info.messageId);

    return res.status(200).json({ authenticated: true, message: 'Email send successfully', email: req.body });
  } catch (error) {
    const errorResponse: IResponseMessage = {
      displayMessage: `Nastala chyba pri odosielaní mailu na emailovú adresu ${reqBody.recipientEmail}`,
      message: `Error while sending mail to ${reqBody.recipientEmail}`,
      response: error
    };

    return res.status(500).json(errorResponse);
  }
};

export default { sendMail };

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: Number(process.env.MAIL_PORT) === 465, 
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PASSWORD
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.setHeader('Allow', ['POST']).status(405).json({ message: 'Method Not Allowed' });
    }

    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ message: "Missing required fields: 'to', 'subject', or 'text'" });
    }

    try {
        await transport.sendMail({
            from: `"Your Company" <${process.env.USER_NAME}>`,
            to,
            subject,
            text,
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ message: 'Error sending email', error });
    }
}

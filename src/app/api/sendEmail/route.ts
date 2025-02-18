import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type EmailRequestBody = {
    name: string;
    email: string;
    address: string;
    selectedMethod: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, address, selectedMethod } = req.body as EmailRequestBody;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER as string,
                pass: process.env.EMAIL_PASSWORD as string,
            },
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Invoice for Your Payment',
            text: `Hello ${name},\n\nThank you for your payment via ${selectedMethod}.\n\nHere is your invoice:\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment Method: ${selectedMethod}\n\nBest regards,\nYour Company`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

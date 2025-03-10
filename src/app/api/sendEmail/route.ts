import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  debug: true, 
  logger: true, 
});

type SendEmailDto = {
  to: string;
  subject: string;
  text: string;
};

const sendEmail = async (dto: SendEmailDto) => {
  const { to, subject, text } = dto;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to, 
      subject,
      text,
    };

    // Await the sendMail function
    const info = await transport.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return "Email sent successfully";
  } catch (err: any) {
    console.error("Error:", err.message);
    return "Failed to send email";
  }
};

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Request body:", body);

  try {
    const result = await sendEmail({
      to: body.to,
      subject: body.subject,
      text: body.text,
    });

    console.log("Email result:", result);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Unable to send email" }, { status: 500 });
  }
}
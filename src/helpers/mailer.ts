import User from "@/model/user.models";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
                    }
                })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                })
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f036c321f3a9a7",
                pass: "45aa0da62f282b"
            }
        });

        const mailOpttions = {
            from: 'hussaindev007@gmail.com',
            to: email,
            subject: emailType === "Verify" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyyemail?token${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser
            <br/> ${process.env.DOMAIN}/verifyemail?token${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOpttions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}
import { connect } from "@/dbConfig/dbConfig";
import User, { IUser } from "@/model/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

// Define the type for the request body
interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
}

// Define the response structure for clarity
interface ApiResponse {
    message?: string;
    success?: boolean;
    error?: string;
}

// Define a type for the `sendEmail` function argument
interface EmailOptions {
    email: string;
    emailType: string;
    userId: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate request body
        const reqBody: RegisterRequestBody = await request.json();
        const { name, email, password, role } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json<ApiResponse>({ error: "All fields are required" }, { status: 400 });
        }

        const userRole: "admin" | "user" = role || "user";

        // Check if user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return NextResponse.json<ApiResponse>({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser: IUser = new User({
            name,
            email,
            password: hashedPassword,
            role: userRole,
        });

        const savedUser = await newUser.save();

        // Send verification email
        await sendEmail({
            email,
            emailType: "Verify Email",
            userId: savedUser._id.toString(),
        } as EmailOptions);

        return NextResponse.json<ApiResponse>({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        return NextResponse.json<ApiResponse>(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}

import { connect } from "@/dbConfig/dbConfig";
import User, { IUser } from "@/model/user.models"; // Ensure your model exports a type or interface for the user schema
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

// Define the shape of the login request body
interface LoginRequestBody {
    email: string;
    password: string;
}

// Define the shape of the JWT payload
interface JwtPayload {
    id: string;
    name: string;
    role: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate request body
        const reqBody: LoginRequestBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Check if the user exists
        const user: IUser | null = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create a JWT token
        const tokenPayload: JwtPayload = {
            id: user._id.toString(), // Ensure _id is converted to a string
            name: user.name,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET as string, { expiresIn: "1d" });

        // Set the token as an HTTP-only cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            role: user.role,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 day in seconds
        });

        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

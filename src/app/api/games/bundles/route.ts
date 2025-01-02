import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Game, { IGame } from "@/model/games.models";


const connectToDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(process.env.MONGO_URI as string);
};

// API Route for adding a game with image
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Connect to MongoDB
        await connectToDB();

        const formData = await request.formData(); // Using formData for file and data

        // Extract game data from form
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const image = formData.get("image") as File;

        if (!name || !description || !price || !category || !image) {
            return NextResponse.json(
                { error: "All fields (name, description, price, category, and image) are required" },
                { status: 400 }
            );
        }

        // Ensure the image is a file object
        if (!(image instanceof File)) {
            return NextResponse.json(
                { error: "Image must be a valid file" },
                { status: 400 }
            );
        }

        // Save image to server (or upload to cloud storage like Cloudinary)
        const uploadPath = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // create directory if it doesn't exist
        }

        const imagePath = path.join(uploadPath, image.name);
        await fs.promises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));

        // Create a new game record
        const newGame: IGame = new Game({
            name,
            description,
            price: parseFloat(price),
            category,
            image: `/uploads/${image.name}`, // Save relative image path in DB
        });

        const savedGame = await newGame.save();

        return NextResponse.json(
            { message: "Game added successfully", game: savedGame },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}

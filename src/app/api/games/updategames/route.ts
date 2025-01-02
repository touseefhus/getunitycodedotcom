import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Game from "@/model/games.models";

const connectToDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(process.env.MONGO_URI as string);
};

// API Route for updating a game
export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        // Connect to MongoDB
        await connectToDB();

        const formData = await request.formData(); // Using formData for file and data

        // Extract game data from form
        const id = formData.get("id") as string;
        const name = formData.get("name") as string | null;
        const description = formData.get("description") as string | null;
        const price = formData.get("price") as string | null;
        const category = formData.get("category") as string | null;
        const image = formData.get("image") as File | null;

        if (!id) {
            return NextResponse.json(
                { error: "Game ID is required" },
                { status: 400 }
            );
        }

        const updateData: { [key: string]: any } = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = parseFloat(price);
        if (category) updateData.category = category;

        // Handle image upload if provided
        if (image && image instanceof File) {
            const uploadPath = path.join(process.cwd(), "public", "uploads");
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath); // create directory if it doesn't exist
            }

            const imagePath = path.join(uploadPath, image.name);
            await fs.promises.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));

            updateData.image = `/uploads/${image.name}`;
        }

        // Update the game
        const updatedGame = await Game.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedGame) {
            return NextResponse.json(
                { error: "Game not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Game updated successfully", game: updatedGame },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}

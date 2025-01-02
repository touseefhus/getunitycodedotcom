import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Game from "@/model/games.models";

const connectToDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(process.env.MONGO_URI as string);
};

// API Route for deleting a game
export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Extract game ID from request query
        const url = new URL(request.url);
        const gameId = url.searchParams.get("id");

        if (!gameId) {
            return NextResponse.json(
                { error: "Game ID is required" },
                { status: 400 }
            );
        }

        // Delete the game
        const deletedGame = await Game.findByIdAndDelete(gameId);

        if (!deletedGame) {
            return NextResponse.json(
                { error: "Game not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Game deleted successfully", game: deletedGame },
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

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
        // Step 1: Connect to the database
        await connectToDB();

        // Step 2: Parse form data from the request
        const formData = await request.formData();

        // Extract form fields
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const galleryFiles = formData.getAll("gallery") as File[];
        const platformsRaw = formData.get("platforms") as string;
        const versionsRaw = formData.get("versions") as string;

        // Step 3: Validate required fields
        if (!name || !description || !price || !category || !platformsRaw || !versionsRaw) {
            return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
        }

        // Step 4: Parse platforms JSON data
        let platforms: { platform: string; price: number }[] = [];
        try {
            platforms = JSON.parse(platformsRaw);
        } catch (err) {
            return NextResponse.json({ error: "Invalid platforms data" }, { status: 400 });
        }

        //Step 6: Parse versions JSON data
        let versions: { version: string; price: number }[] = [];
        try {
            versions = JSON.parse(versionsRaw);
        } catch (err) {
            return NextResponse.json({ error: "Invalid versions data" }, { status: 400 });
        }
        // Step 5: Create upload directory if not exist
        const uploadPath = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
       

        // Step 7: Handle gallery files upload
        const galleryPaths: string[] = [];
        for (const file of galleryFiles) {
            const galleryPath = path.join(uploadPath, file.name);
            await fs.promises.writeFile(galleryPath, Buffer.from(await file.arrayBuffer()));
            galleryPaths.push(`/uploads/${file.name}`);
        }

        // Step 8: Prepare the data for the new game
        const newGame = new Game({
            name,
            description,
            price: parseFloat(price),  // Convert price to number
            category,
            gallery: galleryPaths,
            platforms, 
            versions,
        });

        // Step 9: Save the new game to the database
        console.log("Saving game:", newGame);
        const savedGame = await newGame.save();

        // Step 10: Return success response with saved game data
        return NextResponse.json(
            { message: "Game added successfully", game: savedGame },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error:", error);

        if (error.name === "ValidationError") {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}







// API Route to Get All Games
export async function GET(request: NextRequest): Promise<NextResponse> {

    // const id = ""
    const testId = new URLSearchParams(request.url.split('?')[1])

    const id = testId.get('id')
    try {
        // Connect to MongoDB
        await connectToDB();

        if (id) {
            // Fetch a single game by ID
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                // Return an error if the ID is not valid
                return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
            }

            const game = await Game.findById(id);
            if (!game) {
                // If no game is found, return a 404 error
                return NextResponse.json({ error: "Game not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Game fetched successfully", game }, { status: 200 });
        } else {
            // Fetch all games
            const games = await Game.find();
            return NextResponse.json({ message: "Games fetched successfully", games }, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json(
            { error: "Failed to fetch games. Please try again later." },
            { status: 500 }
        );
    }
}

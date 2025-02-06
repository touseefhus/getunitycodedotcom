import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    gallery: string[];
    platforms: { platform: string; price: number }[];
    versions: { version: string; price: number }[];
}

const GameSchema = new Schema<IGame>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    gallery: { type: [String], required: false },
    platforms: [{
        platform: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    versions: [{
        version: { type: String, required: true },
        price: { type: Number, required: true }
    }]
});

export default mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);

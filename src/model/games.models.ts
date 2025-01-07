import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    gallery: string[];
    licenseAgreement: string;
    latestVersion: string;
    latestReleaseDate: string;
    originalUnityVersion: string;
}

const GameSchema = new Schema<IGame>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], required: false },
    licenseAgreement: { type: String, required: true },
    latestVersion: { type: String, required: true },
    latestReleaseDate: { type: String, required: true },
    originalUnityVersion: { type: String, required: true },
});

export default mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);

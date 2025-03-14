"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify"; // For sanitizing HTML
import parse from "html-react-parser"; // For parsing HTML strings into React components

const UploadGameForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "", // This will store raw HTML
    price: "",
    category: "",
  });
  const [platforms, setPlatforms] = useState([{ platform: "", price: 0 }]);
  const [versions, setVersions] = useState([{ version: "", price: 0 }]);
  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlatformChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    const newPlatforms = [...platforms];
    newPlatforms[index] = { ...newPlatforms[index], [key]: value };
    setPlatforms(newPlatforms);
  };

  const handleVersionChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    const newVersions = [...versions];
    newVersions[index] = { ...newVersions[index], [key]: value };
    setVersions(newVersions);
  };

  const addPlatform = () =>
    setPlatforms([...platforms, { platform: "", price: 0 }]);
  const removePlatform = (index: number) =>
    setPlatforms(platforms.filter((_, i) => i !== index));

  const addVersion = () =>
    setVersions([...versions, { version: "", price: 0 }]);
  const removeVersion = (index: number) =>
    setVersions(versions.filter((_, i) => i !== index));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGallery(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Sanitize the HTML description before sending it to the backend
      const sanitizedDescription = DOMPurify.sanitize(formData.description);

      // Create FormData object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", sanitizedDescription); // Use sanitized HTML
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("platforms", JSON.stringify(platforms));
      data.append("versions", JSON.stringify(versions));

      if (image) {
        data.append("image", image);
      }

      gallery.forEach((file) => {
        data.append("gallery", file);
      });

      // Log FormData for debugging

      // Send POST request to the backend
      const response = await fetch("/api/games", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload game");
      }

      const result = await response.json();
      console.log("Game uploaded successfully:", result);
      setSuccess(true);
    } catch (err) {
      console.error("Error uploading game:", err);
      if (err instanceof Error) {
        setError(err.message || "An error occurred while uploading the game");
      } else {
        setError("An unknown error occurred while uploading the game");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Upload Game</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter HTML content"
          />
          {/* Preview the parsed HTML */}
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
            <div className="prose">
              {parse(DOMPurify.sanitize(formData.description))}
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Platforms
          </label>
          {platforms.map((p, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Platform"
                value={p.platform}
                onChange={(e) =>
                  handlePlatformChange(index, "platform", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={p.price}
                onChange={(e) =>
                  handlePlatformChange(index, "price", Number(e.target.value))
                }
                className="p-2 border border-gray-300 rounded-md w-1/3"
              />
              <button
                type="button"
                onClick={() => removePlatform(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addPlatform} className="text-blue-500">
            + Add Platform
          </button>
        </div>

        {/* Versions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Versions
          </label>
          {versions.map((v, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Version"
                value={v.version}
                onChange={(e) =>
                  handleVersionChange(index, "version", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) =>
                  handleVersionChange(index, "price", Number(e.target.value))
                }
                className="p-2 border border-gray-300 rounded-md w-1/3"
              />
              <button
                type="button"
                onClick={() => removeVersion(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addVersion} className="text-blue-500">
            + Add Version
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Game Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Game Gallery
          </label>
          <input
            type="file"
            onChange={handleGalleryChange}
            accept="image/*"
            multiple
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Uploading..." : "Upload Game"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Game uploaded successfully!</p>
        )}
      </form>
    </div>
  );
};

export default UploadGameForm;

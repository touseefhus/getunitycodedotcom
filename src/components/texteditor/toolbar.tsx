"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";

const TextEditor: React.FC<{ onSave: (content: string) => void; onClose: () => void }> = ({ onSave, onClose }) => {
    const editor = useEditor({
        extensions: [StarterKit, Bold, BulletList, ListItem, Paragraph],
        content: "",
    });

    const handleSave = () => {
        if (editor) {
            onSave(editor.getHTML());
            onClose();
        }
    };

    if (!editor) return null;





    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Edit Description</h2>
                <div className="mb-4 flex space-x-2">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`px-2 py-1 border rounded ${editor.isActive("bold") ? "bg-gray-200" : ""
                            }`}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`px-2 py-1 border rounded ${editor.isActive("bulletList") ? "bg-gray-200" : ""
                            }`}
                    >
                        Bullet List
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`px-2 py-1 border rounded ${editor.isActive("paragraph") ? "bg-gray-200" : ""
                            }`}
                    >
                        Paragraph
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        className="px-2 py-1 border rounded"
                    >
                        Line Break
                    </button>
                </div>
                <div className="border p-4 rounded-md mb-4">
                    <EditorContent editor={editor} />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;

import { Schema } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // Tambahkan field author
}, {
    timestamps: true, // Ini akan otomatis membuat field createdAt dan updatedAt
});

export default PostSchema;
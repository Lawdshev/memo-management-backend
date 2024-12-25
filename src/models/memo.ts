import mongoose, { Schema, Document } from "mongoose";

export interface IMemo extends Document {
  title: string;
  content: string;
  createdBy: mongoose.Schema.Types.ObjectId; // Reference to User
  tags?: string[]; // Optional tags for categorization
  isPrivate: boolean; // True if memo is private
  createdAt: Date;
  updatedAt: Date;
}

const MemoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String] },
    isPrivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMemo>("Memo", MemoSchema);

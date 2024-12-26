import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMemo extends Document {
  title: string;
  content: string;
  owner: Types.ObjectId; 
  sharedWith?: Types.ObjectId[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isDraft?: boolean;
}

const memoSchema = new Schema<IMemo>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Memo = mongoose.model<IMemo>("Memo", memoSchema);

export default Memo;

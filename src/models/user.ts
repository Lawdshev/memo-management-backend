import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin"; // Role-based access control
  createdAt: Date;
  generateToken:()=>string;
  resetPasswordToken?: string;
  resetPasswordExpires?:Date|number
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
     resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};



export default mongoose.model<IUser>("User", UserSchema);

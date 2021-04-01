import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUserModel extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: { required: true, type: String},
    email: { required: true, type: String , unique: true, lowercase: true},
    password: { required: true, type: String, select: false},
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

userSchema.index({ '$**': 'text' }, { default_language: "portuguese" });

export const userModel: Model<IUserModel> = mongoose.model('User', userSchema);
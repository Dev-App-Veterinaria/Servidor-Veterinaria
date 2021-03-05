import mongoose, { Schema, Document, Model } from 'mongoose';



export interface IArticleModel extends Document {
  _id?: string;
  name: string;
  doi: string;
  citation: string;
  disease: string;
  state: [string];
  url: string;
}

const articleSchema = new Schema(
  {
    name: { required: true, type: String },
    doi: { required: true, type: String },
    citation: { required: true, type: String },
    disease: { required: true, type: String },
    state: { required: true, type: [String] },
    url: {  type: String }
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

articleSchema.index({ '$**': 'text' }, { default_language: "portuguese" });

export const articleModel: Model<IArticleModel> = mongoose.model('Article', articleSchema);
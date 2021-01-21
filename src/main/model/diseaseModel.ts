import mongoose, { Schema, Document, Model } from 'mongoose';



export interface IDiseaseModel extends Document {
  _id?: string;
  name: string;
  etiologicalAgent: string;
  vector: [string];
  lifeCycle: string;
  transmission: string;
  clinicalManifestation: string;
  complications: string;
  distribution: string;
  states: [string];
}

const diseaseSchema = new Schema(
  {
    name: { required: true, type: String },
    etiologicalAgent: { required: true, type: String },
    vector: { required: true, type: [String] },
    lifeCycle: { required: true, type: String },
    transmission: { required: true, type: String },
    clinicalManifestation: { required: true, type: String },
    complications: { required: true, type: String },
    distribution: { required: true, type: String },
    states: { required: true, type: [String] }
  },
  { versionKey: false, timestamps: { createdAt: 'created_at' } },
);

diseaseSchema.index({ '$**': 'text' });

export const diseaseModel: Model<IDiseaseModel> = mongoose.model('Disease', diseaseSchema);
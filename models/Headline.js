import mongoose from "mongoose";

const headlineSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    description: { type: String },
    url: { type: String },
    category: { type: String },
    language: { type: String },
    country: { type: String },
    /* createdAt: {
      type: Date,
      default: Date.now
    } */
  }, {
    timestamps: true // createdAt, updatedAt
    
  }
);

export default mongoose.model("Headline", headlineSchema);
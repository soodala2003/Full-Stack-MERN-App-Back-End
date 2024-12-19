import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
//const Source = mongoose.model("Source", sourceSchema);
//export default Source;
export default mongoose.model("User", userSchema);
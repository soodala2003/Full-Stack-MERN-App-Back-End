import express from "express";
import dotenv from "dotenv";
import db from "./db/conn.js";
import expressLayout from "express-ejs-layouts";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import Technology from "./models/Technology.js";

import userRoutes from "./routes/user.route.js";
import sourceRoutes from "./routes/source.route.js";
import technologyRoutes from "./routes/technology.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const locals = {
    title: "Full Stack MERN App Deployment",
    description: "Build and deploy the back-end of a full-stack MERN application."
  };

  try {
    const technologies = await Technology.find({});
    res.render("home", { locals, technologies });
  } catch (error) {
    console.log(error);
  } 
}); 

app.get("/api/users/create", (req, res) => {
    res.render("user_post");
});

app.get("/api/sources/create", (req, res) => {
    res.render("source_post");
});

app.use("/api/sources", sourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/technologies", technologyRoutes);
//console.log(process.env.ATLAS_URI);

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port: ${PORT}`);
});
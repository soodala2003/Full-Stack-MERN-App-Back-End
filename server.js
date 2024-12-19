import express from "express";
import dotenv from "dotenv";
import db from "./db/conn.js";
import expressLayout from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import Headline from "./models/Headline.js";

//import users from "./routes/user.route.js";
import userRoutes from "./routes/user.route.js";
import sourceRoutes from "./routes/source.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//app.use("/", newsRoutes);

app.get("/", async (req, res) => {
  const locals = {
    title: "Full Stack MERN App Deployment",
    description: "Build and deploy the back-end of a full-stack MERN application."
  };

  try {
    const headlines = await Headline.find({});
    res.render("home", { locals, headlines });
  } catch (error) {
    console.log(error);
  } 
  //res.send("Full Stact MERN App Deployment.");
  //res.render("index", { locals }); 
}); 

app.get("/api/users_post", (req, res) => {
  res.render("index");
});

//app.use("/api/users", users);
app.use("/api/sources", sourceRoutes);
app.use("/api/users", userRoutes);
//console.log(process.env.ATLAS_URI);

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port: ${PORT}`);
});
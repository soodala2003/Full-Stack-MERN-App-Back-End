import express from "express";
import dotenv from "dotenv";
import db from "./db/conn.js";
import expressLayout from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
//import Source from "./models/Source.js";
//import users from "./routes/user.route.js";
import userRoutes from "./routes/user.route.js";

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

app.get("/", (req, res) => {
  const locals = {
    title: "NodeJs",
    description: "Simple page created with NodeJs, Express, and MongoDB."
  };

  res.render("index", { locals });
  //res.send("Full Stact MERN App Deployment.");
});

//app.use("/api/users", users);
app.use("/api/users", userRoutes);
//console.log(process.env.ATLAS_URI);

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port: ${PORT}`);
});
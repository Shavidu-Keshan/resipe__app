import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js"; // Correct import statement
import { recipesRouter } from "./routes/recipes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://shavidu4321:Recipe123App@cluster0.tfsvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));



app.listen(3001, () => {
    console.log("Server Started!");
});



//mongodb+srv://shavidu4321:Recipe123App@cluster0.tfsvv.mongodb.net/
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://shavidu4321:Recipe123App@cluster0.tfsvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection success and error handling
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Start the server
app.listen(3001, () => {
  console.log("Server Started!");
});



//mongodb+srv://shavidu4321:Recipe123App@cluster0.tfsvv.mongodb.net/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require('cors');
const multer = require("multer");
const path = require("path");

dotenv.config();

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
    }
  };
  app.use("/images", express.static(path.join(__dirname, "public/images")))

  connectToMongoDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts" , postRoute);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage});
app.post("/api/upload" , upload.single("file"),(req , res)=>{
  try{
    return res.status(200).json("File uploaded successfully")
  }catch(err){
    console.error(err);
  }
});

app.listen(8800 , ()=>{
    console.log("Backend Server is Running!");
});
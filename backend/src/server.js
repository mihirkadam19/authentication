//import dotenv from 'dotenv'
//dotenv.config()

import express from 'express'
import { connectDB } from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'

// config app   
const app = express();

// env variables
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});


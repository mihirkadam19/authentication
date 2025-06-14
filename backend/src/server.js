import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser'; 

// config app   
const app = express();

// env variables
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());        //  allows us to parse incoming req
app.use(cookieParser());        //  allows us to parse incoming cookies


app.get("/api/health-check", (req, res) => {
    res.send("Healthy");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});


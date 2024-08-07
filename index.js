import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV || "production" === 'production' ? ['https://urlshortener-fullstack.netlify.app/'] : ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Custom URL Shortener");
});

app.use('/url', urlRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/urlShortener", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

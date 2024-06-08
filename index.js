import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { mongoDB_URL,port } from './consfig.js'

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://url-shorthener-mern.netlify.app'] : ['http://localhost:5173'];
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

mongoose.connect(mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

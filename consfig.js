import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoDB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/urlShortener";

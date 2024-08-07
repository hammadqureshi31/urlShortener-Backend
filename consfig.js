import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoDB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/urlShortener";

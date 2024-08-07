import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoDB_URL = process.env.MONGODB_URL || "mongodb+srv://hammadqureshi:Hammad_qureshi-190@cluster0.cjcec1p.mongodb.net/";

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initRoutes } from './src/routes/index.js';
import { dbConnect } from './src/config/dbConnect.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 8800;

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ['POST', 'GET', 'PUT', 'DELETE'],
   }),
);

initRoutes(app);
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
   console.log(`server is running on ${port}`);
});

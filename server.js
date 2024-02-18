import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initRoutes } from './src/routes/index.js';
import { dbConnect } from './src/config/dbConnect.config.js';
import sessionConfig from './src/middlewares/session.js';
import { sessionStoreConnect } from './src/config/sessionStore.config.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 8800;

app.set('trust proxy', 1);

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD'],
   }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

dbConnect();
sessionStoreConnect();
sessionConfig(app);

initRoutes(app);

app.listen(port, () => {
   console.log(`server is running on ${port}`);
});

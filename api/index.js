import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World' });
	// res.end('Hello World');
});

app.get('/hello', (req, res) => {
	res.end('Hello from the hello route');
});


export default app;
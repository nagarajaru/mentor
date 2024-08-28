import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnect } from './db.js';
import { studentRoutes } from './Routers/students.js';
import { mentorRouter } from './Routers/mentor.js';
import { assignRouter } from './Routers/assign.js';

// Initializing the server
const app = express();

// config dotenv
dotenv.config();

const PORT = process.env.PORT ;

// connecting to Data Base
dbConnect();

// middlewares
app.use(express.json());
app.use(cors());

// application router
app.use('/mentor', mentorRouter);
app.use('/student', studentRoutes);
app.use('/assign', assignRouter);



// listening to server
app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:${PORT}`);
})
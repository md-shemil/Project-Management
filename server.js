import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoute.js';
import cors from 'cors';

const app = express();
dotenv.config();
const PORT = process.env.PORT ;

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/task", taskRouter);

app.get("/",(req,res)=>{
    res.send("api is running");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import loginRouter from './routes/loginRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT ;

app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/users", loginRouter);

app.get("/",(req,res)=>{
    res.send("api is running");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
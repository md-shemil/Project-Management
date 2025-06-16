import express from 'express';
import User from '../models/user.js'

const userRouter = express.Router();

userRouter.post('/register',async (req,res)=>{
    try {
        const {name,email,password}= req.body;

        const newUser = new User({
            name,
            email,
            password
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error){
        res.status(400).json({error:error.message});
    }
});
export default userRouter;
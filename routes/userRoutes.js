import express from 'express';
import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'; 


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

userRouter.post('/login', async (req, res)=>{
    const{email, password}= req.body;
    try{
        
        const user = await User.findOne({email});
        if(user && await user.matchPassword(password)){
            res.status(200).json({message:"login successful", user: {name: user.name, email: user.email,token: generateToken(user._id),}});
        }
        else{
            res.status(401).json({error: "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
export default userRouter;
import express from 'express';
import User from '../models/user.js';

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res)=>{
    const{email, password}= req.body;
    try{
        
        const user = await User.findOne({email});
        if(user && await user.matchPassword(password)){
            res.status(200).json({message:"login successful", user: {name: user.name, email: user.email}});
        }
        else{
            res.status(401).json({error: "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default loginRouter;
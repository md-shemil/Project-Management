import express from 'express';
import task from '../models/task.js';
import protect from '../middleware/protect.js';

const taskRouter = express.Router();

taskRouter.post('/add',protect, async (req,res)=>{
    try{
        const {title, deadline, status} = req.body;

        const newTask = new task({
            title,
            deadline,
            status,
            createdBy:req.user._id,
            user: req.user._id // Associate task with the logged-in user
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
});

taskRouter.get('/mytask',protect, async(req,res)=>{
        try{
            const mytask = await task.find({createdBy:req.user._id});
            res.json(mytask);
        }catch(err){
            res.status(500).json({error:err.message});
        }
});
 
export default taskRouter;


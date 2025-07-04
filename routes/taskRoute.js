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

taskRouter.delete('/:id',protect, async(req,res)=>{
        try{
            const deleted = await task.findById(req.params.id);
            if(!deleted){
                return res.status(404).json({ message: 'Task not found' });
            }
            if(deleted.createdBy.toString()!==req.user._id.toString()){
                return res.status(403).json({ message: 'Not authorized to delete this task' });
            }
            await deleted.deleteOne();
            res.json({message:"task deleted successfully "});
        }catch (err) {
    res.status(500).json({ error: err.message });
  }
});

taskRouter.patch('/:id',protect,async (req,res)=>{
    try{
        const taskUpdate = await task.findById(req.params.id);
        if(!taskUpdate){
            return res.status(404).json({message: 'task not found'});

        }
        if(taskUpdate.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Not authorized to update this task'});
        }
        const {title,deadline,status}= req.body;
        if(title !==undefined) taskUpdate.title = title;
        if(deadline !==undefined) taskUpdate.deadline =deadline;
        if(status !== undefined) taskUpdate.status =status;

        const updatedTask = await taskUpdate.save();
        res.json(updatedTask);

    }catch(error){
        res.status(500).json({error:error.message});

    }
});

export default taskRouter;


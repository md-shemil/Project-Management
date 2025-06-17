import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    deadline:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required:true,
        default:'active'
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Must match your User model name
    required: true
  }
});
const task = mongoose.model('task',taskSchema);
export default task;
import mongoose from 'mongoose';
import dontenv from 'dotenv';
dontenv.config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch(error){
        console.error('Mongo db connection error:',error.message);
        process.exit(1);
    }
    
};

export default connectDB;
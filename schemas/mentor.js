import mongoose from 'mongoose';
import { ObjectId } from 'bson';

const mentorSchema = new mongoose.Schema({
    mentor_name:{
        type: String,
        required: true,
        trim: true
    },
    course:{
        type: String,
        required: true,
        trim: true
    },
    student_list:[{
        type: ObjectId,
        ref: 'students'
    }]
})
  

const Mentor = mongoose.model('mentors', mentorSchema );

export { Mentor }
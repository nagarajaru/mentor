import mongoose from 'mongoose';
import { ObjectId } from 'bson';

const studentSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    old_mentors: [{
        type: ObjectId,
        ref: 'mentors'
    }],
    mentor: {
        type: ObjectId,
        ref: 'mentors'
    }
});

const Students = mongoose.model('students', studentSchema );

export { Students }
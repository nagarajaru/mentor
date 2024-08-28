import { Students } from "../schemas/students.js";

// Add new students
export async function addStudents(req){
    const newStu = await new Students({
        ...req.body
    }).save();

    return newStu;
}

// Get all students
export function getAllStudents(){
    return Students.find();
}

// Get students with no mentors
export function getStuWOMent(){
    return Students.find({'mentor': {$exists: false}});
}

// Get old mentors of particulat students
export function getOldMentor(req) {
    return Students.find({
            '_id': req.params.id ,
            'old_mentors.0': {$exists: true}
        })
        .populate('old_mentors')
}
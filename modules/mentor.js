import { Mentor } from "../schemas/mentor.js";


export function addNewMentor(req){
    const newMent = new Mentor({
        ...req.body,
    }).save();

    return newMent;
}

export function getAllMentors(){
    return Mentor.find();
}

export function getStuOfMentor(req){
    return Mentor.find({
        '_id': req.params.id,
        'student_list.0': {$exists: true}
    })
    .populate('student_list');
}
import { Mentor } from "../schemas/mentor.js";
import { Students } from "../schemas/students.js";
import { ObjectId } from 'bson';

export async function assignMentStu(req){
    try{
        const mentorData =  await Mentor.findById( req.body.mentor_id );

        if(!mentorData) return { error: 'error', message: 'Data not found' }

        // Create a Empty student_list Array for Mentor if it's not exist
        if(!mentorData.student_list) mentorData.student_list = [];
    
        let student_id;
    
        // Check if the request has one or more student_Id
        if(Array.isArray( req.body.student_id )){
            // assign multiple student id to array
            student_id = [ ...req.body.student_id ];
        }else{
            // assign one student id to array
            student_id = [ req.body.student_id ]
        }
        
        // check if the Id alreadt exists
        for(let val of student_id){
            if( mentorData.student_list.includes(val) ){
                return {
                    error: 'error',
                    message: 'Student_ID already exist' ,
                    ID: val
                    };
                }
        }
        
        // Assigning the Stuent_ID's to mentor Student_list
        mentorData.student_list.push(...student_id);
        
        await mentorData.save();
    
        student_id.forEach(async (stuID) => {
            const studentData = await Students.findById( stuID );
            
            // Create a Empty Old_mentors Array for Students if it's not exist
            if(!studentData.old_mentors) studentData.old_mentors = [];
            
            // if the mentor exist push them to old mentor
            if(studentData.mentor){
                studentData.old_mentors.push(studentData.mentor);
            }

            // Assigning a new mentor
            studentData.mentor = req.body.mentor_id

            await studentData.save();

            // Remove stuents existing mentor
            for(let oldMentID of studentData.old_mentors){
                const rmMentor = await Mentor.findById(oldMentID);

                if(Array.isArray(rmMentor.student_list) && !rmMentor.student_list.length < 1 ){
                    const inx = rmMentor.student_list.indexOf(stuID);

                    rmMentor.student_list =  rmMentor.student_list.filter((val,ind) => {
                        return ind !== inx;
                    })

                    if(!rmMentor.student_list || rmMentor.student_list.length < 1) rmMentor.student_list = [];
                    await rmMentor.save();
                }
            }
        });

        return {
            message: 'Data added successfully'
        }

    }catch(err){
        console.log(err);
    }  
}









import express from 'express';
import { addNewMentor, getAllMentors, getStuOfMentor } from '../modules/mentor.js';

const router = express.Router();

// Add new Mentor
router.post('/add', async (req, res) => {
    try{
        const newMent = await addNewMentor(req);
        if(!newMent) return res.status(400).json({error: 'Error adding data'});

        res.status(200).json({data: newMent});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
})

// Get all mentors
router.get('/all', async (req, res) => {
    try{
        const allMent = await getAllMentors();
        if(allMent.length < 1) return res.status(404).json({error: 'No data found'});

        res.status(200).json({data:allMent});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
});

// Get students for given mentor name
router.get('/allstudents/:id', async (req, res) => {
    try{
        const stuList = await getStuOfMentor(req);
        if(stuList.length < 1) return res.status(404).json({error: 'No data found'});

        res.status(200).json({data: stuList});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
})

export const mentorRouter = router;
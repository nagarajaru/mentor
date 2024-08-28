import express from 'express';
import { addStudents, getAllStudents, getOldMentor, getStuWOMent } from '../modules/students.js';

const router = express.Router();

// Add new student
router.post('/add', async (req, res) => {
    try{
        const newStu = await addStudents(req);
        if(!newStu) return res.status(400).json({error: 'Error adding data'});

        res.status(200).json({data: newStu});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
});

// Get all student
router.get('/all', async (req, res) => {
    try{
        const allStu = await getAllStudents();
        if(allStu.length < 1) return res.status(404).json({error: 'No data found'});

        res.status(200).json({data: allStu});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
});

// Get student without mentors
router.get('/no-mentors', async (req, res) => {
    try{
        const StuLis = await getStuWOMent();
        if(StuLis.length < 1) return res.status(404).json({error: 'No data found'});

        res.status(200).json({data: StuLis});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
})

// Get old mentors of particulat student
router.get('/oldmentors/:id', async (req, res) => {
    try{

        const oldMent = await getOldMentor(req);
        if(oldMent.length < 1) return res.status(404).json({error: 'No data found'});

        res.status(200).json({data: oldMent});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
})

export const studentRoutes = router;
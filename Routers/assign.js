import express from 'express';
import { assignMentStu } from '../modules/assign.js';

const router = express.Router();

// Select one Student and Assign one Mentor
router.patch('/stu-to-ment', async (req, res) => {
    try{
        const asnStuMent = await assignMentStu(req);
        if(!asnStuMent) return res.status(400).json({error: 'Error adding data'});
        
        if(asnStuMent.error === 'error') return res.status(400).json({log: asnStuMent});

        res.status(200).json({data: asnStuMent});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message: err});
    }
});


export const assignRouter = router;
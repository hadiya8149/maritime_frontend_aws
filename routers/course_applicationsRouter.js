import { Router } from 'express';
import {db} from '../config/dbConnection.js';
import {authenticateJwt} from '../middleware/authMiddleware.js'


const courseApplicationRouter = Router();

//craete course
courseApplicationRouter.post('/apply_for_course', authenticateJwt, async (req,res, next)=>{
    const {std_id, course_id, program_id, AppDate, Status}=req.body
    if(!req.body){
        return res.status(200).json({msg:'req.body undefined'})
    }
    // check if already applied
    const check_previous_course = `select * from applications_for_courses_and_programs where course_id=? AND std_id=?`
    db.query(check_previous_course, [course_id, std_id], (err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length>=1){
                return res.status(409).json("Already Applied")
            }
            else{
                console.log(req.body)
                const sql = `INSERT INTO applications_for_courses_and_programs (std_id, course_id, program_id, AppDate, Status) VALUES(?, ?, ?, ?, ?)`;
                const values = [std_id, course_id, program_id, AppDate, Status]
                db.query(sql,values, (err, result) => {
                    if (err) {
                        console.error('Error executing SQL:', err);
                        res.status(500).json({ error: 'Error inserting data in applicaitons courses and programs' });
                        return;
                    }
                    else{
                        res.status(201).json({
                            success : true,
                            msg: "Program enrolled successfully"
                        });    
                    }
                    console.log(result)
                    
                });
            }
            
        }

    })
    
});

// Get all courses
courseApplicationRouter.get('/all_course_applications',authenticateJwt,  (req, res)=>{
    const sql = `SELECT * FROM applications_for_courses_and_programs WHERE course_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        res.json({
            success : true,
            data : result,
            msg: "Fetch All students data successfully."
        });
    });
});

// Get course by student ID
courseApplicationRouter.get('/course_application_by_std/:id',authenticateJwt,  (req, res)=>{
    const id = req.params.id;
    console.log(id)
    const sql = 'select courses.course_id, courses.course_name from applications_for_courses_and_programs inner join courses on applications_for_courses_and_programs.course_id=courses.course_id where std_id=?;'
    db.query(sql,[id] ,(err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        if (result.length>0){
            res.status(200).json({
                success : true,
                data : result,
                msg: "Fetch All students data successfully."
            });
        }
        else{
            res.status(404).json({data:"no courses found"})
        }
        
    });

});


// Update course application by ID
courseApplicationRouter.put('/course_application/:id',authenticateJwt,  (req, res)=>{

});

// Delete course application by ID
courseApplicationRouter.delete('/course_application/:id',authenticateJwt,  (req, res)=>{

});

export default courseApplicationRouter;

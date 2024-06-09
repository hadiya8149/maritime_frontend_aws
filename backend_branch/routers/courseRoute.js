import { Router } from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import {upload} from '../middleware/upload.js';
import {authenticateJwt} from '../middleware/authMiddleware.js'
import fs from 'fs'
const courseRouter = Router();
//craete course
courseRouter.post('/course', authenticateJwt,createCourse);
// Get all courses
courseRouter.get('/courses', getAllCourses);
courseRouter.get('/view_course/:path', authenticateJwt, async(req, res)=>{
    const path = './public/data/uploads/courses/'+req.params.path;
     if (fs.existsSync(path)){
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res);
     }
     else{
        res.status(500)
        console.log('file not found')
        res.send('file not found')
     }
})
// Get course by ID
courseRouter.get('/course/:id',authenticateJwt, getCourseById);

// Update course by ID
courseRouter.put('/course/:id',upload,authenticateJwt, updateCourse);

// Delete course by ID
courseRouter.delete('/course/:id',authenticateJwt, deleteCourse);

export default courseRouter;

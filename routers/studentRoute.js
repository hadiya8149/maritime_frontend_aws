import express from 'express';
import {authenticateJwt} from '../middleware/authMiddleware.js'
import { createStudent, deleteStudent,getStudentByUserId, getStudentById, getAllStudents, updateStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Create student
studentRouter.post('/create_student',authenticateJwt, createStudent);

// Update student
studentRouter.put('/update_student/:id',authenticateJwt, updateStudent);

// Delete student
studentRouter.delete('/delete_student/:id',authenticateJwt, deleteStudent);

// Get student by ID
studentRouter.get('/student/:id',authenticateJwt, getStudentById);
studentRouter.get('/student_by_user_id/:id',authenticateJwt, getStudentByUserId);

// Get all students
studentRouter.get('/students',authenticateJwt, getAllStudents);

export default studentRouter;

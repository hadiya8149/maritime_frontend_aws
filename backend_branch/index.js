import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import dotenv from 'dotenv';
import serverless from "serverless-http"

import userRoute from './routers/userRoute.js';
import courseRouter from './routers/courseRoute.js';
import courseApplicationRouter from './routers/course_applicationsRouter.js';
import programApplicationRouter from './routers/program_applicationsRouter.js';
import adminRouter from './routers/adminRoute.js';
import jobSeekerRouter from './routers/jobseekerRoute.js';
import jobApplicationRouter from './routers/jobapplicationRoute.js';
import employerRouter from './routers/employerRoutes.js';
import studentRouter from './routers/studentRoute.js';
import jobRouter from './routers/jobRoute.js';
import trainingRouter from './routers/trainingRoute.js';
import messageRouter from './routers/messageRoutes.js';
import notificationRouter from './routers/notificationRoutes.js';
import resumeRoute from './routers/resumeRoutes.js';
import progressRouter from './routers/progressRoute.js';
import { authenticateJwt } from './middleware/authMiddleware.js';
import UnauthorizedRouter from './routers/unauthorized.js';
// Initialize dotenv for environment variables
dotenv.config();
const app = express();
// if (process.env.DEVELOPMENT){
//   const corsOpts = {
//     origin: '*', // Change this to your frontend URL in production
//     credentials: true,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//   };
  
//   // Apply CORS middleware
//   app.use(cors(corsOpts));
  
// }
// CORS options

// Parse request body
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Initialize session and cookie parser middleware
app.use(cookieParser());
app.use(session({
  secret: process.env.JWT_SECRET, // Use environment variable for session secret
  resave: false,
  saveUninitialized: true
}));


// Mount routes
app.use('/api', 
trainingRouter,
courseRouter, 
jobRouter,
adminRouter,
userRoute,
employerRouter,
jobSeekerRouter,
studentRouter,
notificationRouter,
messageRouter,
progressRouter,
jobApplicationRouter,
courseApplicationRouter,
programApplicationRouter,
resumeRoute,
UnauthorizedRouter
)




app.use(express.static('public/data/uploads'))
app.use(function(req, res, next) {
  res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message });
});



// // Start the server

// if(process.env.DEVELOPMENT){
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// }); 

// }
export const handler = serverless(app); 
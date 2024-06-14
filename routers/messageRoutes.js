import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';
import { db } from '../config/dbConnection.js';
const messageRouter = express.Router();
import {authenticateJwt} from '../middleware/authMiddleware.js'
messageRouter.use(authenticateJwt)
// Route to send a message from admin to a user
messageRouter.post('/send_message', sendMessage);
// route to send a message from employer to jobseeker

messageRouter.post('/send_message_to_jobSeeker/:id',async(req, res)=>{
    const {jobseeker_id,body,subject }=req.body
    const sender_id = req.params.id
    console.log(req.body, req.params)
    const sql = 'select user_id from jobseekers where jobSeeker_id=?'
    db.query(sql, [jobseeker_id], (err, result)=>{
        if(!err){ 
            const user_id = result[0].user_id;  
            const sql2 = 'INSERT INTO messages (sender_id, receiver_id, subject, body) VALUES(?,?,?,?)';
            db.query(sql2, [sender_id, user_id, subject, body], (err, result)=>{
                if(!err){
                 console.log(result)
                    res.status(200).json({msg:'msg sent'})
                }
                else{
                    throw err;
                }
            })
        }
    })
    // u need user id of the sender and user id of the receiver 
    // u also need subject body 

})

messageRouter.get('/messages' ,getAllMessages);

messageRouter.get('/sent_message_by_user_id/:id', (req, res)=>{
    const user_id = req.params.id;
    console.log('get message by user id')
//get all messages of a specific user sent and received 
    //    const sql = 'select subject, body, Timestamp , users.email FROM messages LEFT JOIN users on messages.receiver_id = users.user_id WHERE messages.sender_id=? OR messages.receiver_id=?;'
//  get sent messages by user id
    const sql = 'select subject, body, Timestamp , users.email FROM messages LEFT JOIN users on messages.receiver_id = users.user_id WHERE messages.sender_id=?'

    // const sql = 'select subject, body, Timestamp , users.email FROM messages LEFT JOIN users on messages.sender_id = users.user_id WHERE messages.sender_id=? OR messages.receiver_id=?;';
    db.query(sql, [user_id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(200).json({data:result})
        }
    })
})

//get received messages by user id
messageRouter.get('/received_message_by_user_id/:id', (req, res)=>{
    const user_id = req.params.id;
    console.log('get message by user id')
    const sql = 'select subject, body, Timestamp , users.email FROM messages LEFT JOIN users on messages.sender_id = users.user_id WHERE  messages.receiver_id=?;';
    db.query(sql, [user_id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(200).json({data:result})
        }
    })
})
export default messageRouter;

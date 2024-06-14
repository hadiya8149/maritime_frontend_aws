import express from 'express';
import { db } from '../config/dbConnection.js';
import { createNotification, getAllNotifications, sendNotificationToUser } from '../controllers/notificationController.js';
import {authenticateJwt} from '../middleware/authMiddleware.js'

const notificationRouter = express.Router();
notificationRouter.use(authenticateJwt)
// Route to create a notification
notificationRouter.post('/sendnotification', createNotification);

notificationRouter.post('/sendnotificationtouser/:id', sendNotificationToUser);


notificationRouter.get('/notifications' , getAllNotifications);

notificationRouter.get('/notification_by_user_id/:id', async(req, res)=>{
    const user_id = req.params.id;
    const sql = 'select * from notifications where user_id=?';
    await db.query(sql, [user_id], (err, result)=>{
        if(!err){
            console.log(result)
            res.status(200).json(result)
        }
    })
})
notificationRouter.put('/update_notification/:id',async(req, res)=>{
    const notificationid=(req.params.id)
    console.log(notificationid)
    const sql = `UPDATE notifications set IsRead=${1} where notification_id=${notificationid}`
    db.query(sql, [1,notificationid],(err, result)=>{
        console.log(sql)
        if(err){
            console.log(err)
        }
        else{
            res.status(200)
            console.log(result)
        }
    })
})

export default notificationRouter;

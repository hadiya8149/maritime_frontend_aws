import { Router } from 'express';
import { createUser, getUserById, updateUser, deleteUser, logout } from '../controllers/userController.js';
import { check } from 'express-validator';
import { authenticateJwt } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { db } from "../config/dbConnection.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

const secretkey = process.env.JWT_SECRET
const userRouter = Router();

const saltRounds = 10;
userRouter.post('/create_user', createUser);

userRouter.post('/login', async (req, res) => {
    const email = req.body.email;

    const pass = req.body.password;
    console.log(email, pass);

    const sql = 'SELECT * FROM users WHERE email= ?';
    await db.query(sql, [email], (err, result) => {
        if (err) {

            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (result.length < 1) {
            return res.status(404).json({ message: 'User not found' });
        }
        else {
            bcrypt.compare(req.body.password, result[0].password, function (err, compare_result) {
                if (err) {
                    throw err;
                }
                if (compare_result) {
                    const payload = {
                        email: result[0].email,
                        password: result[0].password,
                        username: result[0].username,
                        role: result[0].role,
                        user_id: result[0].user_id,


                    }
                    const token = jwt.sign(payload, secretkey, { expiresIn: '6h' })

                    jwt.verify(token, secretkey, function (err, decoded) {
                        if (err) {
                            throw err;
                        }


                        return res.status(200).json(({ user_role: result[0].role, user_id: result[0].user_id, token: token, username: result[0].username }))


                    })
                } else {
                    // response is OutgoingMessage object that server response http request

                    return res.status(401).json({ success: false, message: 'passwords do not match' });
                }
            });
        }
    });



    }) 



// Assume this is your login route handler
// userRouter.post('/login' ,isAdmin , loginUser);

userRouter.get('/user/:id', authenticateJwt, getUserById);


// PUT /api/user/:userId
userRouter.put('/update_user/:id', authenticateJwt, updateUser);

// DELETE /api/user/:userId
// userRouter.delete('/delete_user/:userId', authenticateJwt,  deleteUser);
userRouter.delete('/delete_user/:userId', authenticateJwt, deleteUser);


userRouter.post('/logout', authenticateJwt, logout);
userRouter.post('/send_reset_link', async(req, res)=>{
    const {email}=req.body
    console.log(email)
    const payload = {
        email:email
    }
    const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })


    
    const transporter = nodemailer.createTransport({
        service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "hadiya8149@gmail.com",
        pass: "omry rftx eygx sqor",
      },
    }); 
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Maritime Education & Job Portal System " <hadiya8149@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "", // plain text body
        html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:3000/reset_password/?token=${token}">http://localhost:3000/reset_password/${token}</a>
    <p>The link will expire in 1 hour</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }
    
    main().catch(console.error);
    res.status(200)
})

userRouter.put('/update_password', authenticateJwt, async(req, res)=>{

    const {email, password}=req.body
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const sql = `UPDATE users  set password = '${encryptedPassword}' where email='${email}'`;
    db.query(sql, [encryptedPassword, email], (err, result)=>{
        if(err){
            console.log(err)
            res.status(400)
        }
        else{
            console.log(result)
            res.status(200)
        }
    })
}
)


export default userRouter;

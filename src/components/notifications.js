import { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../utils.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import qs from 'qs'
export default function AdminNotifications(){
    const [notificationForm, setNotificationForm]=useState({
      content:"",
      user_id:""
    })

    const [notifications, setNotifications]=useState([])
    const token = localStorage.getItem('authToken')
    const myHeaders = new Headers()

    useEffect(()=>{
     myHeaders.append('Authorization', `Bearer ${token}`)
 
    })
    function handleFormChange(e){
      const { name, value } = e.target;
      setNotificationForm(prevData => ({
          ...prevData, [name]: value
      }))
  }
  async function createNotification(){
    let data = qs.stringify({
      'content': notificationForm.content,
      'user_id': notificationForm.user_id 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://mbuig2i6bdtonzsxfxbuohmvxq0esskf.lambda-url.ap-southeast-2.on.aws/api/sendnotification',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphcmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUjd4OXZrWExxcG1hai9SRndjSHJSdXRqVWpFTTluMzlpVmpXckY4YVRQa0hORW9ESlpnY1MiLCJ1c2VybmFtZSI6IlphcmEiLCJyb2xlIjoiZW1wbG95ZXIiLCJ1c2VyX2lkIjo0LCJpYXQiOjE3MTgwOTIwODgsImV4cCI6MTcxODExMzY4OH0.gb4hfuErY8uBG5h7N2Ki0faJlkVjhgwZmp-xRXi3rmI', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'connect.sid=s%3AzQGTVLYvxEhspYm8B8k6HBvQFNignxfI.yntLFQLUXwFuvd02ZQO31XtYUER6W7YRsheZQ98smUU'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
    async function getNotifications(){
      const response = await axios.get(`${API_URL}/notifications`, {headers:myHeaders});
      if(response.status===200){
      setNotifications(response.data.Data)
      }
    }
    useEffect(()=>{
      getNotifications()
    },[])
   
    return(
        <div  style={{minHeight:'100vh'}}>
        
        <div>
        <ToastContainer/>

<div className='d-flex' style={{background:'rgb(241, 243, 247)', height:'100',width:'75%' ,margin:'auto',padding:'16px', paddingTop:'5px', color:'black'}}>
<h4 className='w-75 mt-4 ml-5'>Notifications</h4>
<form className="row gx-3 gy-2 align-items-center   w-100" onSubmit={createNotification} style={{boxShadow:'none', background:'none'}}>
  <div className="col-4">
    <textarea type="text" onChange={handleFormChange}  style={{height:'50px', padding:'5px'}} id="content" name='content' placeholder="Content" required />
  </div>
  <div className="col-4">
    <div className="input-group">
      <input type="number" onChange={handleFormChange} style={{height:'50px', padding:'5px'}} id="user_id" name="user_id" placeholder="user id " required />
    </div>
  </div>

  
  <div className="col-auto">
    <button type="submit" style={{height:'50px', background:'#2b74b0',borderRadius:'8px', color:'white' ,border:'none', boxShadow: '4px 4px #f1f3f7'}}>+ Create notification</button>
  </div>
</form>
</div>
<div className='text-left' style={{paddingLeft:'25px',paddingRight:'25px',paddingTop:'25px',marginTop:'3%',marginLeft:'auto', marginRight:'auto', width:'75%'}}>
<div  className='mb-3'>

</div>
<table className='table'>
    <thead>
      <tr>
        <th>Notification id</th>
        <th>Content</th>
        <th>user id</th>
        </tr>
    </thead>
    <tbody>
      {notifications && notifications.map((notification)=>{
        return(
          <tr key={notification.notification_id}>
            <td>{notification.notification_id}</td>
            <td>{notification.content}</td>
            <td>{notification.user_id}</td>
          </tr>
        )
      })}

    </tbody>
</table>
</div>
        </div>
        </div>
    )
}
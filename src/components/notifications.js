import AdminNavbar from './admin_navbar.js'
import { useEffect, useState } from 'react'
import axios from 'axios';
export default function AdminNotifications(){
    const [notificationForm, setNotificationForm]=useState({
      content:"",
      user_id:""
    })
    const [notifications, setNotifications]=useState([])
    function handleFormChange(e){
      const { name, value } = e.target;
      setNotificationForm(prevData => ({
          ...prevData, [name]: value
      }))
  }
  async function createNotification(){
    const response = await axios.post("https://maritime-backend.vercel.app/api/sendnotification", {body:notificationForm})
    if(response.status===200){
      alert("notification created successfully")
    }
  }
    async function getNotifications(){
      const response = await axios.get('https://maritime-backend.vercel.app/api/notifications');
      if(response.status===200){
      setNotifications(response.data.data)
      }
    }
    useEffect(()=>{
      getNotifications()
    },[])
   
    return(
        <div >
        <AdminNavbar/>
        <div>
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
      {notifications.map((notification)=>{
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
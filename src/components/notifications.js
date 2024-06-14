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
    const role = localStorage.getItem('role')
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
      url: `${API_URL}/sendnotification`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
        'Content-Type': 'application/x-www-form-urlencoded', 
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

<div className='' style={{background:'rgb(241, 243, 247)', height:'100' ,margin:'auto',padding:'16px', paddingTop:'5px', color:'black'}}>
<div className='w-75 m-auto '>
<h4 className='mt-4 ml-5 text-center'>Notifications</h4>


<div className="modal fade" id="createNotificationModal" tabIndex="-1" aria-labelledby="createNotificationModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="createNotificationModalLabel">Send Notification</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <form className="align-items-center   w-100" onSubmit={createNotification} style={{boxShadow:'none', background:'none'}}>
<div className="col-3 mb-3">
    <div className="text-left">
      <input type="number" onChange={handleFormChange} style={{height:'50px', padding:'5px'}} id="user_id" name="user_id" placeholder="user id " required />
    </div>
  </div>
  <div className="col-md-8">
    <textarea type="text" onChange={handleFormChange} className='form-control' style={{height:'100px', padding:'5px'}} id="content" name='content' placeholder="Content" required />
    <div className='text-left'>
    <button type="submit" style={{height:'50px',width:'100px',marginTop:'15px', background:'#2b74b0',borderRadius:'8px', color:'white' ,border:'none', boxShadow: '4px 4px #f1f3f7'}}>Send</button>

    </div>

  </div>


  

</form>
                  </div>
                </div>
              </div>
            </div>
</div>
</div>
<div className='text-left' style={{paddingLeft:'25px',paddingRight:'25px',paddingTop:'25px',marginTop:'3%',marginLeft:'auto', marginRight:'auto', width:'75%'}}>
<div  className='mb-3'>
<a  className='btn btn-primary text-center' href="#createNotificationModal" data-bs-toggle="modal" data-target="#createNotificationModal" style={{height:'50px',marginTop:'15px', background:'#2b74b0',borderRadius:'8px', color:'white' ,border:'none', boxShadow: '4px 4px #f1f3f7'}}>+ Create notification</a>

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
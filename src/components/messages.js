import AdminNavbar from './admin_navbar.js'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../utils.js';
export default function AdminMessages(){
  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()

  useEffect(()=>{
   myHeaders.append('authentication', `Bearer ${token}`)

  })
  const user_id = localStorage.getItem("user_id")
    const [messageForm, setMessageForm]=useState({
      content:"",
      user_id:""
    })
    const [messages, setMessages]=useState([])
    const [msgForm , setMsgForm]=useState([])
    function handleFormChange(e){
      const { name, value } = e.target;
      setMessageForm(prevData => ({
          ...prevData, [name]: value
      }))
  }
  // async function send(){
  //   const response = await axios.post("https://maritime-backend.vercel.app/api/sendnotification", {body:notificationForm})
  //   if(response.status===200){
  //     alert("notification created successfully")
  //   }
  // }
    async function getMessages(){
      const response = await axios.get(`${API_URL}/message_by_user_id/`+user_id, {headers:myHeaders});
      if(response.status===200){
      console.log(response)
        setMessages(response.data)
      }
    }
    function handleMsgChange(e){
    
      const { name, value } = e.target;
      setMsgForm(prevData => ({
          ...prevData, [name]: value
      }))
      console.log(msgForm)
    }
    async function submitMessage(id){
      const receiverID = msgForm.user_id
      const response = await axios.post(`${API_URL}/send_message`, {
        sender_id:user_id,
        subject:msgForm.subject,
        body:msgForm.body,
        receiver_id:receiverID,
        Timestamp:new Date().toISOString().slice(0,19).replace('T', ' ')
      }, {headers:myHeaders})
      console.log(response)
  
    }
    useEffect(()=>{
      getMessages()
    },[])

    return(
        <div>
        <AdminNavbar/>
        <div>
          
<h4 className='mt-4 ml-5 text-center'>Messages</h4>


<div className='text-left' style={{paddingLeft:'25px',paddingRight:'25px',paddingTop:'25px',marginTop:'3%',marginLeft:'50px', marginRight:'50px', }}>
<div  className='mb-3'>

</div>
<div className='d-flex w-100'>

<table className='table  mr-3'>
    <thead>
      <tr>
        <th>Sender Name</th>
        <th>Subject</th>
        <th>Message</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
      {messages.length===0 ?<h4>No messages</h4>:( messages.map((message)=>(
          <tr key={message.message_id}>
            <td>{message.email}</td>
            <td>{message.subject}</td>
            <td>{message.body}</td>
            <td><h6>{message.Timestamp.slice(0,19).replace('T', ' ')}</h6></td>
          </tr>
        ))
     )} 
    </tbody>
</table>
<form className="row gx-3 gy-2 align-items-center mb-10  w-75" onSubmit={submitMessage}  >
<input type="number" onChange={handleMsgChange} style={{height:'50px', padding:'5px'}} id="user_id" name="user_id" placeholder="user id " required />
  
    <input type='text' name='subject' id='subject' onChange={handleMsgChange} placeholder='Subject'></input>
    <textarea type="text" onChange={handleMsgChange}  style={{height:'200px', padding:'5px'}} id="body" name='body' placeholder="body" required />

  
  <div className="col-auto">
    <button type="submit"  className='btn btn-primary'>Send</button>
  </div>
</form >
</div>
</div>
        </div>
        <div className='mb-3'></div>
        </div>
    )
}
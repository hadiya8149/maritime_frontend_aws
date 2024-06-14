import { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../utils.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

export default function AdminMessages(){

  const token = localStorage.getItem('authToken')
  const myHeaders = new Headers()

  useEffect(()=>{
    myHeaders.append('Authorization', `Bearer ${token}`)

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
  
    async function getMessages(){
      let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `${API_URL}/sent_message_by_user_id/${user_id}`,
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('authToken')}`
        }
      };
    
      axios.request(config)
      .then((response) => {
        if(response.status===200){
          setMessages(response.data.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    function handleMsgChange(e){
    
      const { name, value } = e.target;
      setMsgForm(prevData => ({
          ...prevData, [name]: value
      }))
      console.log(msgForm)
    }
    async function submitMessage(id){
      console.log(msgForm)
      const receiverID = msgForm.user_id
      const response = await axios.post(`${API_URL}/send_message`, {
        sender_id:user_id,
        subject:msgForm.subject,
        body:msgForm.body,
        receiver_id:receiverID,
        Timestamp:new Date().toISOString().slice(0,19).replace('T', ' ')
      }, {headers:{'Authorization': `Bearer ${token}`}})
      console.log(response)
  
    }
    useEffect(()=>{
      getMessages()
    },[])

    return(
        <div className='container m-auto' style={{minHeight:'100vh'}}>
  
<h4 className='mt-4 ml-5 text-center'>Sent Messages</h4>


<div className='w-100 '>
<div className='overflow-auto' style={{height:'400px', margin:'auto'}}>
<table className='table '>
    <thead>
      <tr>
        <th>To</th>
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
</div>
<div className='m-auto'>
  <div className='card' style={{borderRadius: '0px',
    border:'none',    boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
    <div className='card-title  bg-light' style={{textAlign:'left', padding:'8px', color:'black'}}>New Message</div>
  <form className="row gx-3 gy-2 align-items-center m-auto  w-100" onSubmit={submitMessage}  >
<input type="number" className='form-control' onChange={handleMsgChange} style={{height:'50px', padding:'5px'}} id="user_id" name="user_id" placeholder="user id " required />
  
    <input type='text'  className='form-control'  name='subject' id='subject' onChange={handleMsgChange} placeholder='Subject'></input>
    <textarea type="text"  className='form-control overflow-auto'  onChange={handleMsgChange}  style={{height:'200px', padding:'5px'}} id="body" name='body' placeholder="body" required />

  
  <div className="col-auto">
    <button type="submit"  className='btn btn-primary mb-3'>Send</button>
  </div>
</form >
  </div>

</div>

        <ToastContainer/>
        </div>
        </div>
    
    )
}

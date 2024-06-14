import { useState } from "react"
import '../css/login.css'

import axios from 'axios'
import { API_URL } from "../utils"
export default function ResetLink(){
  const [email, setEmail] = useState('')
  function handleEmail(val) {
    setEmail(val.target.value)
  }
  async function handleSubmit(){
    let data = {
        email:email
    }
    axios.post(`${API_URL}/send_reset_link`,data )
  }
    return(
        <div className="d-flex align-items-center justify-content-center " id='bannerImage' style={{minHeight:'100vh', width:'100%'}}>
            
<div>
<div className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' , height:'400px', width:'600px'}}>
            <h1 id="form-heading" style={{ textAlign: 'center', marginTop: '10%' }}>Reset Password</h1>

            <form id='loginForm' className='m-auto w-75 text-center' onSubmit={handleSubmit} style={{backgroundColor:'none'}} >
              <div className="mb-3">
                <input placeholder='Enter email' type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={handleEmail} />
              </div>
           
              <div className="mb-3 ">
                <br />
              </div>


              <button type="submit" className="btn btn-primary"  >Submit</button>
            

            </form>
          </div>
</div>
        </div>
    )
}
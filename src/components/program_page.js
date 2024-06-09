import {useEffect, useState} from 'react'

import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { API_URL } from '../utils'

export default function ProgramInfo(){
  const [program, setProgram]=useState()
  const{id}=useParams();
  async function getProgramInfo(){
    const response = await axios.get(`${API_URL}/program/`+id)
    console.log(response.data.data)
    setProgram(response.data.data)
  }
  const stdID = localStorage.getItem('std_id')
  async function createProgress(data){
    const body={
      std_id: stdID,
      ProgramID: data.program_id,
      ProgramID: null,
      ProgressPercentage:100,
      CompletionStatus:'Completed',
      LastUpdatedDate:new Date().toISOString().slice(0,19).replace('T', ' ')

    }
    console.log(data)
    const response = await axios.post(`${API_URL}/progress`, body)
    console.log(response)
    if(response.status===200){
      alert("Congratulations on completing the program")
    }
  }
  useEffect(()=>{
    console.log(id)
    getProgramInfo()
  }, [])
    return(      
        <div className="container " style={{marginTop:'10%'}}>
          <div className="">
            {program && program.map((programDetail)=>{
              return(
                <div key={programDetail.program_id}>
<h3>{programDetail.program_name}</h3>

<p>{programDetail.description}</p>
  <h4>Instructor: {programDetail.instructor}</h4>

{/* <h4>
    What you'll learn
</h4>
<ul>
    <li>Handfl</li>
    <li>Handfl</li>
    <li>Handfl</li>
    <li>Handfl</li>

</ul> */}

<h5>System Requirements</h5>
<ul className='text-left'>
  <li>Internet access - users will need a device with a web browser and internet connection
  </li>
  <li>
  System - runs on computers, tablets and mobile devices using Windows 7 and above and MAC OS devices running IOS 11 and above

  </li>
  <li>
  Browsers - Edge, Chrome, Firefox and Safari
  </li>
  <li>
  Minimum browser size - none
  </li>
  <li>
  Audio - requires device speaker or headphones

  </li>
</ul>

<div style={{marginBottom:'5%'}}>
  Program Content
  <iframe src={'http://localhost:8000/'+programDetail.content} style={{width:"100%", height:"700px"}} >

  </iframe>
  <button onClick={(e)=>{createProgress(programDetail)}} className='btn btn-primary'>Mark as completed</button>

  </div>
</div>
              )
            })}

</div>
  </div>
    )
}
import Navbar from "./navbar"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading(){

    return(
        <>
           <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box> 
        <div className="d-flex align-items-center" style={{minHeight:'100vh'}}>
           <div className="m-auto">
            
              
        <h1 style={{color:'black'}}>Loading ...</h1>
            
           </div>
        </div>
        </>
    )
}
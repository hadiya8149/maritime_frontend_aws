import { useNavigate } from "react-router-dom"
export default function PageNotFound(){
const navigate = useNavigate()
    return(
        <div className="d-flex align-items-center" style={{minHeight:'70vh'}}>
           <div className="m-auto">
            
           <h1>404, Page not found</h1>
            <div>
                <button onClick={() => navigate(-1)} className="btn btn-primary">Go back</button>
            </div>
           </div>
        </div>
    )
}
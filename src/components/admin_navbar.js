
export default function AdminNavbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary " style={{marginTop:'5%'}}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/admin">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/employers_list">Employers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/students_list">Students</a>
              </li>
              <li className='nav-item'>
                                      <a className="nav-link" href="/admin_notifications" >
                                          Notifications
                                      </a>
                                      </li>     
<li className='nav-item'>                                     
                                     <a className="nav-link " href="/messages_page">Inbox</a>
                                     </li>                               
                                 <li className="nav-item"><a className="nav-link " href="/manage_jobs">Jobs</a></li>
                                  <li className="nav-item "><a className="nav-link" href="/programs&courses_management">Courses & Programs </a></li>
                                     
            </ul>
          </div>
        </div>
      </nav>
    )
}
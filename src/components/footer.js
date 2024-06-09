import '../css/footer.css'
export default function Footer(){
    return (
        <footer className="py-5 p-5 footer-bg">
        <div className="row">
          <div className="col-2">
            <h5>Job Portal</h5>  
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/jobs" className="nav-link p-0 text-muted">Search Jobs</a></li>
              <li className="nav-item mb-2"><a href="/jobseeker" className="nav-link p-0 text-muted">Candidates</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
            </ul>
          </div>
    
          <div className="col-2">
            <h5>Management</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Employers</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">JobSeekers</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Admin</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
            </ul>
          </div>
    
          <div className="col-2">
            <h5>Education</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
              <li className="nav-item mb-2"><a href="/signup" className="nav-link p-0 text-muted">signup</a></li>
              <li className="nav-item mb-2"><a href="/login" className="nav-link p-0 text-muted">Student login</a></li>
              <li className="nav-item mb-2"><a href="/courses_list" className="nav-link p-0 text-muted">Our Courses</a></li>
              <li className="nav-item mb-2"><a href="/programs" className="nav-link p-0 text-muted">Our Training programs</a></li>
    
            </ul>
          </div>
    
          <div className="col-4 offset-1">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
    
    
      </footer>
    )
}
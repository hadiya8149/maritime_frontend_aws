import seaImage from '../assets/sea.jpg'
import '../css/home.css'
import React from 'react'
import passion from '../assets/img/illustrations/passion.png'
import joinImage from '../assets/img/illustrations/come-on-join.png'
import feature from '../assets/img/clients.jpg'
import jobImage from '../assets/img/illustrations/jobs.png'
import image3 from '../assets/img/illustrations/job-search-illustration.jpg'
export default function Home(){
  
return (
    <main className="main" 
    >
      <section className="py-0 mt-5" id="home">
                <img alt='background  of sea' loading="lazy" className='mb-0' decoding="async" width="100%" height="467" src={seaImage} sizes="(max-width: 1280px) 100vw, 1280px"></img>
        
        <div className="container" >
          <div className="row  ">
            <div className="col-md-7 col-lg-6  text-sm-start text-center">
              <h1 className=" mb-sm-4 display-2 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-8">Find your job better <br className="d-block d-lg-none d-xl-block" />and faster</h1>
              <p className="mb-4 fs-1">Find your best job better and faster with Jobest</p>
              <div className="pt-3">
                <form>
                  <div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center">
                    <input className="form-control rounded-pill shadow-lg border-0" id="formGroupExampleInput" type="text" placeholder="Seacrh by skill, company and job" /><img className="input-box-icon me-2" src="assets/img/illustrations/search.png" width="30" alt="" />
                  </div>
                </form>
              </div>
            </div>
            <div className='col-md-5 col-lg-6 text-sm-start text-center' id="home-banner-1">
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="bg-holder"  >
        </div>

        <div className="container">
          <div className="row flex-center">
            <div className="col-md-5 order-md-0 text-center text-md-start"><img className="img-fluid mb-4" src={passion} width="450" alt="passion" /></div>
            <div className="col-md-5 text-center text-md-start">
              <h6 className="fw-bold fs-2 fs-lg-3 display-3 lh-sm">Find your passion and<br />achieve success</h6>
              <p className="my-4 pe-xl-8"> find a job that suits your interests and talents. A high salary is not the top priority. Most importantly,You can work according to your heart's desire.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-0" >

        <div className="container">


          <section className="py-8">

            <div className="container">
              <div className="row flex-center">
                <div className="col-md-5 order-md-1 text-center text-md-end"><img className="img-fluid mb-4" src={jobImage} width="450" alt="" /></div>
                <div className="col-md-5 text-center text-md-start">
                  <h6 className="fw-bold fs-2 fs-lg-3 display-3 lh-sm">Million of jobs, finds <br /> the one thats rights for you</h6>
                  <p className="my-4 pe-xl-8">Get your dream job by applying at Maritime.</p>
                </div>
              </div>
            </div>

          </section>


        </div>

      </section>


      <section className="py-5">
        <div id="browseJobCategory"  >

        <div className="container" >
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-6 text-center mb-3">
              <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3 mt-5" >Browse jobs by category</h5>
              <p className="mb-5">Choose from the list of most popular categories</p>
            </div>
          </div>
          <div className="row flex-center h-100">
            <div className="col-10 col-xl-9">
              <div className="row">
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/finance.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Accounting</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/design.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Design/Creative</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/programmer.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Programmer</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/production.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Production</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/education.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Education</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 pb-lg-6 px-lg-4 pb-4">
                  <div className="card py-4 shadow-sm h-100 hover-top">
                    <div className="text-center"> <img src="assets/img/illustrations/consultancy.png" height="120" alt="" />
                      <div className="card-body px-2">
                        <h6 className="fw-bold fs-1 heading-color">Consultancy</h6>
                        <p className="mb-0 card-text">100 open position</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="py-8">

        <div className="container">
          <div className="row flex-center">
            <div className="col-md-5 order-md-1 text-center text-md-end"><img className="img-fluid mb-4" src={feature} width="450" alt="" /></div>
            <div className="col-md-5 text-center text-md-start">
              <h6 className="fw-bold fs-2 fs-lg-3 display-3 lh-sm">Connect with Top Maritime Employers</h6>
              <p className="my-4 pe-xl-8"> Find your dream job at sea with our extensive network of leading maritime companies.
</p>
            </div>
          </div>
        </div>

      </section>


      <section className="py-0">
        <img src={joinImage} className='w-100'></img>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <h6 className="fw-bold fs-3 fs-lg-5 lh-sm">Come on, join with us !</h6>
              <p>Create an account and refer your friend </p>
            </div>
          </div>
        </div>
      </section>
      

    </main>
)
}
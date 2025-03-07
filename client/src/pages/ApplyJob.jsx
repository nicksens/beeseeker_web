import React, { useContext, useEffect, useState } from 'react'  
import { AppContext } from '../context/AppContext'  
import { useParams } from 'react-router-dom'  
import { assets, jobsData } from '../assets/assets'  
import Loading from '../components/Loading'  
import Navbar from '../components/Navbar'  
import kconvert from 'k-convert';  
import moment from 'moment';  
import JobCard from '../components/JobCard'  
import Footer from '../components/Footer'

const ApplyJob = () => {  
  const { id } = useParams()  
  const [jobData, setJobData] = useState(null)  

  const { jobs } = useContext(AppContext)  
  
  const fetchJob = async () => {  
    const data = jobs.filter(job => job._id === id)  
    if (data.length !== 0) {  
      setJobData(data[0])  
      console.log(data[0])  
    }  
  }  

  useEffect(() => {  
    if (jobs.length > 0) {  
      fetchJob()   
    }  
   
  }, [id, jobs])  

  return jobData ? (  
    <>  
    <Navbar />  

    <div className='min-h-screen bg-gray-50 flex flex-col px-4 md:px-8 py-10 container 2xl:px-20 mx-auto'>  
      <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full'>   
        {/* Header Section */}  
        <div className='flex flex-col md:flex-row justify-between items-center p-6 md:p-8 bg-sky-50 border-b border-blue-200'>   
          <div className='flex items-center space-x-4 mb-4 md:mb-0'>  
            <img   
              className='h-20 w-20 object-contain bg-white rounded-lg p-2 border shadow-sm'   
              src={jobData.companyId.image}   
              alt={`${jobData.companyId.name} logo`}   
            />  
            <div>  
              <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{jobData.title}</h1>  
              <div className='flex flex-wrap items-center space-x-4 text-gray-600 mt-2'>  
                <span className='flex items-center space-x-1'>  
                  <img src={assets.suitcase_icon} alt="" className='w-4 h-4'/>  
                  <span>{jobData.companyId.name}</span>  
                </span>  
                <span className='flex items-center space-x-1'>  
                  <img src={assets.location_icon} alt="" className='w-4 h-4'/>  
                  <span>{jobData.location}</span>  
                </span>  
                <span className='flex items-center space-x-1'>  
                  <img src={assets.person_icon} alt="" className='w-4 h-4'/>  
                  <span>{jobData.level}</span>  
                </span>  
                <span className='flex items-center space-x-1'>  
                  <img src={assets.money_icon} alt="" className='w-4 h-4'/>  
                  <span>CTC: {kconvert.convertTo(jobData.salary)}</span>  
                </span>  
              </div>  
            </div>  
          </div>  

          <div className='flex flex-col items-center md:items-end'>  
            <button className='bg-blue-600 hover:bg-blue-700 transition-colors p-2.5 px-6 text-white rounded-md mb-2 shadow-md'>  
              Apply Now  
            </button>  
            <p className='text-sm text-gray-500'>  
              Posted {moment(jobData.date).fromNow()}  
            </p>  
          </div>  
        </div>  

        {/* Content Section */}  
        <div className='flex flex-col lg:flex-row p-6 md:p-8 gap-8'>  
          {/* Left Section - Description */}  
          <div className='w-full lg:w-2/3'>   
            <h2 className='font-bold text-2xl mb-4'>Description</h2>  
            <div className='rich-text' dangerouslySetInnerHTML={{__html: jobData.description}}></div>  
            <button className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>Apply Now</button>  
          </div>  
          
          {/* Right Section - More Scholarships */}  
          <div className='w-full lg:w-1/3'>  
            <h2 className='text-xl font-bold text-gray-800 mb-4'>  
              More Scholarships from {jobData.companyId.name}  
            </h2>  
            <div className='space-y-4'>  
              {jobs  
                .filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)  
                .slice(0, 4)  
                .map((job, index) => (  
                  <JobCard key={index} job={job}/>  
                ))  
              }  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
    <Footer />

    </>  
  ) : (  
    <Loading />  
  )  
}  

export default ApplyJob  
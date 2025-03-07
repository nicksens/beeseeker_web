import React, { useEffect, useRef, useState } from 'react'  
import Quill from 'quill';  
import { JobCategories, JobLocations } from '../assets/assets';  


const AddJob = () => {  
    const [title, setTitle] = useState('');  
    const [location, setLocation] = useState('Bangalore')  
    const [category, setCategory] = useState('Programming')  
    const [level, setLevel] = useState('Beginner Level');  
    const [salary, setSalary] = useState(0);  

   

    const editorRef = useRef(null)  
    const quillRef = useRef(null)  

    useEffect(()=>{  
        // initiate quill once  
        if (!quillRef.current && editorRef.current) {  
            quillRef.current = new Quill(editorRef.current, {  
                theme: 'snow',  
            })  
        }  
    }, [])  

  return (  
    <form className='container p-4 flex flex-col w-full items-start gap-3'>  
        <div className='w-full'>  
            <p className='mb-2'>Title</p>  
            <input   
                type="text"   
                placeholder='Type here'  
                onChange={e=>setTitle(e.target.value)}   
                value={title}  
                required  
                className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
            />  
        </div>  

        <div className='w-full max-w-lg'>  
            <p className='my-2'>Description</p>  
            <div ref={editorRef}></div>  
        </div>  

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>  
            <div>  
                <p className='mb-2'>Category</p>  
                <select  
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded' 
                    onChange={e => setCategory(e.target.value)}  
                    value={category}  
                >  
                    {JobCategories.map((category, index) => (  
                        <option key={index} value={category}>  
                            {category}  
                        </option>  
                    ))}  
                </select>  
            </div>  

            <div>  
                <p className='mb-2'>Location</p>  
                <select   
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded' 
                    onChange={e => setLocation(e.target.value)}  
                    value={location}  
                >  
                    {JobLocations.map((location, index) => (  
                        <option key={index} value={location}>  
                            {location}  
                        </option>  
                    ))}  
                </select>  
            </div> 

            <div>  
                <p className='mb-2'>Level</p>  
                <select 
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded'   
                    onChange={e => setLevel(e.target.value)}  
                    value={level}  
                >  
                    <option value="Beginner level">Beginner Level (&lt;= SMA)</option>  
                    <option value="Intermediate level">Intermediate Level (D1-D3)</option>  
                    <option value="Advanced level">Advanced Level (&gt;= S1)</option>  
                    
                </select>  
            </div> 


        </div>  

        <div>  
            <p className='mb-2'>Scholarship Amount (IDR)</p>  
            <div className="flex items-center">  
                <input   
                    type="number"   
                    min={0}  
                    className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[200px]'   
                    value={salary}  
                    onChange={(e) => setSalary(e.target.value)}  
                />  
                <div className="flex flex-col ml-2">  
                    <button   
                        onClick={() => setSalary(prev => Math.max(0, (Number(prev) || 0) + 250000))}  
                        className="border p-1 text-xs h-4 w-4 flex items-center justify-center"  
                    >  
                        ▲  
                    </button>  
                    <button   
                        onClick={() => setSalary(prev => Math.max(0, (Number(prev) || 0) - 250000))}  
                        className="border p-1 text-xs h-4 w-4 flex items-center justify-center"  
                    >  
                        ▼  
                    </button>  
                </div>  
            </div>  
        </div>  
        <button className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>  
  )  
}  

export default AddJob  
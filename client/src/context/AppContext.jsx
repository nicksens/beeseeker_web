import { createContext, useEffect, useState } from "react";  
import { jobsData } from "../assets/assets";  

export const AppContext = createContext();  

export const AppContextProvider = ({ children }) => {  
    const [searchFilter, setSearchFilter] = useState({  
        title: '',  
        location: ''  
    });  

    const [isSearched, setIsSearched] = useState(false);  
    const [jobs, setJobs] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);  

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)


    // function to fetch
    const fetchJobs = () => {  
        try {  
            setIsLoading(true);  
            setJobs(jobsData);  
        } catch (error) {  
            console.error("Error fetching jobs:", error);  
            setJobs([]);  
        } finally {  
            setIsLoading(false);  
        }  
    };  

    useEffect(() => {  
        fetchJobs();  
    }, []);  

    const value = {  
        setSearchFilter,  
        searchFilter,  
        isSearched,  
        setIsSearched,  
        jobs,  
        setJobs,  
        isLoading,
        showRecruiterLogin, setShowRecruiterLogin,
    };  

    return (  
        <AppContext.Provider value={value}>  
            {children}  
        </AppContext.Provider>  
    );  
};  
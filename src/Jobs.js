import React, { useState, useEffect, useContext } from "react";
import JobCard from './JobCard';
import JoblyApi from "./api";
import './styles/jobs.css'
import AuthContext from "./authContext";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const allJobs = await JoblyApi.getAllJobs();
                setJobs(allJobs);
            } catch (error) {
                setError("Failed to load jobs. Please try again.");
                console.error("Error fetching all jobs:", error);
            }
            setIsLoading(false);
        }

        fetchJobs();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const results = await JoblyApi.getJobs(searchTerm);
            setJobs(results);
        } catch (error) {
            setError("Failed to find jobs. Please try again.");
            console.error("Search Error:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="JobList">
            <form className="search-container" onSubmit={handleSearch}>
                <input className="search-bar"
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="submit-btn" type="submit">Search</button>
            </form>
            <div className="job-list">
                {isLoading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {jobs.map(job => (
                    <JobCard key={job.id} {...job} currentUser={currentUser} />
                ))}
            </div>
        </div>
    );
}

export default Jobs;


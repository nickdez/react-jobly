import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './styles/CompanyDetails.css';
import JobCard from './JobCard';

function CompanyDetail() {
    const [company, setCompany] = useState(null);
    const { handle } = useParams();

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyDetails = await JoblyApi.getCompany(handle);
                setCompany(companyDetails);
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        }

        fetchCompanyDetails();
    }, [handle]);

    if (!company) return <div>Loading...</div>;

    return (
        <div className="CompanyDetail">
            <div className="company-container">
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            <h3>Job Opportunities</h3>
            {company.jobs.map(job => (
                <JobCard key={job.id} {...job} />
            ))}
        </div>
    );
}


export default CompanyDetail;



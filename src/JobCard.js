import React, { useState, useContext } from 'react';
import './styles/card.css'
import JoblyApi from './api';
import { AuthContext } from './authContext';

function JobCard({ id, title, salary }) {
    const { currentUser } = useContext(AuthContext);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        if (applied) return;

        try {
            await JoblyApi.applyToJob(currentUser.username, id);
            setApplied(true);
        } catch (error) {
            console.error("Failed to apply for job:", error);
        }
    };

    return (
        <div className="card">
            <div>
                <h2>{title}</h2>
                <p><b>Salary: {salary}</b></p>
            </div>
            {
                applied
                    ? <div className="apply-btn-disabled">Applied</div>
                    : <div className="apply-btn" onClick={handleApply}>Apply</div>
            }
        </div>
    );
}

export default JobCard;


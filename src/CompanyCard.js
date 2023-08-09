import React from 'react';
import './styles/card.css'

function CompanyCard({ name, description }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
}

export default CompanyCard;

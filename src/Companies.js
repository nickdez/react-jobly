import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import CompanyCard from "./CompanyCard";
import './styles/Companies.css';
import JoblyApi from "./api";

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const allCompanies = await JoblyApi.getAllCompanies();
                setCompanies(allCompanies);
            } catch (error) {
                console.error("Error fetching all companies:", error);
            }
        }

        fetchCompanies();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const results = await JoblyApi.getCompanies(searchTerm);
            setCompanies(results);
        } catch (error) {
            setError("Failed to find companies. Please try again.");
            console.error("Search Error:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="CompanyList">
            <form className="search-container" onSubmit={handleSearch}>
                <input className="search-bar"
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="submit-btn" type="submit">Search!</button>
            </form>
            <div className="company-list">
                {isLoading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {companies.map(company => (
                    <Link className="link" to={`/companies/${company.handle}`} key={company.handle}>
                        <CompanyCard {...company} />
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default Companies;

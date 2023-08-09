import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

function JoblyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:handle" element={<CompanyDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default JoblyRoutes;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your AdminHeader
import AdminHeader from "./Components/AdminHeader";

// Import or define the pages you want to render
import SubmissionPage from "./Components/Submission";
import RegisterRequestPage from "./Components/LoginRequest";
import DownloadDataPage from "./Components/DownloadData";

export default function App() {
  return (
    <Router>
      
      <div className="flex">
        
        <AdminHeader />

        
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<SubmissionPage />} />
            <Route path="/register-request" element={<RegisterRequestPage />} />
            <Route path="/download-data" element={<DownloadDataPage />} />
          </Routes>
        </main>


      </div>
    </Router>
  );
}

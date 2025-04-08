import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
import { FileText, UserPlus, Download } from 'lucide-react';

export default function AdminHeader() {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      {/* Branding / Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        <NavItem to="/" label="Submission" icon={<FileText size={18} />} />
        <NavItem to="/register-request" label="Register Request" icon={<UserPlus size={18} />} />
        <NavItem to="/download-data" label="Download Data" icon={<Download size={18} />} />
      </nav>
    </aside>
  );
}

/* 
 * Reusable NavItem component 
 * - Uses Link from React Router to navigate
 * - Now includes an icon parameter
 */
function NavItem({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-2 rounded-md text-gray-600 
                 hover:bg-blue-600 hover:text-white transition-colors"
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
}
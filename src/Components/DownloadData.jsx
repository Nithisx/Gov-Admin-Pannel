import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function Download() {
  const [users, setUsers] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [allSelected, setAllSelected] = useState(false);

  // Calculate derived data first
  const filteredUsers = users.filter(user => 
    !departmentFilter || user.department === departmentFilter
  );
  
  const uniqueDepartments = [...new Set(users.map(user => user.department))].filter(Boolean);

  useEffect(() => {
    // Update allSelected state when selection or filters change
    const allFilteredSelected = filteredUsers.every(user => 
      selectedRows.has(user.sno)
    );
    setAllSelected(allFilteredSelected);
  }, [selectedRows, filteredUsers]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://ozone-travels-hist-atmospheric.trycloudflare.com/form/")
      .then((response) => response.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : [data];
        setUsers(results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const toggleSelection = (sno) => {
    const newSelected = new Set(selectedRows);
    newSelected.has(sno) ? newSelected.delete(sno) : newSelected.add(sno);
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      const allSno = filteredUsers.map(user => user.sno);
      setSelectedRows(new Set(allSno));
    }
  };

  const handleDownload = () => {
    const dataToExport = users.filter(user => selectedRows.has(user.sno));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Project Data");
    XLSX.writeFile(workbook, "project_registrations.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Registrations</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Selected ({selectedRows.size})
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guide Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.sno} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(user.sno)}
                        onChange={() => toggleSelection(user.sno)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.sno}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{user.guide_name}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.project_title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.student_details?.map((student, index) => (
                        <div key={index} className="mb-2 last:mb-0">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-gray-500">{student.email}</div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">No matching records found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
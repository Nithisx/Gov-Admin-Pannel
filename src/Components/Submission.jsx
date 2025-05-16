import React, { useState, useEffect } from 'react';

const UserRow = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      
      const pdfUrl = `https://u-early-angeles-dl.trycloudflare.com${user.pdf}`;
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = user.pdf.split('/').pop() || 'download.pdf';
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <>
      <tr
        onClick={toggleExpand}
        className="border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      >
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.guideName}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{user.designation}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{user.department}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{user.mobileNumber}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
        <td className="px-6 py-4 text-sm text-gray-500 relative">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            
             PDF
          </button>
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            className={`absolute right-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan="6" className="p-0 border-b border-gray-200">
          <div
            className={`relative z-50 transition-all duration-500 ease-in-out ${
              isExpanded
                ? 'max-h-[80vh] opacity-100 overflow-auto'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="bg-gradient-to-b from-gray-50 to-white p-6 shadow-inner">
              {/* Institution Address Section */}
              <div className="bg-white rounded-lg p-4 shadow mb-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                  Institution Address
                </h3>
                <p className="text-gray-800">{user.institutionAddress}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                    Project Information
                  </h3>
                  <p className="mb-2 flex">
                    <span className="font-medium text-gray-600 w-32">Project Title:</span>
                    <span className="text-gray-800">{user.project_title}</span>
                  </p>
                  <p className="mb-2 flex">
                    <span className="font-medium text-gray-600 w-32">Date:</span>
                    <span className="text-gray-800">{user.date}</span>
                  </p>
                  <p className="mb-2 flex">
                    <span className="font-medium text-gray-600 w-32">Similar Project:</span>
                    <span className="text-gray-800">{user.similar_project}</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                    Academic Details
                  </h3>
                  <p className="mb-2 flex">
                    <span className="font-medium text-gray-600 w-32">Course:</span>
                    <span className="text-gray-800">{user.course_studying}</span>
                  </p>
                  <p className="mb-2 flex">
                    <span className="font-medium text-gray-600 w-32">Details Attached:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.project_details_attached
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.project_details_attached ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg p-4 shadow">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                  Student Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mobile
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {user.student_details &&
                        user.student_details.map((student, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{student.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{student.mobile}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{student.email}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Download button is now only in the main row */}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

const Submission = () => {
  const [filter, setFilter] = useState({
    name: '',
    designation: '',
    department: '',
    institution: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://ozone-travels-hist-atmospheric.trycloudflare.com/form/')
      .then((response) => response.json())
      .then((data) => {
        let formattedUsers;
        if (Array.isArray(data)) {
          formattedUsers = data.map((item) => ({
            ...item,
            guideName: item.guide_name,
            mobileNumber: item.mobile_number,
            institutionAddress: item.institution_address
          }));
        } else {
          formattedUsers = [
            {
              ...data,
              guideName: data.guide_name,
              mobileNumber: data.mobile_number,
              institutionAddress: data.institution_address
            }
          ];
        }
        setUsers(formattedUsers);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.guideName.toLowerCase().includes(filter.name.toLowerCase()) &&
      user.designation.toLowerCase().includes(filter.designation.toLowerCase()) &&
      user.department.toLowerCase().includes(filter.department.toLowerCase()) &&
      user.institutionAddress.toLowerCase().includes(filter.institution.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Page</h2>

      {/* Filter Options */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Guide Name Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Guide Name</label>
            <input
              type="text"
              name="name"
              placeholder="Filter by Guide Name"
              value={filter.name}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {filter.name && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, name: '' }))}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
          {/* Designation Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Filter by Designation"
              value={filter.designation}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {filter.designation && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, designation: '' }))}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708.708L8.707 8l2.647 2.646a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
          {/* Department Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Filter by Department"
              value={filter.department}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {filter.department && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, department: '' }))}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708.708L8.707 8l2.647 2.646a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
          {/* Institution Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              type="text"
              name="institution"
              placeholder="Filter by Institution"
              value={filter.institution}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {filter.institution && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, institution: '' }))}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708.708L8.707 8l2.647 2.646a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {(filter.name || filter.designation || filter.department || filter.institution) && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filter.name && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Name: {filter.name}
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, name: '' }))}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708.708L8.707 8l2.647 2.646a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              )}
              {filter.designation && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Designation: {filter.designation}
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, designation: '' }))}
                    className="ml-1 text-green-500 hover:text-green-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708.708L8.707 8l2.647 2.646a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              )}
              {filter.department && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Department: {filter.department}
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, department: '' }))}
                    className="ml-1 text-purple-500 hover:text-purple-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              )}
              {filter.institution && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Institution: {filter.institution}
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, institution: '' }))}
                    className="ml-1 text-yellow-500 hover:text-yellow-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              )}
              <button
                onClick={() =>
                  setFilter({ name: '', designation: '', department: '', institution: '' })
                }
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table of User Submissions */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">User Submissions</h3>
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length}{' '}
            {filteredUsers.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guide Name
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 4.86 2.451 10.342a1 1 0 0 0 .753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 4.86 2.451 10.342a1 1 0 0 0 .753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 4.86 2.451 10.342a1 1 0 0 0 .753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile Number
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 4.86 2.451 10.342a1 1 0 0 0 .753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 4.86 2.451 10.342a1 1 0 0 0 .753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </span>
                  </div>
                </th>
                <th className="group px-6 py-3 text-left">
                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserRow key={user.id || user._id} user={user} />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Simple Pagination (static for demo) */}
        {filteredUsers.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> entries
            </div>
            <div className="flex-1 flex justify-end">
              <button
                disabled
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submission;

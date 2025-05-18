import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  BookOpen,
  Building,
  Loader,
} from "lucide-react";

export default function RegisterRequest() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL =
    "https://gentle-nine-aging-chronicles.trycloudflare.com/approve-signup/";

  // Helper function to show message and auto-clear after 3 seconds
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAccept = async (id, email) => {
    setProcessing(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      showMessage({ text: "Request accepted successfully!", type: "success" });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error accepting request:", error);
      showMessage({
        text: "Failed to accept request. Try again.",
        type: "error",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDecline = async (id, email) => {
    setProcessing(true);
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      showMessage({ text: "Request rejected successfully!", type: "error" });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error declining request:", error);
      showMessage({
        text: "Failed to decline request. Try again.",
        type: "error",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      {/* CSS for animations */}
      <style>{`
        @keyframes slideIn {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .table-row-animate {
          animation: fadeIn 0.4s ease-out;
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="w-full max-w-6xl px-4">
        <div className="flex items-center justify-center mb-6">
          <UserPlus size={24} className="text-blue-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">
            Register Requests
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader size={40} className="text-blue-500 spin" />
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2" />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <BookOpen size={16} className="mr-2" />
                        Role
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Building size={16} className="mr-2" />
                        College
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-blue-50 transition-colors table-row-animate"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {req.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{req.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{req.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {req.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {req.College_Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleAccept(req.id, req.email)}
                            disabled={processing}
                            className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 shadow-sm"
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(req.id, req.email)}
                            disabled={processing}
                            className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 shadow-sm"
                          >
                            <XCircle size={16} className="mr-1" />
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <InboxIcon size={40} className="mb-2 text-gray-400" />
                          <p className="text-lg">
                            No register requests available.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Animated message banner */}
      {message && (
        <div
          style={{ animation: "slideIn 0.5s ease-out" }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 text-white rounded-lg shadow-lg flex items-center ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={18} className="mr-2" />
          ) : (
            <XCircle size={18} className="mr-2" />
          )}
          {message.text}
        </div>
      )}
    </div>
  );
}

// Missing icon components that weren't imported above
const UserPlus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="16" y1="11" x2="22" y2="11"></line>
  </svg>
);

const InboxIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);

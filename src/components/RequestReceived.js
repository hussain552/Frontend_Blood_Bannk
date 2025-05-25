import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestReceived = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('userEmail');
console.log("localstorge",userEmail)
    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : '-';
    };

    useEffect(() => {
        if (!userEmail) {
            setLoading(false);
            return;
        }

        const fetchRequests = async () => {
             console.log("Hello this from table")
            try {
                const response = await axios.get("https://blood-donor-8q2v.onrender.com/api/bloodRequirer", {
                    params: { EmailId: userEmail }
                });
                console.log("Hello this from table",response)
                setRequests(response.data.requests || []);

            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [userEmail]);

    if (loading) return <div className="text-center mt-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-red-600 mb-8">Request Received</h1>
                {requests.length > 0 ? (
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">S.No</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Blood Group</th>
                                <th className="px-4 py-2">Mobile</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Blood Required For</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Apply Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={request._id || index} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{request.name}</td>
                                    <td className="px-4 py-2">{request.BloodGroup}</td>
                                    <td className="px-4 py-2">{request.ContactNumber}</td>
                                    <td className="px-4 py-2">{request.RequesterEmail}</td>
                                    <td className="px-4 py-2">{request.BloodRequirefor}</td>
                                    <td className="px-4 py-2">{request.Message || '-'}</td>
                                    <td className="px-4 py-2">{formatDate(request.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No requests found.</p>
                )}
            </div>
        </div>
    );
};

export default RequestReceived;

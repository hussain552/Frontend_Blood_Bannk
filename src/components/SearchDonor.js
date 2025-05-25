import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get("https://blood-donor-8q2v.onrender.com/api/donors");
                setDonors(response.data);
            } catch (error) {
                console.error("Error fetching donors:", error);
            }
        };
        fetchDonors();
    }, []);

    const handleRequest = (donor) => {
        navigate("/requestPage", {
            state: { 
                donor: {
                    ...donor,
                    email: donor.emailId,
                    id: donor._id
                }
            }
        });
    };

    const filteredDonors = donors.filter((donor) => 
        donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) &&
        donor.address.toLowerCase().includes(searchAddress.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Blood Donors</h2>
            <input
                type="text"
                placeholder="Search by Blood Group"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 mb-2 border rounded w-full"
            />
            <input
                type="text"
                placeholder="Search by Address"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="p-2 mb-4 border rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredDonors.length > 0 ? (
                    filteredDonors.map((donor) => (
                        <div key={donor._id} className="p-4 border rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{donor.fullName}</h3>
                            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                            <p><strong>Age:</strong> {donor.age}</p>
                            <p><strong>Gender:</strong> {donor.gender}</p>
                            <p><strong>Location:</strong> {donor.address}</p>
                            <p><strong>Message:</strong> {donor.message || "No message"}</p>
                            <button
                                onClick={() => handleRequest(donor)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Request Contact
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No donors available.</p>
                )}
            </div>
        </div>
    );
};

export default DonorList;

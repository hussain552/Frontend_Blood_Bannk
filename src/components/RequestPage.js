import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestPage = () => {
    const { state } = useLocation();
    const donor = state?.donor;
    const [contactNumber, setContactNumber] = useState('');
    const [bloodRequireFor, setBloodRequireFor] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [BloodGroup, setBloodGroup] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!donor) {
            navigate('/'); // Redirect if donor data is missing
        }
    }, [donor, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bloodRequireFor || !BloodGroup) {
            alert("Please provide all necessary details.");
            return;
        }

        const requestData = {
            BloodDonorID: donor._id,
            name: name || donor.name, // Default to donor name if not provided
            BloodGroup: BloodGroup,
            EmailId: donor.emailId,
            ContactNumber: contactNumber,
            BloodRequirefor: bloodRequireFor,
            Message: message,
            RequesterEmail: email
        };
        console.log('Request submitted:',  requestData );
        try {
            const response = await axios.post('https://blood-donor-8q2v.onrender.com/api/blood-requirer', requestData);
            console.log('Request submitted:', response.data);
            navigate('/'); // Redirect to home or list page after success
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Request Blood</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-lg">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-lg">Your Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="contactNumber" className="block text-lg">Contact Number:</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="bloodRequireFor" className="block text-lg">Blood Required For:</label>
                    <input
                        type="text"
                        id="bloodRequireFor"
                        value={bloodRequireFor}
                        onChange={(e) => setBloodRequireFor(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-lg">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="bloodGroup" className="block text-lg">Blood Group:</label>
                    <select
                        id="BloodGroup"
                        value={BloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default RequestPage;

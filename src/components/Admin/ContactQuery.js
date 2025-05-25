import { useState, useEffect } from 'react';
import axios from 'axios';

const ContactQueries = () => {
  const [queries, setQueries] = useState([]); // Ensuring queries is always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const API_URL = 'https://blood-donor-8q2v.onrender.com/api/admin/contactquery'; // Update with your actual API endpoint

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${API_URL}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
        console.log("API Response:", response.data); // Debugging to check response structure

        if (Array.isArray(response.data.data)) {
          setQueries(response.data.data); // Accessing queries inside `data`
        } else {
          setQueries([]); // Ensure queries is always an array
          setError('Invalid data format received from the server.');
        }
        
      } catch (err) {
        setError('Failed to fetch contact queries. Please try again later.');
        console.error('Error fetching queries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [sortBy, sortOrder]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setQueries(queries.filter(query => query._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete query. Please try again.');
      console.error('Error deleting query:', err);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Queries Management</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading queries...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="p-3 text-left cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="p-3 text-left cursor-pointer"
                  onClick={() => toggleSort('EmailId')}
                >
                  Email {sortBy === 'EmailId' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-3 text-left">Contact Number</th>
                <th className="p-3 text-left">Message</th>
                <th 
                  className="p-3 text-left cursor-pointer"
                  onClick={() => toggleSort('createdAt')}
                >
                  Submitted At {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(queries) && queries.length > 0 ? (
                queries.map((query) => (
                  <tr key={query._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{query.name}</td>
                    <td className="p-3">{query.EmailId}</td>
                    <td className="p-3">{query.ContactNumber}</td>
                    <td className="p-3 max-w-xs truncate">{query.Message}</td>
                    <td className="p-3">
                      {new Date(query.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(query._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-3">
                    No contact queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactQueries;

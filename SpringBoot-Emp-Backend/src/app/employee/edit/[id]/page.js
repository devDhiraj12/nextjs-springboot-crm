"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditEmployee({params}) {

    const router = useRouter();

  // const [emp, setEmp] = useState({selectedPerson});
  const [eid, setId] = useState(params.id);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    status: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eid) {
      fetchEmployee();
    }
  }, [eid]);

  const fetchEmployee = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:8080/emp/${eid}`);
      const data = await response.json();
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:8080/createEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/employee'); // Redirect to employee list page
      } else {
        throw new Error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='hidden'>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={eid}
            readOnly
            onChange={handleChange}
            className="mt-1 border-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 border-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1  p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button 
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}

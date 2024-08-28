"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const EmployeeForm = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    status: 'Active',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/createEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', department: '', status: 'Active' });
        router.push('/employee'); // Redirect to employee list page
        rou
      } else {
        const errorData = await response.json();
        console.error('Error creating employee:', errorData.message);
      }
    } catch (error) {
      // console.error('Error creating employee:', error);
    }
  };

  return (
<div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Employee</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
      <input
        type="text"
        id="status"
        name="status"
        value={formData.status}
        className="mt-1  p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <div>
      <button 
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Employee
      </button>
    </div>
  </form>
</div>
  );
};

export default EmployeeForm;

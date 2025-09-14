import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import CustomerForm from '../components/customers/CustomerForm';

export default function CustomerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      api.get(`/customers/${id}`)
        .then(res => setCustomer(res.data))
        .catch(err => console.error("Failed to fetch customer", err));
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (isEditing) {
        await api.put(`/customers/update${id}`, formData);
        navigate(`/customers/${id}`);
      } else {
        const res = await api.post('/customers/add', formData);
        navigate(`/customers`); // Navigate to the new customer's detail page
      }
    } catch (error) {
      console.error("Failed to save customer:", error);
      setLoading(false);
    }
  };
  
  // Show loading state while fetching for edit mode
  if (isEditing && !customer) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Customer' : 'Add New Customer'}</h1>
      <CustomerForm
        defaultValues={customer}
        onFormSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
}
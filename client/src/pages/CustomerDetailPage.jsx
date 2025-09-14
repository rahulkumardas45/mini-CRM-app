import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/client";
import LeadForm from "../components/customers/LeadForm";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Use Promise.all to fetch customer details and leads in parallel
      const [customerRes] = await Promise.all([
        api.get(`/customers/getcustomer${id}`),
        
      ]);
      setData({ customer: customerRes.data, leads: leadsRes.data });
      console.log(customerRes.data);
      console.log(leadsRes.data);
    } catch (error) {
      console.error("Failed to load customer details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="text-center p-4">Loading customer details...</div>;
  if (!data) return <div className="text-center p-4 text-red-500">Could not load customer data.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">{data.customer.name}</h1>
                <p className="text-md text-gray-600 mt-1">{data.customer.email} • {data.customer.company}</p>
            </div>
            <Link to={`/customers/${id}/edit`} className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md">
                Edit
            </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Add New Lead</h3>
        <LeadForm customerId={id} onAdded={loadData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Leads ({data.leads.length})</h3>
        <div className="space-y-3">
          {data.leads.length > 0 ? data.leads.map(l => (
            <div key={l._id} className="flex items-center justify-between border p-3 rounded-md bg-gray-50">
              <div>
                <div className="font-medium text-gray-800">{l.title}</div>
                <div className="text-sm text-gray-500">{l.status}</div>
              </div>
              <div className="font-semibold text-lg">₹{l.value.toLocaleString('en-IN')}</div>
            </div>
          )) : <p className="text-gray-500">No leads found for this customer.</p>}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import api from "../../api/client";

export default function LeadForm({ customerId, onAdded = () => {} }) {
  const initialFormState = { title: "", description: "", status: "New", value: 0 };
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/customers/${customerId}/leads`, form);
      setForm(initialFormState); // Reset form
      onAdded(); // Callback to refresh parent component data
    } catch (error) {
      console.error("Failed to add lead:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[150px]">
          <label className="text-xs text-gray-500">Title</label>
          <input name="title" className="border p-2 w-full rounded-md" placeholder="Initial Quote" value={form.title} onChange={handleChange} required />
      </div>
      <div className="flex-1 min-w-[120px]">
          <label className="text-xs text-gray-500">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full rounded-md">
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
      </div>
      <div className="w-28">
          <label className="text-xs text-gray-500">Value (₹)</label>
          <input type="number" name="value" className="border p-2 w-full rounded-md" value={form.value} onChange={handleChange} />
      </div>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded-md self-end">
        Add Lead
      </button>
    </form>
  );
}
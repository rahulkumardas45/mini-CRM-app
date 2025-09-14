import React, { useEffect, useState, useCallback } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await api.get("/customers/getcustomer", {
          params: { q: query, page, limit: 10 },
        });
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const handleSearch = () => {
    fetchData(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <Link
          to="/customers/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
        >
          + Add Customer
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by name, email, or company..."
          className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Company</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.customers.length > 0 ? (
              data.customers.map((c) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">{c.name}</td>
                  <td className="p-4 text-gray-600">{c.email}</td>
                  <td className="p-4 text-gray-600">{c.company}</td>
                  <td className="p-4">
                    <Link
                      to={`/customers/${c._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          disabled={data.page <= 1}
          onClick={() => fetchData(data.page - 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
        >
          Previous
        </button>
        <div className="text-gray-700 font-medium">
          Page {data.page} of {data.pages}
        </div>
        <button
          disabled={data.page >= data.pages}
          onClick={() => fetchData(data.page + 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

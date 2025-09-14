import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import api from "../api/client";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function ReportsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        // In a real app, this should be a single API call to an aggregate endpoint
        // e.g., GET /reports/leads-by-status
        const res = await api.get("/customers", { params: { limit: 1000 } }); // Get all customers
        const customers = res.data.items;
        
        // Fetch all leads for all customers
        const leadPromises = customers.map(c => api.get(`/customers/${c._id}/leads`));
        const leadsResults = await Promise.all(leadPromises);
        const allLeads = leadsResults.flatMap(res => res.data);
        
        // Aggregate data on the client side
        const byStatus = allLeads.reduce((acc, lead) => {
          acc[lead.status] = (acc[lead.status] || 0) + 1;
          return acc;
        }, {});
        
        const chartData = Object.entries(byStatus).map(([name, value]) => ({ name, value }));
        setData(chartData);
      } catch (error) {
        console.error("Failed to generate report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) return <div>Loading report...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leads by Status</h2>
      {data.length > 0 ? (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : <p>No lead data available to generate a report.</p>}
    </div>
  );
}
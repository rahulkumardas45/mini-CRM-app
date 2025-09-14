import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center w-full mx-[3rem] my-[2rem]">
      {/* Top Navbar */}
     

      {/* Main Content */}
      <main className="max-w-6xl mx-auto pt-24 px-6">
        {/* Welcome Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome back, {user?.fullName || user?.name || "User"} 👋
        </h2>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,248</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Monthly Sales</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">$23,450</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Projects</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
          </div>
        </section>

        {/* Reports Section */}
        <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Reports</h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between">
              <span className="text-gray-700">Customer Growth Report</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span className="text-gray-700">Sales Performance</span>
              <span className="text-sm text-gray-500">1 week ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span className="text-gray-700">Engagement Analysis</span>
              <span className="text-sm text-gray-500">2 weeks ago</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

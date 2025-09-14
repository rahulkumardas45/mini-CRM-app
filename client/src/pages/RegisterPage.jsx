import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await signup(data);
      // Optional: Log in the user automatically after registration
      // await login(data.email, data.password);
      navigate("/login", { state: { message: "Registration successful! Please log in." } });
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      {serverError && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input {...register("name", { required: "Name is required" })} className="mt-1 border p-2 w-full rounded-md shadow-sm" />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} className="mt-1 border p-2 w-full rounded-md shadow-sm" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" {...register("password", { required: "Password is required", minLength: 6 })} className="mt-1 border p-2 w-full rounded-md shadow-sm" />
          {errors.password && <p className="text-red-600 text-xs mt-1">Password must be at least 6 characters.</p>}
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
          Register
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
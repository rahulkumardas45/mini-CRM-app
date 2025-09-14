import React from 'react';
import { useForm } from 'react-hook-form';

export default function CustomerForm({ defaultValues, onFormSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
    
    
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 border p-2 w-full rounded-md shadow-sm"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 border p-2 w-full rounded-md shadow-sm"
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          {...register("company")}
          className="mt-1 border p-2 w-full rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md font-semibold disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Customer'}
      </button>
    </form>
  );
}
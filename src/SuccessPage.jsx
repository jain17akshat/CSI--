import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 text-center">
        <p className="text-red-600 font-semibold mb-4">No form data found. Please submit the form first.</p>
        <Link to="/" className="text-indigo-600 underline">Go back to form</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Submission Successful!</h2>
      <div className="space-y-3">
        {Object.entries(state).map(([key, value]) => (
          <p key={key} className="text-gray-700"><span className="font-semibold capitalize">{key}:</span> {value}</p>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-indigo-600 underline hover:text-indigo-900">Fill Again</Link>
      </div>
    </div>
  );
};

export default SuccessPage;

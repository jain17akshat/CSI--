import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
};

const FormPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    for (const key in form) {
      if (!form[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (form.phone && !/^\+\d{1,4}\s\d{7,10}$/.test(form.phone)) {
      newErrors.phone = 'Phone format: +91 9876543210';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: form });
    }
  };

  const cities = form.country ? countries[form.country] || [] : [];

  const isDisabled =
    Object.keys(errors).length > 0 || Object.values(form).some((f) => f.trim() === '');

  return (
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide">
        Registration Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Text Inputs */}
        {[
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Username', name: 'username' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone (+code number)', name: 'phone', placeholder: '+91 9876543210' },
          { label: 'PAN No.', name: 'pan' },
          { label: 'Aadhar No.', name: 'aadhar' },
        ].map(({ label, name, ...rest }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="mb-2 font-semibold text-indigo-700 tracking-wide"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={rest.type || 'text'}
              placeholder={rest.placeholder || ''}
              value={form[name]}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300
                ${
                  errors[name]
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-indigo-300 focus:border-indigo-600'
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-300`}
            />
            {errors[name] && (
              <p className="text-red-600 text-sm mt-1 font-medium">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Password Field */}
        <div className="flex flex-col relative">
          <label
            htmlFor="password"
            className="mb-2 font-semibold text-indigo-700 tracking-wide"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300
              ${
                errors.password
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-indigo-300 focus:border-indigo-600'
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-300`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-3 text-indigo-700 font-semibold hover:text-indigo-900"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.password}</p>
          )}
        </div>

        {/* Country Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-2 font-semibold text-indigo-700 tracking-wide"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={(e) => {
              handleChange(e);
              setForm((prev) => ({ ...prev, city: '' })); // reset city on country change
            }}
            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300
              ${
                errors.country
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-indigo-300 focus:border-indigo-600'
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-300`}
          >
            <option value="">Select a country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.country}</p>
          )}
        </div>

        {/* City Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="city"
            className="mb-2 font-semibold text-indigo-700 tracking-wide"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={!form.country}
            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300
              ${
                errors.city
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-indigo-300 focus:border-indigo-600'
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-300
              ${!form.country ? 'bg-indigo-50 cursor-not-allowed' : ''}`}
          >
            <option value="">{form.country ? 'Select a city' : 'Select country first'}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.city}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-3 mt-6 rounded-lg font-bold text-white text-xl transition-all
            ${
              isDisabled
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-400/50'
            }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: "yes",
  });
  const { signup, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signup(formData)
      toast.success("Account created successfully!");
    } catch (err) {
      if (useAuthStore.getState().error) {
        toast.error(useAuthStore.getState().error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 mx-auto"
    >
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Create your PopX account
          </h1>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Marry Doe"
              disabled={isLoading}
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Phone number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={isLoading}
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Email address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              disabled={isLoading}
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={isLoading}
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Company name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              disabled={isLoading}
              className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
            <span className="text-sm sm:text-base font-medium text-purple-600">
              Are you an Agency? *
            </span>
            <div className="flex gap-4 sm:ml-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === "yes"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 border-purple-600 rounded-full flex items-center justify-center ${isLoading ? 'opacity-50' : ''}`}>
                  {formData.isAgency === "yes" && (
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm sm:text-base text-purple-600 ml-1">Yes</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === "no"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 border-purple-600 rounded-full flex items-center justify-center ${isLoading ? 'opacity-50' : ''}`}>
                  {formData.isAgency === "no" && (
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm sm:text-base text-purple-600 ml-1">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base mt-4 sm:mt-6 flex items-center justify-center transition-colors duration-200"
      >
        {isLoading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          "Create Account"
        )}
      </button>

      <div className="mt-3 sm:mt-4">
        <button
          type="button"
          className="text-purple-600 text-sm sm:text-base underline hover:text-purple-700 transition-colors duration-200"
          onClick={() => navigate("/")}
          disabled={isLoading}
        >
          Back to Home
        </button>
      </div>
    </form>
  );
};

export default Signup;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLoading, login, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await login(formData)
      toast.success("Login successful!");
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
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            Signin to your PopX account
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm sm:text-base font-medium text-purple-600 mb-2">
              Email Address
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
              Password
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base mt-4 sm:mt-6 flex items-center justify-center transition-colors duration-200"
          >
            {isLoading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
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

export default Login;
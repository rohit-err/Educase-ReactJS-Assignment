import React from 'react'
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 text-center mx-auto">
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        Lorem ipsum dolor sit amet,<br />
                        consectetur adipiscing elit.
                    </p>
                </div>

                <div className="space-y-3 pt-2 sm:pt-4">
                    <button className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base hover:bg-purple-700 transition-colors"
                        onClick={() => navigate("/signup")}>
                        Create Account
                    </button>
                    <button className="w-full bg-purple-200 text-purple-600 py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base hover:bg-purple-300 transition-colors"
                        onClick={() => navigate("/login")}>
                        Already Registered? Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing
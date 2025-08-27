import React from 'react'
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Lorem ipsum dolor sit amet,<br />
                        consectetur adipiscing elit.
                    </p>
                </div>

                <div className="space-y-3 pt-4">
                    <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-medium text-base"
                        onClick={() => navigate("/signup")}>
                        Create Account
                    </button>
                    <button className="w-full bg-purple-200 text-purple-600 py-4 rounded-lg font-medium text-base"
                        onClick={() => navigate("/login")}>
                        Already Registered? Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing
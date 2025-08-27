import React from 'react'
import { Camera } from 'lucide-react'
import useAuthStore from '../store/authStore'

const Profile = () => {
    const { user } = useAuthStore()

    return (
        <div className="bg-white rounded-lg shadow-sm w-full max-w-sm p-6 min-h-[600px]">
            <div className="space-y-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-700 mb-6">Account Settings</h1>
                </div>

                <div className="flex items-start gap-4">
                    <div className="relative">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQafzKrPqdPUXccqum1C5oYc6x3GUq12WjwbQ&s"
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                            <Camera size={14} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-base">{user?.fullName}</h3>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
                    </p>
                </div>
            </div>

            <div className="mt-6">
            </div>
        </div>
    )
}

export default Profile
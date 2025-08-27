import React from 'react'
import { Camera } from 'lucide-react'
import useAuthStore from '../store/authStore'

const Profile = () => {
    const { user } = useAuthStore()

    return (
        <div className="bg-white rounded-lg shadow-sm w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px] mx-auto">
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h1 className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 mb-4 sm:mb-6">Account Settings</h1>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQafzKrPqdPUXccqum1C5oYc6x3GUq12WjwbQ&s"
                            alt="Profile"
                            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                            <Camera size={12} className="text-white sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base lg:text-lg break-words">{user?.fullName}</h3>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-500 break-all">{user?.email}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
                    </p>
                </div>
            </div>

            <div className="mt-4 sm:mt-6">
            </div>
        </div>
    )
}

export default Profile
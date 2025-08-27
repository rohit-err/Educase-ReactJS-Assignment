import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import FullScreenLoader from "./components/FullScreenLoader";
import { LogOut } from "lucide-react";

function App() {
  const { checkAuth, isAuthenticated, isCheckingAuth, logout, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated) return <Navigate to="/profile" replace />;
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return children;
  };

  if (isCheckingAuth) return <FullScreenLoader />;

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen py-4 sm:py-6 lg:py-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="mt-16 sm:mt-0"
          />
          <Routes>
            <Route path="/" element={<RedirectAuthenticatedUser><Landing /></RedirectAuthenticatedUser>} />
            <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
            <Route path="/signup" element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
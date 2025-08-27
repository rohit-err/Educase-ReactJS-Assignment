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
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[400px] bg-white shadow-lg rounded-lg">
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

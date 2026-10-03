import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Questions from "./pages/Questions/Questions";
import Favorites from "./pages/Favorites/Favorites";
import ResumeAnalyzer from "./pages/ResumeAnalyzer/ResumeAnalyzer";
import MockInterview from "./pages/MockInterview/MockInterview";
import Submissions from "./pages/Submissions/Submissions";

function App() {

    const location = useLocation();

    const publicPaths = ["/", "/register"];

    const showNavbar = !publicPaths.includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}

            <Routes>

                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/questions"
                    element={
                        <ProtectedRoute>
                            <Questions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <ResumeAnalyzer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mock"
                    element={
                        <ProtectedRoute>
                            <MockInterview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/submissions"
                    element={
                        <ProtectedRoute>
                            <Submissions />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}
export default App;
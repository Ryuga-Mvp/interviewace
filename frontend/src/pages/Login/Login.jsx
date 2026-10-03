import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            if (error.response) {
                alert(
                    "Login failed: " +
                    error.response.status +
                    " - " +
                    JSON.stringify(error.response.data)
                );
            } else {
                alert("Request failed. Check the browser console.");
            }

        }
    };

    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                overflow: "hidden"
                            }}
                        >

                            {/* Top section */}

                            <div
                                className="text-center text-white p-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #6f42c1)"
                                }}
                            >

                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                    style={{
                                        width: "65px",
                                        height: "65px",
                                        backgroundColor: "rgba(255,255,255,0.15)"
                                    }}
                                >
                                    <i
                                        className="bi bi-lightning-charge-fill"
                                        style={{ fontSize: "32px" }}
                                    ></i>
                                </div>

                                <h2 className="fw-bold mb-1">
                                    InterviewAce
                                </h2>

                                <p className="mb-0 opacity-75">
                                    Prepare smarter. Interview better.
                                </p>

                            </div>

                            {/* Login form */}

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h4 className="fw-bold">
                                        Welcome Back
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Login to continue your preparation
                                    </p>

                                </div>

                                <form onSubmit={handleLogin}>

                                    {/* Email */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-envelope"></i>
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>

                                    {/* Password */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-lock"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>

                                    {/* Login button */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Login
                                    </button>

                                </form>

                                {/* Register */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Don't have an account?{" "}
                                    </span>

                                    <Link
                                        to="/register"
                                        className="text-decoration-none fw-semibold"
                                    >
                                        Create Account
                                    </Link>

                                </div>

                            </div>

                        </div>

                        <p className="text-center text-white-50 small mt-4">
                            © 2026 InterviewAce
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
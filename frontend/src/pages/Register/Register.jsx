import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/register", {
                name: name,
                email: email,
                password: password
            });

            console.log("Registration successful:", response.data);

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {

                alert(
                    "Registration failed: " +
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
            className="min-vh-100 d-flex align-items-center justify-content-center py-3"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "18px",
                                overflow: "hidden"
                            }}
                        >

                            {/* ================= HEADER ================= */}

                            <div
                                className="text-center text-white px-4 py-3"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #6f42c1)"
                                }}
                            >

                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                                    style={{
                                        width: "52px",
                                        height: "52px",
                                        backgroundColor:
                                            "rgba(255,255,255,0.15)"
                                    }}
                                >

                                    <i
                                        className="bi bi-person-plus-fill"
                                        style={{ fontSize: "24px" }}
                                    ></i>

                                </div>

                                <h3 className="fw-bold mb-1">
                                    Join InterviewAce
                                </h3>

                                <p className="mb-0 opacity-75 small">
                                    Start your interview preparation journey
                                </p>

                            </div>


                            {/* ================= FORM ================= */}

                            <div className="card-body px-4 py-3">

                                <div className="text-center mb-3">

                                    <h5 className="fw-bold mb-1">
                                        Create Your Account
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        It only takes a minute to get started
                                    </p>

                                </div>


                                <form onSubmit={handleRegister}>

                                    {/* Name */}

                                    <div className="mb-2">

                                        <label className="form-label fw-semibold mb-1">
                                            Full Name
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-person"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Email */}

                                    <div className="mb-2">

                                        <label className="form-label fw-semibold mb-1">
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

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold mb-1">
                                            Password
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-lock"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Create a password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Register button */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
                                    >

                                        <i className="bi bi-person-plus me-2"></i>

                                        Create Account

                                    </button>

                                </form>


                                {/* Login link */}

                                <div className="text-center mt-3">

                                    <span className="text-muted small">
                                        Already have an account?{" "}
                                    </span>

                                    <Link
                                        to="/"
                                        className="text-decoration-none fw-semibold"
                                    >
                                        Login
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* Copyright */}

                        <p className="text-center text-white-50 small mt-2 mb-0">
                            © 2026 InterviewAce
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
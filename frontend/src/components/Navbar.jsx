import { NavLink, Link } from "react-router-dom";

function Navbar() {

    const navItems = [
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: "bi-speedometer2"
        },
        {
            path: "/questions",
            label: "Questions",
            icon: "bi-journal-text"
        },
        {
            path: "/submissions",
            label: "Submissions",
            icon: "bi-check2-square"
        },
        {
            path: "/favorites",
            label: "Favorites",
            icon: "bi-star"
        },
        {
            path: "/resume",
            label: "Resume",
            icon: "bi-file-earmark-person"
        },
        {
            path: "/mock",
            label: "Mock Interview",
            icon: "bi-mic"
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">

                {/* Brand */}
                <Link
                    className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    to="/dashboard"
                >
                    <span
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: "38px",
                            height: "38px",
                            background: "linear-gradient(135deg, #0d6efd, #6f42c1)"
                        }}
                    >
                        <i className="bi bi-lightning-charge-fill"></i>
                    </span>

                    <span>
                        Interview<span className="text-primary">Ace</span>
                    </span>
                </Link>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
                    <ul className="navbar-nav ms-auto gap-lg-1">

                        {navItems.map((item) => (
                            <li className="nav-item" key={item.path}>

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${
                                            isActive
                                                ? "active bg-primary text-white"
                                                : "text-light"
                                        }`
                                    }
                                >
                                    <i className={`bi ${item.icon}`}></i>
                                    <span>{item.label}</span>
                                </NavLink>

                            </li>
                        ))}

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
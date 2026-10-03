import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function Dashboard() {

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await api.get("/submissions/me");
                console.log("Submissions from backend:", response.data);
                setSubmissions(response.data);
            } catch (error) {
                console.error("Failed to fetch submissions:", error);
            }
        };

        fetchSubmissions();
    }, []);

    const totalSubmissions = submissions.length;

    const correctAnswers = submissions.filter(
        (submission) => submission.correct === true
    ).length;

    const accuracy = totalSubmissions > 0
        ? Math.round((correctAnswers / totalSubmissions) * 100)
        : 0;

    const averageScore = totalSubmissions > 0
        ? (
            submissions.reduce(
                (sum, submission) => sum + submission.score,
                0
            ) / totalSubmissions
        ).toFixed(1)
        : 0;

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ==================== HERO SECTION ==================== */}

                <div
                    className="card border-0 shadow-lg mb-5 overflow-hidden"
                    style={{
                        borderRadius: "24px",
                        background:
                            "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)"
                    }}
                >

                    <div className="card-body p-4 p-md-5 text-white">

                        <div className="row align-items-center">

                            {/* Hero text */}

                            <div className="col-lg-8">

                                <div className="d-flex align-items-center gap-2 mb-3">

                                    <span
                                        className="badge rounded-pill px-3 py-2"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.15)"
                                        }}
                                    >
                                        <i className="bi bi-stars me-2"></i>
                                        Interview Preparation
                                    </span>

                                </div>

                                <h1 className="fw-bold display-6 mb-3">
                                    Welcome back! 👋
                                </h1>

                                <p
                                    className="lead mb-4"
                                    style={{ maxWidth: "650px" }}
                                >
                                    Keep practicing, track your progress,
                                    and become more confident for your next
                                    interview.
                                </p>

                                <div className="d-flex flex-wrap gap-2">

                                    <Link
                                        to="/questions"
                                        className="btn btn-light btn-lg px-4 fw-semibold"
                                    >
                                        <i className="bi bi-play-fill me-2"></i>
                                        Start Practicing
                                    </Link>

                                    <Link
                                        to="/mock"
                                        className="btn btn-outline-light btn-lg px-4 fw-semibold"
                                    >
                                        <i className="bi bi-mic me-2"></i>
                                        Mock Interview
                                    </Link>

                                </div>

                            </div>

                            {/* Hero icon */}

                            <div className="col-lg-4 d-none d-lg-flex justify-content-center">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: "190px",
                                        height: "190px",
                                        backgroundColor:
                                            "rgba(255,255,255,0.12)"
                                    }}
                                >

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: "135px",
                                            height: "135px",
                                            backgroundColor:
                                                "rgba(255,255,255,0.12)"
                                        }}
                                    >

                                        <i
                                            className="bi bi-lightning-charge-fill"
                                            style={{
                                                fontSize: "65px"
                                            }}
                                        ></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================== STATISTICS ==================== */}

                <div className="d-flex align-items-center justify-content-between mb-3">

                    <div>
                        <h4 className="fw-bold mb-1">
                            Your Progress
                        </h4>

                        <p className="text-muted mb-0">
                            Here's how you're performing so far.
                        </p>
                    </div>

                </div>

                <div className="row g-4 mb-5">

                    {/* Questions */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Questions
                                        </p>

                                        <h2 className="fw-bold mb-1">
                                            50
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-journal-text fs-4"></i>
                                    </div>

                                </div>

                                <small className="text-muted">
                                    Available questions
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* Submissions */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Submissions
                                        </p>

                                        <h2 className="fw-bold mb-1">
                                            {totalSubmissions}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10 text-success"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-check2-square fs-4"></i>
                                    </div>

                                </div>

                                <small className="text-muted">
                                    Answers submitted
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* Accuracy */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Accuracy
                                        </p>

                                        <h2 className="fw-bold mb-1">
                                            {accuracy}%
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-bullseye fs-4"></i>
                                    </div>

                                </div>

                                <div className="progress mt-3" style={{ height: "6px" }}>

                                    <div
                                        className="progress-bar bg-warning"
                                        role="progressbar"
                                        style={{
                                            width: `${accuracy}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Average Score */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Average Score
                                        </p>

                                        <h2 className="fw-bold mb-1">
                                            {averageScore}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-10 text-info"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-graph-up-arrow fs-4"></i>
                                    </div>

                                </div>

                                <small className="text-muted">
                                    Average performance
                                </small>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================== QUICK ACTIONS ==================== */}

                <div className="mb-3">

                    <h4 className="fw-bold mb-1">
                        Continue Your Preparation
                    </h4>

                    <p className="text-muted">
                        Choose an activity and keep improving your interview
                        skills.
                    </p>

                </div>

                <div className="row g-4">

                    {/* Practice Questions */}

                    <div className="col-12 col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-4 bg-primary bg-opacity-10 text-primary mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-code-square fs-3"></i>
                                </div>

                                <h5 className="fw-bold">
                                    Practice Questions
                                </h5>

                                <p className="text-muted flex-grow-1">
                                    Practice technical interview questions
                                    and improve your problem-solving skills.
                                </p>

                                <Link
                                    to="/questions"
                                    className="btn btn-primary w-100"
                                >
                                    <i className="bi bi-arrow-right me-2"></i>
                                    Start Practicing
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* Resume Analyzer */}

                    <div className="col-12 col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-4 bg-success bg-opacity-10 text-success mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-file-earmark-person fs-3"></i>
                                </div>

                                <h5 className="fw-bold">
                                    Resume Analyzer
                                </h5>

                                <p className="text-muted flex-grow-1">
                                    Upload your resume and get feedback
                                    on your skills and areas for improvement.
                                </p>

                                <Link
                                    to="/resume"
                                    className="btn btn-success w-100"
                                >
                                    <i className="bi bi-arrow-right me-2"></i>
                                    Analyze Resume
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* Mock Interview */}

                    <div className="col-12 col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                        >

                            <div className="card-body p-4 d-flex flex-column">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-4 bg-warning bg-opacity-10 text-warning mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >
                                    <i className="bi bi-mic fs-3"></i>
                                </div>

                                <h5 className="fw-bold">
                                    Mock Interview
                                </h5>

                                <p className="text-muted flex-grow-1">
                                    Take a realistic mock interview and
                                    receive feedback on your performance.
                                </p>

                                <Link
                                    to="/mock"
                                    className="btn btn-warning w-100"
                                >
                                    <i className="bi bi-arrow-right me-2"></i>
                                    Start Interview
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================== MOTIVATION SECTION ==================== */}

                <div
                    className="card border-0 shadow-sm mt-5"
                    style={{
                        borderRadius: "20px",
                        background: "#ffffff"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="row align-items-center">

                            <div className="col-md-8">

                                <div className="d-flex align-items-center gap-2 mb-2">

                                    <i className="bi bi-lightbulb-fill text-warning fs-4"></i>

                                    <h5 className="fw-bold mb-0">
                                        Keep going!
                                    </h5>

                                </div>

                                <p className="text-muted mb-md-0">
                                    Every question you practice brings you
                                    one step closer to being interview-ready.
                                    Stay consistent and keep learning.
                                </p>

                            </div>

                            <div className="col-md-4 text-md-end mt-3 mt-md-0">

                                <Link
                                    to="/questions"
                                    className="btn btn-outline-primary"
                                >
                                    Practice More
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
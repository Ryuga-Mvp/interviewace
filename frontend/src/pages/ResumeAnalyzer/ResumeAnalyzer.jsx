import { useRef, useState } from "react";
import api from "../../api/axios";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileChange = (selectedFile) => {

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setResult(null);
    };

    const handleAnalyze = async () => {

        if (!file) {
            alert("Please select a resume first.");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("file", file);

            const response = await api.post(
                "/resume/upload",
                formData
            );

            console.log("Resume analysis:", response.data);

            setResult(response.data);

            alert("Resume analyzed successfully!");

        } catch (error) {

            console.error("Resume analysis failed:", error);

            if (error.response) {

                alert(
                    "Analysis failed: " +
                    error.response.status +
                    " - " +
                    JSON.stringify(error.response.data)
                );

            } else {

                alert("Request failed. Check the browser console.");

            }
        }
    };

    const handleDrop = (e) => {

        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];

        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    };

    const handleBrowse = () => {
        fileInputRef.current.click();
    };

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ==================== HEADER ==================== */}

                <div className="mb-4">

                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 mb-2">

                        <i className="bi bi-file-earmark-person me-2"></i>

                        Resume Review

                    </span>

                    <h2 className="fw-bold mb-2">
                        Resume Analyzer
                    </h2>

                    <p className="text-muted mb-0">
                        Upload your resume and get feedback on your skills
                        and areas for improvement.
                    </p>

                </div>


                {/* ==================== UPLOAD SECTION ==================== */}

                <div
                    className="card border-0 shadow-sm mb-5"
                    style={{
                        borderRadius: "22px"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        <div className="text-center mb-4">

                            <h4 className="fw-bold">
                                Analyze Your Resume
                            </h4>

                            <p className="text-muted mb-0">
                                Upload your PDF resume to get started.
                            </p>

                        </div>


                        {/* Upload area */}

                        <div
                            className="border border-2 border-primary border-opacity-25 rounded-4 p-4 p-md-5 text-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            style={{
                                backgroundColor: "#f8faff",
                                cursor: "pointer"
                            }}
                            onClick={handleBrowse}
                        >

                            <div
                                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mb-4"
                                style={{
                                    width: "85px",
                                    height: "85px"
                                }}
                            >

                                <i
                                    className="bi bi-cloud-arrow-up"
                                    style={{
                                        fontSize: "40px"
                                    }}
                                ></i>

                            </div>

                            <h5 className="fw-bold">
                                Drop your resume here
                            </h5>

                            <p className="text-muted mb-3">
                                or click to browse from your computer
                            </p>

                            <span className="badge bg-light text-muted border px-3 py-2">
                                <i className="bi bi-file-earmark-pdf me-2"></i>
                                PDF files only
                            </span>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="d-none"
                                onChange={(e) =>
                                    handleFileChange(
                                        e.target.files[0]
                                    )
                                }
                            />

                        </div>


                        {/* Selected file */}

                        {file && (

                            <div
                                className="alert alert-light border mt-4 mb-0"
                            >

                                <div className="d-flex align-items-center gap-3">

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-danger bg-opacity-10 text-danger flex-shrink-0"
                                        style={{
                                            width: "50px",
                                            height: "50px"
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-pdf fs-4"></i>
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden">

                                        <h6 className="fw-bold mb-1 text-truncate">
                                            {file.name}
                                        </h6>

                                        <small className="text-muted">
                                            {(file.size / 1024 / 1024).toFixed(2)}
                                            {" "}MB
                                        </small>

                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>

                                </div>

                            </div>

                        )}


                        {/* Analyze button */}

                        <div className="text-center mt-4">

                            <button
                                className="btn btn-primary btn-lg px-5 fw-semibold"
                                onClick={handleAnalyze}
                                disabled={!file}
                            >
                                <i className="bi bi-stars me-2"></i>
                                Analyze Resume
                            </button>

                        </div>

                    </div>

                </div>


                {/* ==================== RESULT ==================== */}

                {result && (

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "22px",
                            overflow: "hidden"
                        }}
                    >

                        {/* Result header */}

                        <div
                            className="p-4 p-md-5 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #198754, #0d6efd)"
                            }}
                        >

                            <div className="d-flex align-items-center gap-3">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor:
                                            "rgba(255,255,255,0.15)"
                                    }}
                                >

                                    <i className="bi bi-bar-chart-fill fs-3"></i>

                                </div>

                                <div>

                                    <h3 className="fw-bold mb-1">
                                        Resume Analysis
                                    </h3>

                                    <p className="mb-0 opacity-75">
                                        Here's what we found in your resume.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="card-body p-4 p-md-5">

                            <div className="row g-5 align-items-center">

                                {/* Score */}

                                <div className="col-md-5 text-center">

                                    <p className="text-muted fw-semibold mb-3">
                                        Resume Score
                                    </p>

                                    <div
                                        className="position-relative mx-auto"
                                        style={{
                                            width: "180px",
                                            height: "180px"
                                        }}
                                    >

                                        <div
                                            className="rounded-circle d-flex flex-column align-items-center justify-content-center border border-4 border-primary border-opacity-25"
                                            style={{
                                                width: "180px",
                                                height: "180px"
                                            }}
                                        >

                                            <span
                                                className="fw-bold text-primary"
                                                style={{
                                                    fontSize: "42px"
                                                }}
                                            >
                                                {result.score}
                                            </span>

                                            <span className="text-muted">
                                                out of 100
                                            </span>

                                        </div>

                                    </div>

                                    <div
                                        className="progress mt-4 mx-auto"
                                        style={{
                                            height: "8px",
                                            maxWidth: "250px"
                                        }}
                                    >

                                        <div
                                            className="progress-bar bg-primary"
                                            role="progressbar"
                                            style={{
                                                width: `${result.score}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>


                                {/* Missing skills */}

                                <div className="col-md-7">

                                    <div className="d-flex align-items-center gap-2 mb-3">

                                        <i className="bi bi-tools text-warning fs-4"></i>

                                        <h5 className="fw-bold mb-0">
                                            Areas to Improve
                                        </h5>

                                    </div>

                                    {result.missingSkills &&
                                    result.missingSkills.length > 0 ? (

                                        <div className="d-flex flex-wrap gap-2">

                                            {result.missingSkills.map(
                                                (skill, index) => (

                                                    <span
                                                        className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2"
                                                        key={index}
                                                    >
                                                        <i className="bi bi-plus-circle me-1"></i>
                                                        {skill}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <div className="alert alert-success mb-0">

                                            <i className="bi bi-check-circle-fill me-2"></i>

                                            No missing skills detected!

                                        </div>

                                    )}

                                    <p className="text-muted small mt-3 mb-0">

                                        Consider strengthening the areas
                                        identified above to improve your
                                        interview readiness.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ResumeAnalyzer;
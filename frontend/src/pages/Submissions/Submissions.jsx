import { useEffect, useState } from "react";
import api from "../../api/axios";

function Submissions() {

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

    // Calculate summary statistics
    const totalSubmissions = submissions.length;

    const correctSubmissions = submissions.filter(
        (submission) => submission.correct === true
    ).length;

    const incorrectSubmissions =
        totalSubmissions - correctSubmissions;

    const accuracy =
        totalSubmissions > 0
            ? Math.round(
                (correctSubmissions / totalSubmissions) * 100
            )
            : 0;

    const averageScore =
        totalSubmissions > 0
            ? (
                submissions.reduce(
                    (sum, submission) =>
                        sum + submission.score,
                    0
                ) / totalSubmissions
            ).toFixed(1)
            : 0;

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ==================== HEADER ==================== */}

                <div className="mb-4">

                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-2">
                        <i className="bi bi-clock-history me-2"></i>
                        Practice History
                    </span>

                    <h2 className="fw-bold mb-2">
                        My Submissions
                    </h2>

                    <p className="text-muted mb-0">
                        Review your previous answers and track your
                        interview preparation progress.
                    </p>

                </div>


                {/* ==================== SUMMARY CARDS ==================== */}

                <div className="row g-4 mb-5">

                    {/* Total */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Total Attempts
                                        </p>

                                        <h2 className="fw-bold mb-1">
                                            {totalSubmissions}
                                        </h2>

                                        <small className="text-muted">
                                            Questions attempted
                                        </small>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-send-check fs-4"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Correct */}

                    <div className="col-12 col-sm-6 col-lg-3">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{ borderRadius: "18px" }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-start">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Correct
                                        </p>

                                        <h2 className="fw-bold mb-1 text-success">
                                            {correctSubmissions}
                                        </h2>

                                        <small className="text-muted">
                                            Correct answers
                                        </small>

                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10 text-success"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >
                                        <i className="bi bi-check-circle fs-4"></i>
                                    </div>

                                </div>

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

                                        <small className="text-muted">
                                            Overall accuracy
                                        </small>

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

                                <div
                                    className="progress mt-3"
                                    style={{ height: "6px" }}
                                >

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

                                        <small className="text-muted">
                                            Average performance
                                        </small>

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

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================== SUBMISSIONS ==================== */}

                <div
                    className="card border-0 shadow-sm"
                    style={{
                        borderRadius: "20px",
                        overflow: "hidden"
                    }}
                >

                    <div className="card-body p-0">

                        {/* Table Header */}

                        <div className="p-4 border-bottom">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Submission History
                                    </h5>

                                    <p className="text-muted mb-0 small">
                                        Your previous practice attempts
                                    </p>

                                </div>

                                {totalSubmissions > 0 && (

                                    <span className="badge bg-light text-dark border px-3 py-2">
                                        {totalSubmissions}{" "}
                                        {totalSubmissions === 1
                                            ? "Attempt"
                                            : "Attempts"}
                                    </span>

                                )}

                            </div>

                        </div>


                        {/* Empty State */}

                        {submissions.length === 0 ? (

                            <div className="text-center py-5 px-4">

                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mb-3"
                                    style={{
                                        width: "75px",
                                        height: "75px"
                                    }}
                                >

                                    <i
                                        className="bi bi-journal-x"
                                        style={{ fontSize: "32px" }}
                                    ></i>

                                </div>

                                <h5 className="fw-bold">
                                    No submissions yet
                                </h5>

                                <p className="text-muted mb-0">
                                    Start practicing questions to see your
                                    submission history here.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th className="ps-4">
                                                #
                                            </th>

                                            <th>
                                                Question
                                            </th>

                                            <th>
                                                Your Answer
                                            </th>

                                            <th>
                                                Result
                                            </th>

                                            <th>
                                                Score
                                            </th>

                                            <th>
                                                Submitted At
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {submissions.map(
                                            (submission, index) => (

                                                <tr
                                                    key={submission.id}
                                                >

                                                    <td className="ps-4 fw-semibold text-muted">
                                                        {index + 1}
                                                    </td>

                                                    <td>

                                                        <span className="badge bg-primary bg-opacity-10 text-primary">
                                                            Q-
                                                            {
                                                                submission.qusetionId
                                                            }
                                                        </span>

                                                    </td>

                                                    <td
                                                        style={{
                                                            minWidth: "250px",
                                                            maxWidth: "400px"
                                                        }}
                                                    >

                                                        <div
                                                            className="text-truncate"
                                                            title={
                                                                submission.userAnswer
                                                            }
                                                        >
                                                            {
                                                                submission.userAnswer
                                                            }
                                                        </div>

                                                    </td>

                                                    <td>

                                                        {submission.correct ? (

                                                            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">

                                                                <i className="bi bi-check-circle me-1"></i>

                                                                Correct

                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2">

                                                                <i className="bi bi-x-circle me-1"></i>

                                                                Incorrect

                                                            </span>

                                                        )}

                                                    </td>

                                                    <td>

                                                        <span className="fw-bold">

                                                            {
                                                                submission.score
                                                            }

                                                        </span>

                                                        <span className="text-muted">
                                                            /10
                                                        </span>

                                                    </td>

                                                    <td className="text-muted small">

                                                        {new Date(
                                                            submission.submittedAt
                                                        ).toLocaleString()}

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ==================== PERFORMANCE NOTE ==================== */}

                {totalSubmissions > 0 && (

                    <div
                        className="card border-0 shadow-sm mt-4"
                        style={{ borderRadius: "18px" }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex align-items-start gap-3">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 text-warning flex-shrink-0"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >
                                    <i className="bi bi-lightbulb fs-4"></i>
                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">
                                        Keep improving
                                    </h6>

                                    <p className="text-muted mb-0">
                                        You have attempted{" "}
                                        <strong>
                                            {totalSubmissions}
                                        </strong>{" "}
                                        question
                                        {totalSubmissions !== 1
                                            ? "s"
                                            : ""}{" "}
                                        with an overall accuracy of{" "}
                                        <strong>
                                            {accuracy}%
                                        </strong>
                                        . Keep practicing to improve your
                                        consistency.
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

export default Submissions;
import { useState } from "react";
import api from "../../api/axios";

function MockInterview() {

    const [role, setRole] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    const [interview, setInterview] = useState(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");

    const [feedback, setFeedback] = useState(null);


    // Start Interview
    const handleStartInterview = async () => {

        if (!role || !difficulty) {
            alert("Please select role and difficulty.");
            return;
        }

        try {

            const response = await api.post("/mock/start", {
                role: role,
                numberOfQuestions: numberOfQuestions
            });

            console.log("Interview started:", response.data);

            setInterview(response.data);

            setCurrentQuestionIndex(0);
            setAnswer("");
            setFeedback(null);

            alert("Interview started successfully!");

        } catch (error) {

            console.error("Failed to start interview:", error);

            if (error.response) {

                alert(
                    "Failed to start interview: " +
                    error.response.status +
                    " - " +
                    JSON.stringify(error.response.data)
                );

            } else {

                alert("Request failed. Check the browser console.");

            }

        }

    };


    // Submit Answer
    const handleSubmitAnswer = async () => {

        if (!answer.trim()) {
            alert("Please write an answer first.");
            return;
        }

        const currentQuestion =
            interview.questions[currentQuestionIndex];

        try {

            const response = await api.post("/mock/answer", {
                sessionId: interview.sessionId,
                questionId: currentQuestion.id,
                answer: answer
            });

            console.log("Answer response:", response.data);

            setFeedback(response.data);

        } catch (error) {

            console.error("Failed to submit answer:", error);

            if (error.response) {

                alert(
                    "Failed to submit answer: " +
                    error.response.status +
                    " - " +
                    JSON.stringify(error.response.data)
                );

            } else {

                alert("Request failed. Check the browser console.");

            }

        }

    };


    // Next Question
    const handleNextQuestion = () => {

        if (
            currentQuestionIndex <
            interview.questions.length - 1
        ) {

            setCurrentQuestionIndex(
                currentQuestionIndex + 1
            );

            setAnswer("");
            setFeedback(null);

        }

    };


    const currentQuestion =
        interview?.questions?.[currentQuestionIndex];


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ================= HEADER ================= */}

                <div className="mb-4">

                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-2">

                        <i className="bi bi-mic-fill me-2"></i>

                        Interview Simulator

                    </span>

                    <h2 className="fw-bold mb-2">
                        Mock Interview
                    </h2>

                    <p className="text-muted mb-0">
                        Practice a realistic interview and improve your
                        confidence before the real interview.
                    </p>

                </div>


                {/* ================= SETUP ================= */}

                {!interview && (

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "22px",
                            overflow: "hidden"
                        }}
                    >

                        {/* Setup header */}

                        <div
                            className="p-4 p-md-5 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0d6efd, #6f42c1)"
                            }}
                        >

                            <div className="row align-items-center">

                                <div className="col-md-8">

                                    <div className="d-flex align-items-center gap-3 mb-3">

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "58px",
                                                height: "58px",
                                                backgroundColor:
                                                    "rgba(255,255,255,0.15)"
                                            }}
                                        >

                                            <i className="bi bi-mic-fill fs-3"></i>

                                        </div>

                                        <div>

                                            <h3 className="fw-bold mb-1">
                                                Start Your Interview
                                            </h3>

                                            <p className="mb-0 opacity-75">
                                                Configure your interview and
                                                test your knowledge.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Form */}

                        <div className="card-body p-4 p-md-5">

                            <div className="row g-4">

                                {/* Role */}

                                <div className="col-12 col-md-6">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-briefcase me-2 text-primary"></i>

                                        Select Role

                                    </label>

                                    <select
                                        className="form-select form-select-lg"
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >

                                        <option value="">
                                            Select a role
                                        </option>

                                        <option value="Backend Developer">
                                            Backend Developer
                                        </option>

                                        <option value="Java Developer">
                                            Java Developer
                                        </option>

                                        <option value="Software Developer">
                                            Software Developer
                                        </option>

                                        <option value="Full Stack Developer">
                                            Full Stack Developer
                                        </option>

                                    </select>

                                </div>


                                {/* Difficulty */}

                                <div className="col-12 col-md-6">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-bar-chart me-2 text-warning"></i>

                                        Select Difficulty

                                    </label>

                                    <select
                                        className="form-select form-select-lg"
                                        value={difficulty}
                                        onChange={(e) =>
                                            setDifficulty(e.target.value)
                                        }
                                    >

                                        <option value="">
                                            Select difficulty
                                        </option>

                                        <option value="Easy">
                                            Easy
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="Hard">
                                            Hard
                                        </option>

                                    </select>

                                </div>


                                {/* Number of Questions */}

                                <div className="col-12">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-list-ol me-2 text-success"></i>

                                        Number of Questions

                                    </label>

                                    <div className="row g-2">

                                        {[5, 10, 15].map((number) => (

                                            <div
                                                className="col-4"
                                                key={number}
                                            >

                                                <button
                                                    type="button"
                                                    className={`btn w-100 py-3 ${
                                                        numberOfQuestions === number
                                                            ? "btn-primary"
                                                            : "btn-outline-secondary"
                                                    }`}
                                                    onClick={() =>
                                                        setNumberOfQuestions(
                                                            number
                                                        )
                                                    }
                                                >

                                                    <i className="bi bi-question-circle me-2"></i>

                                                    {number}

                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>


                            {/* Start */}

                            <div className="mt-4 pt-3 border-top">

                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                                    <div>

                                        <small className="text-muted">
                                            Ready to begin?
                                        </small>

                                        <div className="fw-semibold">
                                            {role || "Select a role"}
                                            {" • "}
                                            {difficulty || "Select difficulty"}
                                            {" • "}
                                            {numberOfQuestions} questions
                                        </div>

                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg px-5 fw-semibold"
                                        disabled={!role || !difficulty}
                                        onClick={handleStartInterview}
                                    >

                                        <i className="bi bi-play-fill me-2"></i>

                                        Start Interview

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= INTERVIEW ================= */}

                {interview &&
                    interview.questions &&
                    interview.questions.length > 0 &&
                    currentQuestion && (

                    <div>

                        {/* Progress */}

                        <div
                            className="card border-0 shadow-sm mb-4"
                            style={{
                                borderRadius: "18px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-2">

                                    <div>

                                        <small className="text-muted">
                                            Interview Progress
                                        </small>

                                        <div className="fw-bold">
                                            Question{" "}
                                            {currentQuestionIndex + 1}
                                            {" "}of{" "}
                                            {interview.questions.length}
                                        </div>

                                    </div>

                                    <span className="badge bg-primary rounded-pill px-3 py-2">

                                        {Math.round(
                                            ((currentQuestionIndex + 1) /
                                                interview.questions.length) *
                                            100
                                        )}
                                        %

                                    </span>

                                </div>

                                <div
                                    className="progress"
                                    style={{ height: "8px" }}
                                >

                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width:
                                                `${
                                                    ((currentQuestionIndex + 1) /
                                                        interview.questions.length) *
                                                    100
                                                }%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>


                        {/* Question Card */}

                        <div
                            className="card border-0 shadow-sm"
                            style={{
                                borderRadius: "22px",
                                overflow: "hidden"
                            }}
                        >

                            {/* Question header */}

                            <div
                                className="p-4 p-md-5 text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #6f42c1)"
                                }}
                            >

                                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

                                    <div>

                                        <span className="badge bg-light text-primary rounded-pill px-3 py-2 mb-3">

                                            <i className="bi bi-patch-question-fill me-2"></i>

                                            Interview Question

                                        </span>

                                        <h3 className="fw-bold mb-0">
                                            {currentQuestion.title}
                                        </h3>

                                    </div>

                                    <div className="text-md-end">

                                        <span className="badge bg-white bg-opacity-10 rounded-pill px-3 py-2">

                                            Question{" "}
                                            {currentQuestionIndex + 1}
                                            {" / "}
                                            {interview.questions.length}

                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Question body */}

                            <div className="card-body p-4 p-md-5">

                                {/* Topic */}

                                <div className="d-flex flex-wrap gap-2 mb-4">

                                    <span className="badge bg-primary rounded-pill px-3 py-2">

                                        <i className="bi bi-bookmark-fill me-1"></i>

                                        {currentQuestion.topic}

                                    </span>

                                    <span
                                        className={`badge rounded-pill px-3 py-2 ${
                                            currentQuestion.difficulty?.toLowerCase() === "easy"
                                                ? "bg-success"
                                                : currentQuestion.difficulty?.toLowerCase() === "medium"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                        }`}
                                    >

                                        {currentQuestion.difficulty}

                                    </span>

                                </div>


                                {/* Description */}

                                <div className="mb-4">

                                    <h6 className="fw-bold">
                                        Question
                                    </h6>

                                    <div
                                        className="bg-light rounded-4 p-4"
                                    >

                                        <p className="mb-0 text-muted">
                                            {currentQuestion.description}
                                        </p>

                                    </div>

                                </div>


                                {/* Answer */}

                                <div>

                                    <label className="form-label fw-bold">

                                        <i className="bi bi-pencil-square me-2 text-primary"></i>

                                        Your Answer

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        placeholder="Explain your answer clearly. Take your time and include your reasoning..."
                                        value={answer}
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                    />

                                    <div className="d-flex justify-content-between mt-2">

                                        <small className="text-muted">
                                            Try to answer as if you were in
                                            a real interview.
                                        </small>

                                        <small className="text-muted">
                                            {answer.length} characters
                                        </small>

                                    </div>

                                </div>


                                {/* Submit */}

                                {!feedback && (

                                    <button
                                        className="btn btn-success btn-lg px-4 mt-4 fw-semibold"
                                        disabled={!answer.trim()}
                                        onClick={handleSubmitAnswer}
                                    >

                                        <i className="bi bi-send-fill me-2"></i>

                                        Submit Answer

                                    </button>

                                )}


                                {/* ================= FEEDBACK ================= */}

                                {feedback && (

                                    <div
                                        className={`card border-0 mt-4 ${
                                            feedback.correct
                                                ? "bg-success bg-opacity-10"
                                                : "bg-danger bg-opacity-10"
                                        }`}
                                        style={{
                                            borderRadius: "18px"
                                        }}
                                    >

                                        <div className="card-body p-4">

                                            <div className="d-flex align-items-center gap-3 mb-3">

                                                <div
                                                    className={`d-flex align-items-center justify-content-center rounded-circle ${
                                                        feedback.correct
                                                            ? "bg-success text-white"
                                                            : "bg-danger text-white"
                                                    }`}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px"
                                                    }}
                                                >

                                                    <i
                                                        className={`bi ${
                                                            feedback.correct
                                                                ? "bi-check-lg"
                                                                : "bi-x-lg"
                                                        } fs-4`}
                                                    ></i>

                                                </div>

                                                <div>

                                                    <h5 className="fw-bold mb-1">

                                                        {feedback.correct
                                                            ? "Correct Answer!"
                                                            : "Answer Submitted"}

                                                    </h5>

                                                    <span className="text-muted">
                                                        Your score:{" "}
                                                        <strong>
                                                            {feedback.score}/10
                                                        </strong>
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="bg-white rounded-3 p-3">

                                                <small className="text-muted d-block mb-1">
                                                    Feedback
                                                </small>

                                                <span>
                                                    {feedback.feedback}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                )}


                                {/* Next question */}

                                {feedback &&
                                    currentQuestionIndex <
                                        interview.questions.length - 1 && (

                                    <div className="text-end mt-4">

                                        <button
                                            className="btn btn-primary btn-lg px-4"
                                            onClick={handleNextQuestion}
                                        >

                                            Next Question

                                            <i className="bi bi-arrow-right ms-2"></i>

                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MockInterview;
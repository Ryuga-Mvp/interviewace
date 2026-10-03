import { useEffect, useState } from "react";
import api from "../../api/axios";

function Questions() {

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");

    // New UI-only states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get("/questions");

                console.log("Questions from backend:", response.data);

                setQuestions(response.data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Submit answer
    const handleSubmitAnswer = async () => {

        if (!userAnswer.trim()) {
            alert("Please write an answer first.");
            return;
        }

        try {
            const response = await api.post("/submissions", {
                questionId: selectedQuestion.id,
                userAnswer: userAnswer
            });

            console.log("Submission response:", response.data);

            alert("Answer submitted successfully!");

            setUserAnswer("");
            setSelectedQuestion(null);

        } catch (error) {
            console.error("Failed to submit answer:", error);

            if (error.response) {
                alert(
                    "Submission failed: " +
                    error.response.status +
                    " - " +
                    JSON.stringify(error.response.data)
                );
            } else {
                alert("Request failed. Check the browser console.");
            }
        }
    };

    // Add question to favorites
    const handleAddFavorite = async (questionId) => {

        try {
            await api.post(`/favorites/${questionId}`);

            alert("Question added to favorites!");

        } catch (error) {
            console.error("Failed to add favorite:", error);

            if (error.response) {
                alert(
                    "Failed to add favorite: " +
                    error.response.status
                );
            } else {
                alert("Request failed. Check the browser console.");
            }
        }
    };

    // Get unique topics
    const topics = [
        "All",
        ...new Set(
            questions
                .map((question) => question.topic)
                .filter(Boolean)
        )
    ];

    // Get unique difficulties
    const difficulties = [
        "All",
        ...new Set(
            questions
                .map((question) => question.difficulty)
                .filter(Boolean)
        )
    ];

    // Filter questions
    const filteredQuestions = questions.filter((question) => {

        const matchesSearch =
            question.title
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            question.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesTopic =
            selectedTopic === "All" ||
            question.topic === selectedTopic;

        const matchesDifficulty =
            selectedDifficulty === "All" ||
            question.difficulty === selectedDifficulty;

        return (
            matchesSearch &&
            matchesTopic &&
            matchesDifficulty
        );
    });

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ==================== HEADER ==================== */}

                <div className="mb-4">

                    <div className="d-flex align-items-center gap-2 mb-2">

                        <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">
                            <i className="bi bi-code-square me-2"></i>
                            Practice Arena
                        </span>

                    </div>

                    <h2 className="fw-bold mb-2">
                        Practice Questions
                    </h2>

                    <p className="text-muted mb-0">
                        Sharpen your technical skills with interview-style
                        questions.
                    </p>

                </div>


                {/* ==================== SEARCH & FILTERS ==================== */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{ borderRadius: "18px" }}
                >

                    <div className="card-body p-3 p-md-4">

                        <div className="row g-3">

                            {/* Search */}

                            <div className="col-12 col-lg-6">

                                <label className="form-label fw-semibold">
                                    Search Questions
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-search"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by title or description..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />

                                </div>

                            </div>


                            {/* Topic */}

                            <div className="col-12 col-md-6 col-lg-3">

                                <label className="form-label fw-semibold">
                                    Topic
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedTopic}
                                    onChange={(e) =>
                                        setSelectedTopic(e.target.value)
                                    }
                                >

                                    {topics.map((topic) => (
                                        <option
                                            key={topic}
                                            value={topic}
                                        >
                                            {topic}
                                        </option>
                                    ))}

                                </select>

                            </div>


                            {/* Difficulty */}

                            <div className="col-12 col-md-6 col-lg-3">

                                <label className="form-label fw-semibold">
                                    Difficulty
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedDifficulty}
                                    onChange={(e) =>
                                        setSelectedDifficulty(e.target.value)
                                    }
                                >

                                    {difficulties.map((difficulty) => (
                                        <option
                                            key={difficulty}
                                            value={difficulty}
                                        >
                                            {difficulty}
                                        </option>
                                    ))}

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================== QUESTION COUNT ==================== */}

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <div>

                        <h5 className="fw-bold mb-1">
                            Available Questions
                        </h5>

                        <small className="text-muted">
                            {filteredQuestions.length} question
                            {filteredQuestions.length !== 1 ? "s" : ""}
                            {" "}found
                        </small>

                    </div>

                </div>


                {/* ==================== QUESTIONS ==================== */}

                {filteredQuestions.length === 0 ? (

                    <div
                        className="card border-0 shadow-sm"
                        style={{ borderRadius: "18px" }}
                    >

                        <div className="card-body text-center py-5">

                            <i
                                className="bi bi-search text-muted"
                                style={{ fontSize: "45px" }}
                            ></i>

                            <h5 className="fw-bold mt-3">
                                No questions found
                            </h5>

                            <p className="text-muted mb-0">
                                Try changing your search or filters.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="row g-4">

                        {filteredQuestions.map((question) => (

                            <div
                                className="col-12 col-md-6"
                                key={question.id}
                            >

                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        borderRadius: "20px",
                                        transition:
                                            "transform 0.2s ease, box-shadow 0.2s ease"
                                    }}
                                >

                                    <div className="card-body p-4 d-flex flex-column">

                                        {/* Badges */}

                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <span className="badge bg-primary rounded-pill px-3 py-2">
                                                <i className="bi bi-bookmark me-1"></i>
                                                {question.topic}
                                            </span>

                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    question.difficulty?.toLowerCase() === "easy"
                                                        ? "bg-success"
                                                        : question.difficulty?.toLowerCase() === "medium"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                }`}
                                            >
                                                {question.difficulty}
                                            </span>

                                        </div>


                                        {/* Question */}

                                        <h5 className="fw-bold mb-3">
                                            {question.title}
                                        </h5>

                                        <p className="text-muted flex-grow-1">
                                            {question.description}
                                        </p>


                                        {/* Buttons */}

                                        <div className="d-flex gap-2 mt-3">

                                            <button
                                                className="btn btn-primary flex-grow-1"
                                                onClick={() => {
                                                    setSelectedQuestion(question);
                                                    setUserAnswer("");
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Answer
                                            </button>

                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() =>
                                                    handleAddFavorite(question.id)
                                                }
                                                title="Add to favorites"
                                            >
                                                <i className="bi bi-star"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* ==================== ANSWER SECTION ==================== */}

                {selectedQuestion && (

                    <div
                        className="card border-0 shadow-lg mt-5"
                        style={{
                            borderRadius: "22px",
                            overflow: "hidden"
                        }}
                    >

                        {/* Answer header */}

                        <div
                            className="p-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0d6efd, #6f42c1)"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <span className="badge bg-light text-primary rounded-pill mb-2">
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Your Answer
                                    </span>

                                    <h4 className="fw-bold mb-1">
                                        {selectedQuestion.title}
                                    </h4>

                                    <p className="mb-0 opacity-75">
                                        {selectedQuestion.topic} •{" "}
                                        {selectedQuestion.difficulty}
                                    </p>

                                </div>

                                <button
                                    className="btn btn-light btn-sm rounded-circle"
                                    onClick={() => {
                                        setSelectedQuestion(null);
                                        setUserAnswer("");
                                    }}
                                    title="Close"
                                    style={{
                                        width: "36px",
                                        height: "36px"
                                    }}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                            </div>

                        </div>


                        {/* Answer body */}

                        <div className="card-body p-4 p-md-5">

                            <div className="mb-4">

                                <h6 className="fw-bold">
                                    Question
                                </h6>

                                <p className="text-muted mb-0">
                                    {selectedQuestion.description}
                                </p>

                            </div>


                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Your Answer
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="8"
                                    placeholder="Explain your answer here..."
                                    value={userAnswer}
                                    onChange={(e) =>
                                        setUserAnswer(e.target.value)
                                    }
                                />

                                <div className="d-flex justify-content-between mt-2">

                                    <small className="text-muted">
                                        Take your time and explain your
                                        reasoning clearly.
                                    </small>

                                    <small className="text-muted">
                                        {userAnswer.length} characters
                                    </small>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                className="btn btn-success px-4 py-2 fw-semibold"
                                onClick={handleSubmitAnswer}
                            >
                                <i className="bi bi-send me-2"></i>
                                Submit Answer
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Questions;
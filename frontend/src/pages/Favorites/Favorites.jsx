import { useEffect, useState } from "react";
import api from "../../api/axios";

function Favorites() {

    const [favorites, setFavorites] = useState([]);

    // Fetch favorites
    useEffect(() => {

        const fetchFavorites = async () => {

            try {

                const response = await api.get("/favorites");

                console.log("Favorites from backend:", response.data);

                setFavorites(response.data);

            } catch (error) {

                console.error("Failed to fetch favorites:", error);

            }

        };

        fetchFavorites();

    }, []);

    // Remove favorite
    const handleRemoveFavorite = async (questionId) => {

        try {

            await api.delete(`/favorites/${questionId}`);

            alert("Removed from favorites!");

            setFavorites(
                favorites.filter(
                    (favorite) => favorite.question_id !== questionId
                )
            );

        } catch (error) {

            console.error("Failed to fetch favorite:", error);

            if (error.response) {

                alert(
                    "Failed to remove favorite: " +
                    error.response.status
                );

            } else {

                alert("Request failed. Check the browser console.");

            }

        }

    };

    return (

        <div className="bg-light min-vh-100">

            <div className="container py-4 py-md-5">

                {/* ==================== HEADER ==================== */}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                    <div>

                        <span className="badge bg-warning bg-opacity-10 text-warning-emphasis rounded-pill px-3 py-2 mb-2">

                            <i className="bi bi-star-fill me-2"></i>

                            Saved Questions

                        </span>

                        <h2 className="fw-bold mb-2">
                            My Favorites
                        </h2>

                        <p className="text-muted mb-0">
                            Questions you've saved for later practice.
                        </p>

                    </div>


                    {/* Favorite count */}

                    {favorites.length > 0 && (

                        <div
                            className="d-flex align-items-center gap-2 bg-white shadow-sm rounded-pill px-4 py-2"
                        >

                            <i className="bi bi-star-fill text-warning"></i>

                            <span className="fw-semibold">
                                {favorites.length}
                            </span>

                            <span className="text-muted">
                                {favorites.length === 1
                                    ? "Favorite"
                                    : "Favorites"}
                            </span>

                        </div>

                    )}

                </div>


                {/* ==================== EMPTY STATE ==================== */}

                {favorites.length === 0 ? (

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body text-center py-5 px-4">

                            <div
                                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10 text-warning mb-4"
                                style={{
                                    width: "85px",
                                    height: "85px"
                                }}
                            >

                                <i
                                    className="bi bi-star"
                                    style={{
                                        fontSize: "40px"
                                    }}
                                ></i>

                            </div>

                            <h4 className="fw-bold mb-2">
                                No favorites yet
                            </h4>

                            <p
                                className="text-muted mx-auto mb-0"
                                style={{ maxWidth: "500px" }}
                            >
                                Save questions while practicing and they
                                will appear here so you can easily come back
                                to them later.
                            </p>

                        </div>

                    </div>

                ) : (

                    /* ==================== FAVORITE QUESTIONS ==================== */

                    <div className="row g-4">

                        {favorites.map((favorite) => (

                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={favorite.favorite_id}
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

                                        {/* Top row */}

                                        <div className="d-flex justify-content-between align-items-center mb-4">

                                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                                <i className="bi bi-bookmark-fill me-1"></i>

                                                {favorite.topic}

                                            </span>


                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    favorite.difficulty?.toLowerCase() === "easy"
                                                        ? "bg-success"
                                                        : favorite.difficulty?.toLowerCase() === "medium"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                }`}
                                            >
                                                {favorite.difficulty}
                                            </span>

                                        </div>


                                        {/* Star */}

                                        <div className="mb-3">

                                            <i
                                                className="bi bi-star-fill text-warning"
                                                style={{
                                                    fontSize: "22px"
                                                }}
                                            ></i>

                                        </div>


                                        {/* Question */}

                                        <h5 className="fw-bold mb-3">
                                            {favorite.title}
                                        </h5>


                                        {/* Question ID */}

                                        <div className="text-muted small mb-4">

                                            <i className="bi bi-hash me-1"></i>

                                            Question ID:{" "}
                                            <span className="fw-semibold">
                                                {favorite.question_id}
                                            </span>

                                        </div>


                                        {/* Spacer */}

                                        <div className="mt-auto">

                                            <button
                                                className="btn btn-outline-danger w-100"
                                                onClick={() =>
                                                    handleRemoveFavorite(
                                                        favorite.question_id
                                                    )
                                                }
                                            >

                                                <i className="bi bi-trash3 me-2"></i>

                                                Remove Favorite

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* ==================== FOOTER NOTE ==================== */}

                {favorites.length > 0 && (

                    <div
                        className="card border-0 shadow-sm mt-5"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex align-items-start gap-3">

                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary flex-shrink-0"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >

                                    <i className="bi bi-lightbulb fs-4"></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">
                                        Practice what you've saved
                                    </h6>

                                    <p className="text-muted mb-0">
                                        Revisit your favorite questions
                                        regularly to strengthen your
                                        interview preparation.
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

export default Favorites;
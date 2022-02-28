import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReviews } from "../api/api";

const AllReviewPage = () => {
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        getAllReviews().then(setReviewData);
    }, []);
    console.log("Hello")

    const review = reviewData[0]
    console.log(review)
    if (!review) {
        return (
            <div>Getting Reviews for you...</div>
        )
    }

    return (
        <ReviewComponent review = {review} />
    )

}

const ReviewComponent = ({ review }) => {
}
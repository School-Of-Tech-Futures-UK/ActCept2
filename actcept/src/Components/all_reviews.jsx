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
    (<>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {review.rating}
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
            </div>
        </div>
    </>)
}
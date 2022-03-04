import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReviews, fetchRegistrations } from "../api/api";

const ShowReviews = ({ id }) => {
    const [reviewData, setReviewData] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    console.log(`registrations should be empty: ${registrations}`)
    useEffect(() => {
        getAllReviews().then(setReviewData).then(fetchRegistrations(id).then(setRegistrations));
    }, [id]);
    // useEffect(() => {
    //     fetchRegistrations(id).then(setRegistrations);
    // }, []);
    if (!reviewData) {
        return <>There are no reviews</>
    } else {
        const filteredReview = reviewData.filter(x => x.event_id === id)
        console.log(`registrations should be filled: ${registrations}`)
        return filteredReview.map((e) => (
                <EventReviewComponent reviewComponent={e}/>
        ))
    }

}

const EventReviewComponent = ({ reviewComponent }) => {
    return (<>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Rating: {reviewComponent.rating}
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    {reviewComponent.review_text}
                    {/* <strong>TEXT</strong> */}
                </div>
            </div>
        </div>
    </>)
}

export default ShowReviews; 
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReviews, fetchRegistrations } from "../api/api";

const ShowReviews = ({ id }) => {
    const [reviewData, setReviewData] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    console.log(`registrations should be empty: ${registrations}`)
    useEffect(() => {
        getAllReviews().then(setReviewData).then(fetchRegistrations(id).then(setRegistrations));
    }, []);
    // useEffect(() => {
    //     fetchRegistrations(id).then(setRegistrations);
    // }, []);
    if (!reviewData || !registrations) {
        return <>There are no reviews</>
    } else {
        const filteredReview = reviewData.filter(x => x.event_id === id)
        console.log(`registrations should be filled: ${registrations}`)
        return filteredReview.map((e) => (
                <EventReviewComponent reviewComponent={e} userName={registrations.find(x => x.registration_id===e.registration_id).name}/>
        ))
    }

}

const EventReviewComponent = ({ reviewComponent, userName }) => {
    return (<>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    User Name {userName} {reviewComponent.rating}
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    {/* {reviewComponent.review_text} */}
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
    </>)
}

export default ShowReviews; 
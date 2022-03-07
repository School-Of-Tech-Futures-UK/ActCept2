import { useEffect, useState } from "react";
import { getAllReviews, fetchRegistrations } from "../api/api";

const fetchData = async (id) => {
    const fetchedReviewData = await getAllReviews()
    if (fetchedReviewData.length !== 0) {
        const fetchedRegistrationData = await fetchRegistrations(id)
        const filteredReviewData = fetchedReviewData.filter(x => x.event_id === id)
        filteredReviewData.map((e) => {
            const name = fetchedRegistrationData.find(x => x.registration_id === e.registration_id).name
            e.name = name
            return e
        })
        return filteredReviewData
    }
    return []
}

const ShowReviews = ({ id }) => {
    const [reviewData, setReviewData] = useState([]);
    // const [registrations, setRegistrations] = useState([]);
    console.log(`registrations should be empty: ${reviewData}`)
    useEffect(() => {
        fetchData(id).then(setReviewData);
    }, [id]);
    if (reviewData.length === 0) {
        return <div>There are no reviews</div>
    } else {
        console.log(`registrations should be filled: ${reviewData}`)
        return reviewData.map((e) => {
            return(
            <EventReviewComponent reviewComponent={e}/>
        )})
    }

}

const EventReviewComponent = ({ reviewComponent}) => {
    return (<>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <div id="rating"> <span><strong>{reviewComponent.name} </strong></span> &emsp;<span id="reviewRating"><img src="../../public/Assets/Images/Rating.png" alt="Rating:" height="8px"/> {reviewComponent.rating} </span></div>
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
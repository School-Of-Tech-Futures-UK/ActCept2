const EventPage = () => {

    return (<>
         <button type="button" class="btn btn-primary"> ← Home</button>
    <div class="eventFlex">
        <div id="eventHeader">
            <img id="eventImage" src="https://www.accenture.com/t00010101T000000Z__w__/gb-en/_acnmedia/Accenture/Redesign-Assets/Careers/Images/Marquee/8/Accenture-in-session-marquee.jpg" class="card-img-top" alt="..." height="250px" />
            <div id="eventReview">  
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>
            <div id="eventTitle">
                <p> Event Title</p>
            </div>
        </div>
        <div class="eventCardFlex">
            <div class="eventDetailsFlex" id="childFlex" >
                <div class="card mainDetails">
                    <div class="card-body">
                        <h5 class="card-title">Main Details</h5>
                        <p class="card-text">Event basic details, time, location etc</p>
                    </div>
                </div>
                <div class="eventButtonsFlex">
                    <button type="button" class="btn btn-primary" id="eventButtonFlex"> Book Now </button>
                    <button type="button" class="btn btn-primary" id="eventButtonFlex"> Add to Shortlist </button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Additional Info</h5>
                        <p class="card-text">Additional details about the event</p>
                    </div>
                </div>
            </div>
            <div id="mapFlex">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Map Here</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)

}

export default EventPage;
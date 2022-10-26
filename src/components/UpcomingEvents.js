import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };




function UpcomingEvents() {
    const events = [{event: 'IGB Party',date:'09/20/22', time: '8:00pm EST', img: '../event1.jpg'},{event: 'Four Loko Event',date:'12/02/22',time: '8:00pm EST',img: '../event2.jpg'},{event: 'IGB Party',date:'09/20/22', time: '8:00pm EST', img: '../event1.jpg'}]


      return (
        <div className="pt-6">
                
            {/* <div className="upcoming-box w-5/6 justify-center place-items-center flex flex-col">
            {events.map((e,i)=>(
                
                <div className="card glass h-full m-5 h-100 lg:card-side ">
                <figure><img src="https://img.icons8.com/material-outlined/96/000000/ghost.png" alt="Album"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">New album is released!</h2>
                        <p>Click the button to listen on Spotiwhy app.</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" href="https://www.eventbrite.com/e/test-igi-event-tickets-407620763677">RSVP</button>
                        </div>
                    </div>
                </div>
           
            ))}
            </div> */}
                            
            <Carousel
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                className="caro-row pb-8"
                >
                    <div className="carousel-item col card md:card-side glass ml-4">
                        <figure className="frame max-height-96"><img src='https://img.icons8.com/material-outlined/96/000000/ghost.png' alt="..."/></figure>
                        <div className="card-body p-4">
                            <h2 className="card-title">New Event 1</h2>
                            <p>Description</p>
                            <p>Date</p>
                            <div className="card-actions justify-end">
                                <a href="https://www.eventbrite.com/e/test-igi-event-tickets-407620763677"><button className="btn">RSVP</button></a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col card md:card-side glass ml-4">
                        <figure className="frame max-height-96"><img src='https://img.icons8.com/material-outlined/96/000000/ghost.png' alt="..."/></figure>
                        <div className="card-body p-4">
                            <h2 className="card-title">New Event 2</h2>
                            <p>Description</p>
                            <p>Date</p>
                            <div className="card-actions justify-end">
                            <a href="https://www.eventbrite.com/e/test-igi-event-tickets-407620763677"><button className="btn">RSVP</button></a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col card md:card-side glass ml-4">
                        <figure className="frame max-height-96"><img src='https://img.icons8.com/material-outlined/96/000000/ghost.png' alt="..."/></figure>
                        <div className="card-body p-4">
                            <h2 className="card-title">New Event 3</h2>
                            <p>Description</p>
                            <p>Date</p>
                            <div className="card-actions justify-end">
                            <a href="https://www.eventbrite.com/e/test-igi-event-tickets-407620763677"><button className="btn">RSVP</button></a>
                            </div>
                        </div>
                    </div>
                </Carousel>

        </div>

      );
}

export default UpcomingEvents;
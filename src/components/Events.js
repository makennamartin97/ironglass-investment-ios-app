import React, {useState,useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Myparticle from './Particless.js';
import AdminNav from "./navbars/Nav";
import PastEvents from "./PastEvents.js";
import UpcomingEvents from "./UpcomingEvents.js";


function Events() {
    // const events = [{event: 'IGB Party',date:'09/20/22', time: '8:00pm EST', img: '../event1.jpg'},{event: 'Four Loko Event',date:'12/02/22',time: '8:00pm EST',img: '../event2.jpg'}]


      return (
        <div className='section'>
            <Myparticle/>
            <AdminNav/>
            <div className='flex flex-row min-w-full place-content-center mt-10'>
                <div className="card block text-white gradient-border mb-8">
                <div class="text-center lg:h-auto text-xl lg:text-left header p-4 md:p-0 mb-6">
                <h1 data-aos="fade-right" data-aos-duration="2500" className="lg:ml-10 lg:mt-8 text-[#9ca3af] orbitron underline decoration-[#34b2fd] underline-offset-8">Upcoming Events</h1>
            </div>
                    <UpcomingEvents/>
                   
                    <div class="text-center lg:h-auto text-xl lg:text-left header p-4 md:p-0 mb-6">
                <h1 data-aos="fade-right" data-aos-duration="2500" className="lg:ml-10 lg:mt-8 text-[#9ca3af] orbitron underline decoration-[#34b2fd] underline-offset-8">Past Events</h1>
            </div>
                    <PastEvents/>
                    
                </div>
            </div>
            
        </div>
      );
}

export default Events;
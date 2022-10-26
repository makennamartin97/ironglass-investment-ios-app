import React from "react";
import { InlineWidget } from "react-calendly";
// import './Dashboard.css';
import arrow from '../images/arrow3.png'
import Nav from "./navbars/Nav";
import Myparticle from './Particless.js';


function Calendly() {



      return (
  
        <div className='section'>
            <Myparticle/>
            <Nav/>
            <div class="text-center p-4 md:p-0 mb-12 md:mb-0 md:flex md:h-auto text-xl lg:text-left header">
              <h1 data-aos="fade-right" data-aos-duration="2500" className="md:ml-10 lg:mt-8 text-[#9ca3af] orbitron underline decoration-[#34b2fd] underline-offset-8">Schedule a complimentary meeting with a financial analyst</h1>
            </div>
            <InlineWidget url="https://calendly.com/sam-scott-igi" id='widget' color="#00a2ff"/>
            
        </div>
      );
}

export default Calendly;